import { Sidebar, SidebarContent } from "~/components/ui/sidebar";
import { UseEditor } from "~/hooks/use-editor";
import { cn } from "~/utils/utils";
import { SidebarNav } from "./sidebar";

export function AppSidebar() {
  const { isEditor } = UseEditor();
  return (
    <Sidebar className={cn(!isEditor && `sticky left-0 top-0`)}>
      <SidebarContent className={`overflow-hidden bg-white`}>
        <SidebarNav />
      </SidebarContent>
    </Sidebar>
  );
}
