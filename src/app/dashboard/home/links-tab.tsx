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
import { updateUser } from "./links.actions";
import { LinkDto } from "@/data-access/links";
import { FONTS, SOCIAL_PLATFORMS } from "@/constants";
import { getDefaultFormData } from "./formdata";
import { FormData } from "./formdata";

export default function LinksTab({
  user,
  userLinks,
}: {
  user: UserDto;
  userLinks: LinkDto[];
}) {
  const defaultFormData = getDefaultFormData(user, userLinks);
  const [links, setLinks] = useState(defaultFormData.links);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: defaultFormData,
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const updatedData = { ...data, links };
    console.log(data, links);
    updateUser(user.id, updatedData, links);
  };

  const addLink = () => {
    const newLinks = [
      ...links,
      {
        title: "",
        url: "",
        imageUrl: "",
        userId: user.id,
      },
    ];
    setLinks(newLinks);
    setValue("links", newLinks);
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    setValue("links", newLinks);
  };

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
              {/* Username */}
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register("description")} />
              </div>

              <Separator />

              {/* Links */}
              <div>
                <Label>Links</Label>
                {links?.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <Input
                      placeholder="Title"
                      value={link.title}
                      onChange={(e) => {
                        const newLinks = [...links];
                        newLinks[index].title = e.target.value;
                        setLinks(newLinks);
                        setValue(`links.${index}.title`, e.target.value);
                      }}
                    />
                    <Input
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...links];
                        newLinks[index].url = e.target.value;
                        setLinks(newLinks);
                        setValue(`links.${index}.url`, e.target.value);
                      }}
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

              {/* Social Media */}
              <div>
                <Label>Social Media</Label>
                {SOCIAL_PLATFORMS.map((platform) => (
                  <div
                    key={platform.value}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <Label className="w-24">{platform.label}</Label>
                    <Input
                      placeholder={`Enter your ${platform.label} username`}
                      {...register(`${platform.value}` as keyof FormData)}
                    />
                  </div>
                ))}
              </div>

              <Separator />

              {/* Theme */}
              <div>
                <Label>Theme</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Label className="w-24">Font</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("theme.fontFamily", value)
                    }
                    defaultValue={defaultFormData.theme.fontFamily}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      {FONTS.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Label className="w-24">Text Color</Label>
                  <Input type="color" {...register("theme.fontColor")} />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Label className="w-24">Secondary Text Color</Label>
                  <Input
                    type="color"
                    {...register("theme.secondaryColorFont")}
                  />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Label className="w-24">Background Color</Label>
                  <Input type="color" {...register("theme.backgroundColor")} />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Label className="w-24">Background Image</Label>
                  <Input
                    type="text"
                    placeholder="Enter image URL"
                    {...register("theme.backgroundImage")}
                  />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Label className="w-24">Border Color</Label>
                  <Input type="color" {...register("theme.borderColor")} />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Label className="w-24">Border Radius</Label>
                  <Input
                    type="number"
                    {...register("theme.borderRadius", { valueAsNumber: true })}
                  />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Label className="w-24">Border Width</Label>
                  <Input
                    type="number"
                    {...register("theme.borderWidth", { valueAsNumber: true })}
                  />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Label className="w-24">Border Style</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("theme.borderStyle", value)
                    }
                    defaultValue={defaultFormData.theme.borderStyle}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select border style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="dashed">Dashed</SelectItem>
                      <SelectItem value="dotted">Dotted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <CardFooter className="flex justify-end mt-6 px-0">
              <Button type="submit" onClick={handleSubmit(onSubmit)}>
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
