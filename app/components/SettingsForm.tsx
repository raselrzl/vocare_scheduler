"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./SubmitButton";
import { useActionState, useState } from "react";
import { SettingsAction } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "../lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "../lib/uploadthing";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface iAppProps {
  fullName: string;
  email: string;
  profileImage: string;
}
export default function SettingForm({
  email,
  fullName,
  profileImage,
}: iAppProps) {
  const [lastResult, action] = useActionState(SettingsAction, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [isUploading, setIsUploading] = useState(false);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account from here.</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4 mb-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full name</Label>
            <Input
              defaultValue={fullName}
              placeholder="Jhon doe"
              name={fields.fullName.name}
              key={fields.fullName.key}
            />
            <p className="text-red-500 text-xs">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input defaultValue={email} placeholder="jhon@gmail.com" disabled />
          </div>

          <div className="flex flex-col gap-y-6">
            <Label>Profile picture</Label>
            <input type="hidden" name={fields.profileImage.name} key={fields.profileImage.key} value={currentProfileImage}/>
            {currentProfileImage ? (
              <div className="relative size-16">
                {" "}
                <img
                  src={currentProfileImage}
                  alt="p.pic"
                  className="size-16 rounded-2xl"
                />
                <Button
                  className="absolute -top-3 -right-3 size-8"
                  variant={"destructive"}
                  onClick={handleDeleteImage}
                  type="button"
                >
                  <X />
                </Button>
              </div>
            ) : (
              <div className="w-40 h-40 mx-auto">
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setCurrentProfileImage(res[0].url);
                    toast.success("Profile Picture has been uploaded")
                    setIsUploading(false);
                  }}
                  onUploadError={() => {
                    setIsUploading(false);
                    console.log("Something went wrong.");
                    toast.error("Something went wrong.")
                  }}
                  onUploadBegin={() => setIsUploading(true)}
                  className={cn(
                    "flex items-center justify-center w-full h-full",
                    "rounded-sm border-2 border-dashed border-gray-300",
                    "bg-red-950 hover:border-primary transition-colors duration-300 text-white",
                    "cursor-pointer",
                    "ut-button:bg-black ut-button:text-white ut-button:hover:bg-primary/90",
                    "ut-label:block ut-label:text-sm ut-label:text-gray-700",
                    "ut-allowed-content:block ut-allowed-content:text-xs ut-allowed-content:text-gray-400"
                  )}
                />
                <p className="text-red-500 text-xs">{fields.profileImage.errors}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Change" />
        </CardFooter>
      </form>
    </Card>
  );
}
