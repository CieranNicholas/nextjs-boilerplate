import React from "react";
import { UserDto } from "@/data-access/user";
import { LinkDto } from "@/data-access/links";
import { ProfileInfoCard } from "./_components/profile-card";
import { LinksCard } from "./_components/links-card";
import { SocialMediaCard } from "./_components/social-media-card";
import { ThemesCard, ThemeSettings } from "./_components/themes-card";
import { Theme } from "@prisma/client";

export default function LinksTab({
  user,
  userLinks,
  theme,
}: {
  user: UserDto;
  userLinks: LinkDto[];
  theme: Theme;
}) {
  return (
    <div className="space-y-4 mb-16">
      <ProfileInfoCard user={user} />
      <LinksCard userLinks={userLinks} userId={user.id} />
      <SocialMediaCard user={user} />
      <ThemesCard userId={user.id} initialTheme={theme} />
    </div>
  );
}
