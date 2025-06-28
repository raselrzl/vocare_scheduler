"use client";

import { useCalendar, useLocale } from "react-aria";
import { useCalendarState } from "react-stately";
import { createCalendar } from "@internationalized/date";
import { DateValue, CalendarProps } from "@react-types/calendar";
import CalendarHeader from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";

export default function Calendar(props: CalendarProps<DateValue>) {
  let { locale } = useLocale();
  let state = useCalendarState({
    createCalendar,
    visibleDuration: { months: 1 },
    ...props,
    locale,
  });

  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );
  return (
    <div className="inline-block" {...calendarProps}>
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        nextButtonProps={nextButtonProps}
        prevButtonProps={prevButtonProps}
      />

      <div className="flex gap-8">
          <CalendarGrid state={state}/>
      </div>
    </div>
  );
}
