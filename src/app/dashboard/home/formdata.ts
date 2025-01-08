import { LinkDto } from "@/data-access/links";
import { UserDto } from "@/data-access/user";

export type FormData = {
  username: string;
  description: string;
  links: Partial<LinkDto>[];
  twitterUsername: string | null;
  facebookUsername: string | null;
  instagramUsername: string | null;
  twitchUsername: string | null;
  tiktokUsername: string | null;
  spotifyUsername: string | null;
  appleMusicUsername: string | null;
  patreonUsername: string | null;
  youtubeUsername: string | null;
  theme: {
    fontFamily: string;
    fontWeight: number;
    fontColor: string;
    secondaryColorFont: string;
    backgroundColor: string;
    backgroundImage: string;
    borderColor: string;
    borderRadius: number;
    borderWidth: number;
    borderStyle: string;
  };
};

export const getDefaultFormData = (
  user: UserDto,
  userLinks: LinkDto[],
): FormData => {
  return {
    username: user.username,
    description: user.description || "",
    links: userLinks,
    twitterUsername: user.twitterUsername || "",
    facebookUsername: user.facebookUsername || "",
    instagramUsername: user.instagramUsername || "",
    twitchUsername: user.twitchUsername || "",
    tiktokUsername: user.tiktokUsername || "",
    spotifyUsername: user.spotifyUsername || "",
    appleMusicUsername: user.appleMusicUsername || "",
    patreonUsername: user.patreonUsername || "",
    youtubeUsername: user.youtubeUsername || "",
    theme: {
      fontFamily: "inter",
      fontWeight: 400,
      fontColor: "#000000",
      secondaryColorFont: "#000000",
      backgroundColor: "#ffffff",
      backgroundImage: "",
      borderColor: "#000000",
      borderRadius: 0,
      borderWidth: 0,
      borderStyle: "solid",
    },
  };
};
