"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileUpload, { FileType } from "@/components/file-upload";
import { uploadAvatar } from "./actions";
import { getInitials } from "@/helpers";

interface AvatarUploadProps {
  avatar: string | null;
  name: string;
}

export function AvatarUpload({ avatar, name }: AvatarUploadProps) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      toast.error("Please select an image to upload.");
      return;
    }
    setIsUploadingAvatar(true);

    const formData = new FormData();
    formData.append("file", avatarFile);
    formData.append("path", "avatars/");

    try {
      const result = await uploadAvatar(formData);
      if (result.success) {
        setIsModalOpen(false);
        toast.success("Avatar uploaded successfully");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload avatar",
      );
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="w-36 grid place-items-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src={avatar ?? undefined} alt="Avatar" />
          <AvatarFallback className="bg-red-500 text-white text-xs">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
      </div>
      <DialogTrigger asChild>
        <Button type="button">
          <Upload className="h-4 w-4 mr-2" />
          Update Avatar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update User Avatar</DialogTitle>
          <DialogDescription>
            Upload an image and click upload file to update your avatar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FileUpload
            fileType={FileType.Image}
            file={avatarFile}
            setFile={setAvatarFile}
            onUpload={handleAvatarUpload}
            acceptedTypes={{
              "image/jpeg": [],
              "image/png": [],
            }}
            uploading={isUploadingAvatar}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
