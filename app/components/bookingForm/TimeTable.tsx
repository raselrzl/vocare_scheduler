import prisma from "@/app/lib/db";
import { nylas } from "@/app/lib/nylas";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import {
  addMinutes,
  format,
  fromUnixTime,
  isAfter,
  isBefore,
  parse,
} from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GetFreeBusyRequest, GetFreeBusyResponse, NylasResponse } from "nylas";

async function getData(userName: string, selectedDate: Date) {
  const currentDay = format(selectedDate, "EEEE");
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);
  const data = await prisma.availability.findFirst({
    where: {
      day: currentDay as Prisma.EnumDayFilter,
      User: {
        userName: userName,
      },
    },
    select: {
      fromTime: true,
      isActive: true,
      tillTime: true,
      id: true,
      User: {
        select: {
          grantEmail: true,
          grantId: true,
        },
      },
    },
  });
  if (!data) {
    notFound();
  }
  const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data?.User?.grantId as string,
    requestBody: {
      startTime: Math.floor(startOfDay.getTime() / 1000),
      endTime: Math.floor(endOfDay.getTime() / 1000),
      emails: [data?.User?.grantEmail as string],
    },
  });
  return { data, nylasCalendarData };
}
interface iAppProps {
  selectedDate: Date;
  userName: string;
  duration: number;
}

function calculateAvailableTimeSlots(
  date: string,
  dbAvailability: {
    fromTime: string | undefined;
    tillTime: string | undefined;
  },
  nylasData: NylasResponse<GetFreeBusyResponse[]>,
  duration: number
) {
  const now = new Date();
  const availableFrom = parse(
    `${date} ${dbAvailability.fromTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  const availableTill = parse(
    `${date} ${dbAvailability.tillTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );
  console.log(nylasData);

  function isFreeBusyResponse(
    obj: any
  ): obj is { timeSlots: { startTime: number; endTime: number }[] } {
    return obj && obj.object === "free_busy" && Array.isArray(obj.timeSlots);
  }

  const busySlots =
    nylasData.data[0] && isFreeBusyResponse(nylasData.data[0])
      ? nylasData.data[0].timeSlots.map((slot) => ({
          start: fromUnixTime(slot.startTime),
          end: fromUnixTime(slot.endTime),
        }))
      : [];
  const allSlots = [];

  let currentSlot = availableFrom;
  while (isBefore(currentSlot, availableTill)) {
    allSlots.push(currentSlot);
    currentSlot = addMinutes(currentSlot, duration);
  }

  const freeSlots = allSlots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration);

    return (
      isAfter(slot, now) &&
      !busySlots.some(
        (busy: { start: any; end: any }) =>
          (!isBefore(slot, busy.start) && isBefore(slot, busy.end)) ||
          (!isAfter(slotEnd, busy.start) && isAfter(slotEnd, busy.end)) ||
          (!isBefore(slot, busy.start) && isAfter(slotEnd, busy.end))
      )
    );
  });
  return freeSlots.map((slot) => format(slot, "HH:mm"));
}
export default async function TimeTable({
  selectedDate,
  userName,
  duration,
}: iAppProps) {
  const { data, nylasCalendarData } = await getData(userName, selectedDate);

  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const dbAvailability = {
    fromTime: data?.fromTime,
    tillTime: data?.tillTime,
  };
  const availableSlots = calculateAvailableTimeSlots(
    formattedDate,
    dbAvailability,
    nylasCalendarData,
    duration
  );

  /*  console.log(nylasCalendarData.data[0].timeSlots); */
  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")}{" "}
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, "MMM. d")}
        </span>
      </p>
      <div className="mt-3 max-h-[350px] overflow-y-auto">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <Link
              href={`?date=${format(selectedDate, "yyyy-MM-dd")}&time=${slot}`}
              key={index}
            >
              <Button className="w-full mb-2" variant={"outline"}>
                {slot}
              </Button>
            </Link>
          ))
        ) : (
          <p>No time available</p>
        )}
      </div>
    </div>
  );
}
