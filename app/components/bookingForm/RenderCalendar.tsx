"use client";
import Calendar from "./Calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { DateValue } from "@react-types/calendar";

interface iAppProps {
  availability: {
    day: string;
    isActive: boolean;
  }[];
}

export function RenderCalendar({ availability }: iAppProps) {
  console.log(availability);

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
   /*  const adjustIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; */

    return !availability[dayOfWeek].isActive;
  };
  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
    />
  );
}
