import { RenderCalendar } from "@/app/components/bookingForm/RenderCalendar";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Camera, Clock } from "lucide-react";
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
};

export default async function BookingFormPage(props: {
  params: Promise<{ username: string; eventUrl: string }>;
  searchParams: SearchParams;
}) {
  const { username, eventUrl } = await props.params;
  const data = await getData(eventUrl, username);
  const { date } =await props.searchParams;
  const selectedDate=date ? new Date(date):new Date()
  const formattedDate=new Intl.DateTimeFormat("en-US",{
    weekday:"long",
    day:"numeric",
    month:"long",
  }).format(selectedDate)
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
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
            <RenderCalendar availability={data.User?.availability as any}/>
          </div>

          {/* Second Separator */}
          <Separator
            orientation="vertical"
            className="h-full w-[1px] bg-gray-300"
          />

          {/* Third div */}
          <div>
            <h3 className="text-base font-semibold mb-2">Booking Details</h3>
            <p className="text-sm text-muted-foreground">This is my 3rd div</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
