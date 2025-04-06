"use client";

// import DarkModeToggle from "~/components/common/theme-toggle";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { SidebarProvider } from "~/components/ui/sidebar";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/utils/utils";
import { DashboardNavbar } from "./_components/layout/navbar";
import { AppSidebar } from "./_components/layout/sidebar/app-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const [isEditor, setIsEditor] = useState(false);

  useEffect(() => {
    const init = () => {
      setIsEditor(pathName.includes("editor"));
    };
    init();
  }, [pathName]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={`w-full`}>
        <DashboardNavbar />
        <section className={cn(isEditor ? "p-0" : "p-4 py-8")}>
          {children}
          <Toaster />
        </section>
      </main>
    </SidebarProvider>
  );
}
