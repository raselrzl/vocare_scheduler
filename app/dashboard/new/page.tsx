"use client";
import { createEventTypeAction } from "@/app/action";
import { SubmitButton } from "@/app/components/SubmitButton";
import { createEventTypeSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useActionState, useState } from "react";

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export default function NewEventPage() {
  const [activePlatform, setActivePlatform] =
    useState<VideoCallProvider>("Google Meet");

  const [lastResult, action] = useActionState(createEventTypeAction, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: createEventTypeSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Add New Appointment Type</CardTitle>
          <CardDescription>
            Create a new appointment type that allows people to book time with
            you.
          </CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                id="title"
                placeholder="30 Minute Meeting"
              />
              <p className="text-red-500 text-xs">{fields.title.errors}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                <span className="text-muted-foreground text-sm">
                  yourdomain.com/
                </span>
                <Input
                  name={fields.url.name}
                  key={fields.url.key}
                  defaultValue={fields.url.initialValue}
                  id="slug"
                  placeholder="meeting-30min"
                  className="flex-1"
                />
                <p className="text-red-500 text-xs">{fields.url.errors}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={fields.description.initialValue}
                id="description"
                placeholder="This is the meeting about!"
              />
              <p className="text-red-500 text-xs">{fields.description.errors}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={fields.duration.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Min</SelectItem>
                    <SelectItem value="30">30 Min</SelectItem>
                    <SelectItem value="45">45 Min</SelectItem>
                    <SelectItem value="60">60 Min</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-xs">{fields.duration.errors}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video">Video Call Provider</Label>
              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={activePlatform}
              />
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <ButtonGroup>
                  <Button
                    variant={
                      activePlatform === "Zoom Meeting"
                        ? "secondary"
                        : "outline"
                    }
                    type="button"
                    className="flex-1 rounded-none"
                    onClick={() => setActivePlatform("Zoom Meeting")}
                  >
                    Zoom
                  </Button>
                  <Button
                    variant={
                      activePlatform === "Google Meet" ? "secondary" : "outline"
                    }
                    type="button"
                    className="flex-1 rounded-none"
                    onClick={() => setActivePlatform("Google Meet")}
                  >
                    Google Meet
                  </Button>
                  <Button
                    variant={
                      activePlatform === "Microsoft Teams"
                        ? "secondary"
                        : "outline"
                    }
                    type="button"
                    className="flex-1 rounded-none"
                    onClick={() => setActivePlatform("Microsoft Teams")}
                  >
                    Microsoft Teams
                  </Button>
                </ButtonGroup>
                <p className="text-red-500 text-xs">{fields.videoCallSoftware.errors}</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 mt-8">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/">Cancel</Link>
            </Button>
            <SubmitButton
              text="Create Event Type"
              className="w-full sm:w-auto"
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
