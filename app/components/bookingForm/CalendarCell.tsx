import { useRef } from "react";
import { mergeProps, useCalendarCell, useFocusRing } from "react-aria";
import { CalendarState } from "react-stately";
import {
  CalendarDate,
  getLocalTimeZone,
  isSameMonth,
  isToday,
} from "@internationalized/date";
import { cn } from "@/lib/utils";

export function CalendarCell({
  state,
  date,
  currentMonth,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
}) {
  let ref = useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  const { focusProps, isFocusVisible } = useFocusRing();
  const isDateTodat = isToday(date, getLocalTimeZone());

  const isOutsideOfMonth = !isSameMonth(currentMonth, date);

  return (
    <td
      {...cellProps}
      className={`py-0.5 px-0.5 relative ${isFocusVisible ? "z-10" : "z-0"}`}
    >
      <div
        ref={ref}
        hidden={isOutsideOfMonth}
        className="size-10 sm:size-12 outline-none rounded-md"
        {...mergeProps(buttonProps, focusProps)}
      >
        <div
          className={cn(
            "size-full rounded-sm flex items-center justify-center text-sm font-semibold cursor-pointer",
            isSelected ? "bg-primary text-white" : "",
            isDisabled ? "text-muted-foreground cursor-not-allowed" : "",
            !isSelected && !isDisabled ? "bg-primary/10" : ""
          )}
        >
          {formattedDate}
          {isDateTodat && (
            <div
              className={cn(
                "absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-primary rounded-full",
                isSelected && "bg-white"
              )}
            />
          )}
        </div>
      </div>
    </td>
  );
}
