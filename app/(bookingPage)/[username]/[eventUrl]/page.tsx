import { createMeetingAction } from "@/app/action";
import { RenderCalendar } from "@/app/components/bookingForm/RenderCalendar";
import TimeTable from "@/app/components/bookingForm/TimeTable";
import { SubmitButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CalendarX2, Camera, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        userName: userName,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      User: {
        select: {
          image: true,
          name: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });
  if (!data) {
    notFound();
  }
  return data;
}

type SearchParams = {
  date?: string;
  time?: string;
};

export default async function BookingFormPage(props: {
  params: Promise<{ username: string; eventUrl: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { username, eventUrl } = await props.params;
  const { date, time } = await props.searchParams;
  const data = await getData(eventUrl, username);
  const selectedDate = date ? new Date(date) : new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  const showForm = !!date && !!time;
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      {showForm ? (
        <Card className="max-w-[1000px] w-full mx-auto rounded-md">
          <CardContent className="p-5 grid md:grid-cols-[1fr_auto_1fr] gap-6 items-start">
            {/* First div */}
            <div className="space-y-4">
              <img
                src={data.User?.image as string}
                alt="profile image"
                className="size-10 rounded-full"
              />
              <p className="text-sm font-bold">{data.User?.name}</p>
              <h1 className="text-lg">{data.title}</h1>
              <h1 className="text-xs font-medium text-muted-foreground">
                {data.description}
              </h1>

              <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  {formattedDate ?? "Not provided"}
                </p>
                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-primary" />
                  {data.duration} Minutes
                </p>
                <p className="flex items-center">
                  <Camera className="size-4 mr-2 text-primary" />
                  {data.videoCallSoftware}
                </p>
              </div>
            </div>

            {/* Second Separator */}
            <Separator
              orientation="vertical"
              className="h-full w-[1px] bg-gray-300"
            />

            {/* Third div */}
            <div>
              <form action={createMeetingAction}>
                <input type="hidden" name="fromTime" value={time} />
                <input type="hidden" name="eventDate" value={date} />
                <input
                  type="hidden"
                  name="meetingLength"
                  value={data.duration}
                />
                <input
                  type="hidden"
                  name="provider"
                  value={data.videoCallSoftware}
                />
                <input type="hidden" name="username" value={username} />
                <input type="hidden" name="eventTypeId" value={data.id} />

                <div className="flex flex-col gap-y-2 mb-4">
                  <Label>Your Name</Label>
                  <Input placeholder="Jhon Doe" name="name" />
                </div>
                <div className="flex flex-col gap-y-2 mb-4">
                  <Label>Your Email</Label>
                  <Input placeholder="example@gmail.com" name="email" />
                </div>
                <SubmitButton text="Book Meeting" />
              </form>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border-2 mb-2 font-semibold transition"
          >
            {"<<"}Go to Dashboard
          </Link>
          <Card className="max-w-[1000px] w-full mx-auto rounded-md">
            <CardContent className="p-5 grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 items-start">
              {/* First div */}
              <div className="space-y-4">
                <img
                  src={data.User?.image as string}
                  alt="profile image"
                  className="size-10 rounded-full"
                />
                <p className="text-sm font-bold">{data.User?.name}</p>
                <h1 className="text-lg">{data.title}</h1>
                <h1 className="text-xs font-medium text-muted-foreground">
                  {data.description}
                </h1>

                <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                  <p className="flex items-center">
                    <CalendarX2 className="size-4 mr-2 text-primary" />
                    {formattedDate ?? "Not provided"}
                  </p>
                  <p className="flex items-center">
                    <Clock className="size-4 mr-2 text-primary" />
                    {data.duration} Minutes
                  </p>
                  <p className="flex items-center">
                    <Camera className="size-4 mr-2 text-primary" />
                    {data.videoCallSoftware}
                  </p>
                </div>
              </div>

              {/* First Separator */}
              <Separator
                orientation="vertical"
                className="h-full w-[1px] bg-gray-300"
              />

              {/* Second div: Calendar */}
              <div>
                <RenderCalendar availability={data.User?.availability as any} />
              </div>

              {/* Second Separator */}
              <Separator
                orientation="vertical"
                className="h-full w-[1px] bg-gray-300"
              />

              {/* Third div */}
              <div>
                <TimeTable
                  selectedDate={selectedDate}
                  userName={username}
                  duration={data.duration}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
