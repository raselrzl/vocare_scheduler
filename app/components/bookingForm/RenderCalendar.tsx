"use client";
import Calendar from "./Calendar";
import { today, getLocalTimeZone, parseDate, CalendarDate } from "@internationalized/date";
import { DateValue } from "@react-types/calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface iAppProps {
  availability: {
    day: string;
    isActive: boolean;
  }[];
}

export function RenderCalendar({ availability }: iAppProps) {
  const searchParams=useSearchParams()
  const router=useRouter();

  useEffect(()=>{
    const dateParam=searchParams.get("date")
    if(dateParam){
        setDate(parseDate(dateParam));
    }
  },[searchParams]);

  const handleDateChange=(date:DateValue)=>{
    setDate(date as CalendarDate)
    const url=new URL(window.location.href);
    url.searchParams.set("date",date.toString());
    router.push(url.toString())

  }
  console.log(availability);
  const [date, setDate]=useState(()=>{
    const dateParam=searchParams.get("date")
    return dateParam ? parseDate(dateParam): today(getLocalTimeZone())
  })

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
    const adjustIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    return !availability[adjustIndex].isActive;
  };
  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
      value={date}
      onChange={handleDateChange}
    />
  );
}
