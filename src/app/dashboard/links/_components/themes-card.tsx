"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FONTS } from "@/constants";
import { updateUserTheme } from "../links.actions";
import { Theme } from "@prisma/client";
export interface ThemeSettings {
  fontFamily: string;
  fontColor: string;
  secondaryColorFont: string;
  backgroundColor: string;
  backgroundImage: string;
  borderColor: string;
  borderRadius: number;
  borderWidth: number;
  borderStyle: string;
}

interface ThemesCardProps {
  userId: string;
  initialTheme: Theme;
}

export function ThemesCard({ userId, initialTheme }: ThemesCardProps) {
  const { register, handleSubmit, setValue } = useForm<{
    theme: Theme;
  }>({
    defaultValues: { theme: initialTheme },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: { theme: Theme }) => {
    setIsSubmitting(true);
    await updateUserTheme(userId, data.theme);
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex justify-between items-center">
          <span>Themes</span>
        </CardTitle>
        <CardDescription>Customize your theme settings here</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label>Theme</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Label className="w-24">Font</Label>
                <Select
                  onValueChange={(value) => setValue("theme.fontFamily", value)}
                  defaultValue={initialTheme.fontFamily}
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
                <Input type="color" {...register("theme.secondaryColorFont")} />
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
                  defaultValue={initialTheme.borderStyle}
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
