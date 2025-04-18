import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "~/utils/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...properties }, reference) => (
  <TooltipPrimitive.Content
    ref={reference}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-gray-900 px-3 py-1.5 text-sm text-gray-50 animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...properties}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipProperties {
  content: string | React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
  delayDuration?: number;
  disableHoverableContent?: boolean;
}

const Tooltip = ({
  content,
  children,
  side = "top",
  align = "center",
  className,
  delayDuration = 300,
  disableHoverableContent = false,
}: TooltipProperties) => {
  return (
    <TooltipRoot delayDuration={delayDuration} disableHoverableContent={disableHoverableContent}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} align={align} className={className}>
        {content}
      </TooltipContent>
    </TooltipRoot>
  );
};

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent };
