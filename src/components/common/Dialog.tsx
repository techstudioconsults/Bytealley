import { HTMLAttributes, ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { cn } from "~/utils/utils";

interface ReusableDialogProperties extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}

export function ReusableDialog({ trigger, title, description, children, className }: ReusableDialogProperties) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn(`sm:max-w-[425px]`, className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
