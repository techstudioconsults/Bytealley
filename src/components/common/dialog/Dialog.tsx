import { HTMLAttributes, ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { cn } from "~/utils/utils";

interface ReusableDialogProperties extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode;
  headerClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ReusableDialog({
  trigger,
  title,
  description,
  children,
  headerClassName,
  className,
  open,
  onOpenChange,
}: ReusableDialogProperties) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn(`sm:max-w-[425px]`, className)}>
        <DialogHeader>
          <DialogTitle className={headerClassName}>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
