import { prisma } from "@/lib/prisma";
import { Theme } from "@prisma/client";

export async function updateTheme(userId: string, theme: Theme) {
  await prisma.theme.update({
    where: { userId },
    data: theme,
  });
}

export async function getTheme(userId: string): Promise<Theme> {
  const theme = await prisma.theme.findUnique({
    where: { userId },
  });
  if (!theme) {
    return {
      id: "",
      fontFamily: "",
      fontWeight: 0,
      fontColor: "",
      secondaryColorFont: "",
      backgroundColor: "",
      backgroundImage: "",
      borderColor: "",
      borderRadius: 0,
      borderWidth: 0,
      userId: "",
    } as Theme;
  }
  return theme;
}
