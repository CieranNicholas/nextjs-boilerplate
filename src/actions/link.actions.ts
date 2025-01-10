import { getLinkById, LinkDto } from "@/data-access/links";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const updateLinks = async (links: LinkDto[]) => {
  await Promise.all(
    links.map((link) =>
      prisma.link.update({
        where: { id: link.id },
        data: {
          title: link.title,
          url: link.url,
        },
      }),
    ),
  );
};

export async function clickLink(id: string): Promise<void> {
  const link = await getLinkById(id);
  if (!link) {
    throw new Error("Link not found with id: " + id);
  }
  await prisma.link.update({
    where: { id },
    data: { clicks: { increment: 1 } },
  });
  redirect(link.url);
}
