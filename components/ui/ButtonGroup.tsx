"use client"
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { ReactElement, cloneElement } from "react";

type ButtonProps = React.ComponentProps<typeof Button>;

interface iAppProps {
  className?: string;
  children: ReactElement<ButtonProps>[];
}

export function ButtonGroup({ className, children }: iAppProps) {
  const totalButtons = children.length;

  return (
    <div className={cn("flex w-full gap-0", className)}>
      {children.map((child, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === totalButtons - 1;

        return cloneElement(child, {
            key: index,
          className: cn(
            "rounded-none border",
            {
              "rounded-l-md": !isFirstItem,
              "rounded-r-md": !isLastItem,
              "border-l-0": !isFirstItem,
            },
            child.props.className
          ),
        });
      })}
    </div>
  );
}
