"use server";

import { isValidSession } from "@/actions/session.actions";
import { getLinksByUserId } from "@/data-access/links";
import { updateUserById, UserDto } from "@/data-access/user";

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
  const createLinks = data.links
    ?.filter((link) => !link.id)
    .map((link) => ({
      title: link.title,
      url: link.url,
      imageUrl: link.imageUrl || "",
      userId: userId,
    }));
  const updateLinks = data.links
    ?.filter((link) => link.id)
    .map((link) => ({
      where: { id: link.id },
      data: {
        title: link.title,
        url: link.url,
        imageUrl: link.imageUrl,
      },
    }));
  await createLinks(userId, createLinks);
  await updateLinks(userId, updateLinks);
}

export async function getLinks(userId: string) {
  const links = await getLinksByUserId(userId);
  if (!links) return [];
  return links;
}
