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
};

function toDtoMapper(link: Link): LinkDto {
  return {
    id: link.id,
    url: link.url,
    title: link.title,
    imageUrl: link.imageUrl,
    userId: link.userId,
  };
}

export async function createLink(data: CreateLinkDto): Promise<LinkDto> {
  const createdLink = await prisma.link.create({ data });
  return toDtoMapper(createdLink);
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

export async function deleteLink(id: string): Promise<void> {
  await prisma.link.delete({ where: { id } });
}
