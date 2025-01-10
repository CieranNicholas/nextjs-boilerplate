"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SOCIAL_PLATFORMS } from "@/constants";
import { updateUser } from "../links.actions";
import { UserDto } from "@/data-access/user";

interface SocialMediaCardProps {
  user: UserDto;
}

export function SocialMediaCard({ user }: SocialMediaCardProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: SOCIAL_PLATFORMS.reduce(
      (acc, platform) => ({
        ...acc,
        [platform.value]: user[platform.value as keyof UserDto] || "",
      }),
      {},
    ),
  });

  const onSubmit = async (data: Record<string, string>) => {
    try {
      await updateUser(user.id, data);
      // You might want to add a success message here
    } catch (error) {
      console.error("Failed to update social media links:", error);
      // You might want to add an error message here
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Social Media</CardTitle>
        <CardDescription>Manage your social media links here</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {SOCIAL_PLATFORMS.map((platform) => (
            <div key={platform.value} className="space-y-2">
              <Label htmlFor={platform.value}>{platform.label}</Label>
              <Input
                id={platform.value}
                placeholder={`Enter your ${platform.label} username`}
                {...register(platform.value as keyof typeof register)}
              />
            </div>
          ))}
          <CardFooter className="flex justify-end px-0">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
