"use client";

import warningIcon from "@/images/bad.svg";
import errorIcon from "@/images/error.svg";
import defaultIcon from "@/images/info.svg";
import successIcon from "@/images/success.svg";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import * as React from "react";

import { cn } from "~/utils/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Viewport
    ref={reference}
    className={cn(
      "fixed left-1/2 top-0 z-[100] flex max-h-screen w-full max-w-[100vw] -translate-x-1/2 flex-col items-center p-4 sm:flex-col",
      className,
    )}
    {...properties}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full max-w-[702px] h-auto min-h-[88px] items-center justify-between space-x-4 overflow-hidden rounded-md border-default p-4 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-top-full data-[state=open]:slide-in-from-top-full bg-white dark:bg-black text-foreground",
  {
    variants: {
      variant: {
        default: "",
        error: "",
        success: "",
        warning: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const variantIcons = {
  default: defaultIcon,
  error: errorIcon,
  success: successIcon,
  warning: warningIcon,
} as const;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...properties }, reference) => {
  return (
    <ToastPrimitives.Root ref={reference} className={cn(toastVariants({ variant }), className)} {...properties}>
      <div className="flex w-full flex-col">
        <div className="flex items-center gap-4">
          <Image
            src={variantIcons[variant ?? "default"]}
            alt=""
            className="h-[50px] w-[50px] border-r border-r-black object-contain"
          />
          <div className="flex flex-1 flex-col">{properties.children}</div>
        </div>
      </div>
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Action
    ref={reference}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className,
    )}
    {...properties}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Close
    ref={reference}
    className={cn("absolute bottom-4 right-4 text-sm text-primary hover:text-gray-700", className)}
    toast-close=""
    {...properties}
  >
    Close
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Title ref={reference} className={cn("text-sm font-semibold", className)} {...properties} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Description ref={reference} className={cn("text-sm opacity-90", className)} {...properties} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProperties = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProperties as ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
