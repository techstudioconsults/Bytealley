"use client";

import { DashboardSidebar } from "~/components/common/sidebar/sidebar";
import { SidebarInset } from "~/components/ui/sidebar";
import { Toaster } from "~/components/ui/sonner";
import { sideItems } from "~/utils/constants";
import { cn } from "~/utils/utils";
import { DashboardNavbar } from "./_components/layout/navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-screen overflow-auto">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar navItems={sideItems} />
        {/* Main content */}
        <SidebarInset className={cn("flex-1 overflow-auto")}>
          <DashboardNavbar />
          <section className={``}>{children}</section>
        </SidebarInset>
        <Toaster />
      </div>
    </main>
  );
}
