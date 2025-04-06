import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Sidebar, SidebarContent } from "~/components/ui/sidebar";
import { cn } from "~/utils/utils";
import { SidebarNav } from "./sidebar";

export function AppSidebar() {
  const pathName = usePathname();
  const [isEditor, setIsEditor] = useState(false);

  useEffect(() => {
    const init = () => {
      setIsEditor(pathName.includes("editor"));
    };
    init();
  }, [pathName]);
  return (
    <Sidebar className={cn(!isEditor && `sticky left-0 top-0`)}>
      <SidebarContent className={`bg-white`}>
        <SidebarNav />
      </SidebarContent>
    </Sidebar>
  );
}
