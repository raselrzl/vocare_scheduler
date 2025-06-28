"use client"
import { CalendarState } from "@react-stately/calendar";
import { AriaButtonProps, useButton } from "@react-aria/button";
import { Button } from "@/components/ui/button";
import { mergeProps } from "@react-aria/utils";
import { useRef } from "react";
import {useFocusRing} from "@react-aria/focus"

export function CalendarButton(
  props: AriaButtonProps<"button"> & {
    state?: CalendarState;
    side?: "left" | "right";
  }
) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps } = useFocusRing();
  return (
    <Button
      variant={"outline"}
      disabled={props.isDisabled}
      ref={ref}
      size="icon"
      {...mergeProps(buttonProps, focusProps)}
    >
      {props.children}
    </Button>
  );
}
