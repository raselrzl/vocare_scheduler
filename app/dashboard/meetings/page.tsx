import EmptyState from "@/app/components/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { nylas } from "@/app/lib/nylas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, fromUnixTime } from "date-fns";
import { CalendarCheck, Video } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });
  if (!userData) {
    throw new Error("User not Found");
  }
  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });
  return data;
}

export default async function MeetingsPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  console.log(data);
  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No meeting found"
          description="You don't have any meetings yet"
          buttonText="Create a new event"
          href="/dashboard/new"
        />
      ) : (
        <div className="grid grid-cols-1">
          <Card className="rounded-sm shadow-sm border">
            <div className="p-4">
              <h1 className="text-primary font-bold text-2xl">Bookings</h1>
              <p className="text-primary/60">
                Here you can see your upcoming booking.
              </p>
            </div>
            {data.data.map((booking) => {
              const startTime =
                (booking.when as any).startTime ?? (booking.when as any).time;
              const endTime =
                (booking.when as any).endTime ?? (booking.when as any).time;

              return (
                <form key={booking.id} className="px-2">
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 text-sm">
                      <div className="col-span-1">
                        <p>
                          {format(fromUnixTime(startTime), "EEE, dd MMM yyyy")}
                        </p>
                        <p>
                          {format(fromUnixTime(startTime), "hh:mm a")} -{" "}
                          {format(fromUnixTime(endTime), "hh:mm a")}
                        </p>
                        {booking.conferencing &&
                          (booking.conferencing as any)?.details?.url && (
                            <div className="flex items-start gap-1">
                              <Video className="text-blue-700 size-5" />
                              <a
                                href={
                                  (booking.conferencing as any)?.details?.url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 underline line-clamp-1"
                              >
                                Join Meeting
                              </a>
                            </div>
                          )}
                      </div>

                      <div className="col-span-1">
                        <a
                          href={booking.htmlLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 underline line-clamp-1 flex"
                        >
                          <CalendarCheck className="text-green-500 size-5" />{" "}
                          View in Calendar
                        </a>
                        <h2 className="text-base font-semibold line-clamp-1">
                          {booking.title}
                        </h2>
                        {booking.description && (
                          <p className="text-muted-foreground text-xs line-clamp-2">
                            {booking.description}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end pt-2">
                        <SubmitButton
                          text="Cancel Event"
                          variant="destructive"
                          className="w-fit"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <Separator className="my-2" />
                </form>
              );
            })}
          </Card>
        </div>
      )}
    </>
  );
}
