"use client";

import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

import { DialogTitle } from "~/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { cn } from "~/utils/utils";
import { Sidebar } from "../sidebar/sidebar";

export const Drawer: FC<ISidebarProperties> = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditor, setHasEditor] = useState(false);

  useEffect(() => {
    setHasEditor(pathName.includes(`editor`));
  }, [pathName]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className={cn(`xl:hidden`, isEditor && `xl:block`)}>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side={`left`}>
        <DialogTitle hidden>Navigation Menu</DialogTitle>
        <Sidebar onClose={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};
