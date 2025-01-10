"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  initialImage?: string;
  onImageChange: (image: string | null) => void;
}

export function ImageUpload({ initialImage, onImageChange }: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(initialImage || null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        onImageChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageChange(null);
  };

  return (
    <div className="relative min-w-20 min-h-20 max-w-20 max-h-20 rounded-lg overflow-hidden">
      {image ? (
        <div className="w-full h-full group">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveImage}
              className="text-white hover:text-red-500"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className="min-w-20 min-h-20 flex items-center justify-center bg-gray-100 cursor-pointer"
        >
          <Upload className="h-8 w-8 text-gray-400" />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
