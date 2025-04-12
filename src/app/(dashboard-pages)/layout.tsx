"use client";

import { DashboardSidebar } from "~/components/common/sidebar/sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/context/theme-provider";
import { sideItems } from "~/utils/constants";
import { cn } from "~/utils/utils";
import { DashboardNavbar } from "./_components/layout/navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <main className={`overflow-hidden`}>
        <Toaster />
        <SidebarProvider>
          <DashboardSidebar navItems={sideItems} />
          <SidebarInset>
            <DashboardNavbar />
            <section className={cn("calculated-height px-8 py-4")}>{children}</section>
          </SidebarInset>
        </SidebarProvider>
      </main>
    </ThemeProvider>
  );
}
