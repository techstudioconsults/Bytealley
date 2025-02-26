"use client";

import { MenuIcon } from "lucide-react";
import { FC, useState } from "react";

import { DialogTitle } from "~/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Sidebar } from "../sidebar/sidebar";

export const Drawer: FC<ISidebarProperties> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className={`xl:hidden`}>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side={`left`}>
        <DialogTitle hidden>Navigation Menu</DialogTitle>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
