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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AvatarUpload } from "@/components/avatar-upload/avatar-upload";
import Link from "next/link";
import { UserDto } from "@/data-access/user";
import { updateUser } from "../links.actions";

interface ProfileInfoCardProps {
  user: UserDto;
}

export function ProfileInfoCard({ user }: ProfileInfoCardProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: user.username,
      description: user.description || "",
    },
  });

  const onSubmit = async (data: { username: string; description: string }) => {
    try {
      await updateUser(user.id, data);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex justify-between items-center">
          <span>Profile Info</span>
          <Link href={`/${user.username}`} className="text-base underline">
            Preview
          </Link>
        </CardTitle>
        <CardDescription>Manage your profile information here</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AvatarUpload avatar={user.avatar || ""} name={user.name || ""} />
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register("username", {
                required: "Username is required",
              })}
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username && (
              <p className="text-sm text-red-500" role="alert">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              rows={4}
              className="resize-none"
            />
          </div>
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
