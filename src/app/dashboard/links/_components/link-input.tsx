"use client";

import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkDto } from "@/data-access/links";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/image-upload/image-upload";
import { useState } from "react";
import { ConfirmDeleteModal } from "./confirm-delete-modal";

interface LinkInputProps {
  link: LinkDto;
  index: number;
  onUpdate: (index: number, updatedLink: LinkDto) => void;
  onDelete: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export function LinkInput({
  link,
  index,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: LinkInputProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedLink = { ...link, [name]: value };
    onUpdate(index, updatedLink);
  };

  const handleImageChange = (imageUrl: string | null) => {
    const updatedLink = { ...link, imageUrl } as LinkDto;
    onUpdate(index, updatedLink);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(index);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center space-x-4 justify-between">
        <p className="text-sm text-muted-foreground">{index + 1}</p>
        <ImageUpload
          initialImage={link.imageUrl}
          onImageChange={handleImageChange}
        />
        <div className="flex space-x-4 flex-1 items-center">
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            placeholder="Title"
            value={link.title}
            onChange={handleInputChange}
            aria-label="Link title"
            required
          />
          <Label htmlFor="url">URL</Label>
          <Input
            name="url"
            placeholder="URL"
            value={link.url}
            onChange={handleInputChange}
            aria-label="Link URL"
            required
            type="url"
          />
        </div>
        <div className="flex space-x-4 items-center ">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onMoveUp(index)}
          >
            <ChevronUp className="h-4 w-4" />
            <span className="sr-only">Move link up</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onMoveDown(index)}
          >
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Move link down</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleDeleteClick}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete link</span>
          </Button>
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
