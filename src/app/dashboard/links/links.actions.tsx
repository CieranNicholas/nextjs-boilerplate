"use server";

import { isValidSession } from "@/actions/session.actions";
import {
  CreateLinkDto,
  createLinks,
  deleteLinkById,
  getLinksByUserId,
  LinkDto,
  updateLinks,
} from "@/data-access/links";
import { updateUserById, UserDto } from "@/data-access/user";
import { ThemeSettings } from "./_components/themes-card";
import { updateTheme } from "@/actions/theme.actions";
import { Theme } from "@prisma/client";

export async function updateUser(userId: string, data: Partial<UserDto>) {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }

  await updateUserById(userId, {
    username: data.username,
    description: data.description,
    twitchUsername: data.twitchUsername,
    instagramUsername: data.instagramUsername,
    facebookUsername: data.facebookUsername,
    twitterUsername: data.twitterUsername,
    patreonUsername: data.patreonUsername,
    youtubeUsername: data.youtubeUsername,
    appleMusicUsername: data.appleMusicUsername,
    spotifyUsername: data.spotifyUsername,
    tiktokUsername: data.tiktokUsername,
  });
}

export async function updateUserLinks(
  userId: string,
  links: Partial<LinkDto>[],
) {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const createLinksFiltered = links
    ?.filter((link) => !link.id)
    .map((link) => ({
      title: link.title,
      url: link.url,
      imageUrl: link.imageUrl,
      userId: userId,
    }));
  await createLinks(createLinksFiltered as CreateLinkDto[]);

  const updateLinksFiltered = links
    ?.filter((link) => link.id)
    .map((link) => ({
      title: link.title,
      url: link.url,
      imageUrl: link.imageUrl,
      userId: userId,
      id: link.id,
    }));
  await updateLinks(updateLinksFiltered as LinkDto[]);
}

export async function getLinks(userId: string) {
  const links = await getLinksByUserId(userId);
  if (!links) return [];
  return links
    .sort((a, b) => a.index - b.index)
    .map((link, index) => ({
      ...link,
      index: link.index !== null ? link.index : index,
    }));
}

export async function updateUserTheme(userId: string, theme: Theme) {
  await updateTheme(userId, theme);
}

export async function deleteLink(id: string) {
  await deleteLinkById(id);
}
