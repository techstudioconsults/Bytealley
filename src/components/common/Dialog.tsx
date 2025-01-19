import React from "react";

import { Dialog } from "~/components/ui/dialog";

interface DialogDemoProperties {
  open: boolean;
  onOpenChanged: (open: boolean) => void;
  children: React.ReactNode;
}

export function DialogDemo({
  open,
  onOpenChanged,
  children,
}: DialogDemoProperties) {
  return (
    <Dialog open={open} onOpenChange={onOpenChanged}>
      {children}
    </Dialog>
  );
}
