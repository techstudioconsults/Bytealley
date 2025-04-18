import * as React from "react";

import { cn } from "~/utils/utils";

export interface InputProperties extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProperties>(({ className, type, ...properties }, reference) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={reference}
      {...properties}
    />
  );
});
Input.displayName = "Input";

export { Input };
