"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, X } from "lucide-react";
import { AvatarUpload } from "@/components/avatar-upload/avatar-upload";
import { UserDto } from "@/data-access/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

type FormData = {
  username: string;
  description: string;
  links: { title: string; url: string }[];
  socials: { [key: string]: string };
};

const socialPlatforms = [
  { label: "Twitter/X", value: "twitter", prefix: "twitter.com/" },
  { label: "Facebook", value: "facebook", prefix: "facebook.com/" },
  { label: "Instagram", value: "instagram", prefix: "instagram.com/" },
  { label: "LinkedIn", value: "linkedin", prefix: "linkedin.com/" },
  { label: "YouTube", value: "youtube", prefix: "youtube.com/c/" },
];

const fonts = [
  { label: "Inter", value: "inter" },
  { label: "Roboto", value: "roboto" },
  { label: "Poppins", value: "poppins" },
  { label: "Lato", value: "lato" },
];

/*
todo:
- avatar upload
- background video/image upload
- gradient image background based off avatar
- themes (button color, background, text color) !! add to user settings
*/

export default function LinksTab({ user }: { user: UserDto }) {
  const defaultFormData: FormData = {
    username: user.username,
    description: user.description || "",
    links: [
      { title: "My GitHub", url: "https://github.com" },
      { title: "My Portfolio", url: "https://example.com/portfolio" },
    ],
    socials: {
      twitter: user.twitterUsername || "",
      facebook: user.facebookUsername || "",
      instagram: user.instagramUsername || "",
      twitch: user.twitchUsername || "",
      tiktok: user.tiktokUsername || "",
      spotify: user.spotifyUsername || "",
      appleMusic: user.appleMusicUsername || "",
      patreon: user.patreonUsername || "",
      youtube: user.youtubeUsername || "",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: defaultFormData,
  });

  const [links, setLinks] = useState(defaultFormData.links);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Here you would typically send this data to your backend
  };

  const addLink = () => {
    setLinks([...links, { title: "", url: "" }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  console.log(user);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex justify-between items-center">
            <span>Links</span>
            <Link href={`/${user.username}`} className="text-base underline">
              Preview
            </Link>
          </CardTitle>
          <CardDescription>Manage your profile and links here!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AvatarUpload avatar={user.avatar || ""} name={user.name || ""} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  defaultValue={user.username}
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  defaultValue={user.description || ""}
                />
              </div>

              <Separator />

              <div>
                <Label>Links</Label>
                {links.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <Input
                      placeholder="Title"
                      {...register(`links.${index}.title` as const, {
                        required: "Title is required",
                      })}
                      defaultValue={link.title}
                    />
                    <Input
                      placeholder="URL"
                      {...register(`links.${index}.url` as const, {
                        required: "URL is required",
                      })}
                      defaultValue={link.url}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLink(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addLink}
                  className="mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>

              <Separator />

              <div>
                <Label>Social Media</Label>
                {socialPlatforms.map((platform) => (
                  <div
                    key={platform.value}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <Label className="w-24">{platform.label}</Label>
                    <Input
                      placeholder={`Enter your ${platform.label} username`}
                      {...register(`socials.${platform.value}` as const)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <CardFooter className="flex justify-end mt-6 px-0">
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      <Card className="mt-4 mb-16">
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            Change the theme of your profile to match your style!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Font</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Text Color</Label>
            <Input
              placeholder="#000000"
              // {...register(`socials.${platform.toLowerCase()}` as const)}
            />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Secondary Text Color</Label>
            <Input
              placeholder="#000000"
              // {...register(`socials.${platform.toLowerCase()}` as const)}
            />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Background Color</Label>
            <Input
              placeholder="#000000"
              // {...register(`socials.${platform.toLowerCase()}` as const)}
            />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Background Video</Label>
            <Input
              placeholder="#000000"
              // {...register(`socials.${platform.toLowerCase()}` as const)}
            />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Links Background Color</Label>
            <Input
              placeholder="#000000"
              // {...register(`socials.${platform.toLowerCase()}` as const)}
            />
          </div>
          <CardFooter className="flex justify-end mt-6 px-0">
            <Button type="submit">Change Theme</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </>
  );
}
