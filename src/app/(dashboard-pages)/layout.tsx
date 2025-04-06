"use client";

// import DarkModeToggle from "~/components/common/theme-toggle";
import { SidebarProvider } from "~/components/ui/sidebar";
import { Toaster } from "~/components/ui/sonner";
import { UseEditor } from "~/hooks/use-editor";
import { cn } from "~/utils/utils";
import { DashboardNavbar } from "./_components/layout/navbar";
import { AppSidebar } from "./_components/layout/sidebar/app-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isEditor } = UseEditor();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={`h-fit w-full`}>
        <DashboardNavbar />
        <section className={cn(isEditor ? "p-0" : "p-4 lg:p-8")}>
          {children}
          <Toaster />
        </section>
      </main>
    </SidebarProvider>
  );
}
