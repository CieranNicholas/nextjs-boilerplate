import { prisma } from "@/lib/prisma";
import { Link } from "@prisma/client";

export type CreateLinkDto = {
  url: string;
  title: string;
  imageUrl: string;
  userId: string;
};

export type LinkDto = {
  id: string;
  url: string;
  title: string;
  imageUrl: string;
  userId: string;
  index: number;
};

function toDtoMapper(link: Link): LinkDto {
  return {
    id: link.id,
    url: link.url,
    title: link.title,
    imageUrl: link.imageUrl,
    userId: link.userId,
    index: link.index,
  };
}

export async function createLink(data: CreateLinkDto): Promise<LinkDto> {
  const createdLink = await prisma.link.create({ data });
  return toDtoMapper(createdLink);
}

export async function createLinks(data: CreateLinkDto[]): Promise<void> {
  await prisma.link.createMany({ data });
  console.log("createdLinks", data);
  // const createdLinks = await prisma.link.findMany({
  //   where: {
  //     userId: data[0].userId,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   take: data.length,
  // });
  // return createdLinks.map(toDtoMapper);
}

export async function updateLinks(data: LinkDto[]): Promise<void> {
  // updateMany() doesn't work here because we need to update each link individually
  // with its specific id and data
  for (const link of data) {
    await prisma.link.update({
      where: { id: link.id },
      data: {
        url: link.url,
        title: link.title,
        imageUrl: link.imageUrl,
      },
    });
  }
  // const updatedLinks = await prisma.link.findMany({
  //   where: {
  //     userId: data[0].userId,
  //   },
  // });
  // return updatedLinks.map(toDtoMapper);
}

export async function getLinks(): Promise<LinkDto[]> {
  //use cache or no?
  const links = await prisma.link.findMany();
  return links.map(toDtoMapper);
}

export async function getLinkById(id: string): Promise<LinkDto> {
  const foundLink = await prisma.link.findUnique({
    where: { id },
  });
  if (!foundLink) {
    throw new Error("Link not found with id: " + id);
  }
  return toDtoMapper(foundLink);
}

export async function getLinksByUserId(userId: string): Promise<LinkDto[]> {
  const links = await prisma.link.findMany({ where: { userId } });
  return links.map(toDtoMapper);
}

export async function updateLinkById(
  id: string,
  data: Partial<Link>,
): Promise<void> {
  await prisma.link.update({ where: { id }, data });
}

export async function deleteLinkById(id: string): Promise<void> {
  await prisma.link.delete({ where: { id } });
}
