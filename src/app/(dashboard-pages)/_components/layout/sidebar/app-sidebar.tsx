import { Sidebar, SidebarContent } from "~/components/ui/sidebar";
import { UseEditor } from "~/hooks/use-editor";
import { cn } from "~/utils/utils";
import { SidebarNav } from "./sidebar";

export function AppSidebar() {
  const { isEditor } = UseEditor();
  return (
    <Sidebar className={cn(!isEditor && `left-0 top-0 lg:sticky`)}>
      <SidebarContent className={`overflow-hidden bg-white`}>
        <SidebarNav />
      </SidebarContent>
    </Sidebar>
  );
}
