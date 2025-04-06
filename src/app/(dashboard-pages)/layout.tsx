"use client";

// import DarkModeToggle from "~/components/common/theme-toggle";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
;
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/utils/utils";
import { DashboardNavbar } from "./_components/layout/navbar";
import { Sidebar } from "./_components/layout/sidebar/sidebar";

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
    <main className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 z-30 hidden w-64 flex-shrink-0 overflow-y-auto border-r bg-white xl:block",
          isEditor && "xl:hidden",
        )}
      >
        <Sidebar />
        {/* <DarkModeToggle /> */}
      </aside>

      {/* Main Content */}
      <div className={cn("flex flex-1 flex-col", isEditor ? "xl:pl-0" : "xl:pl-64")}>
        {/* Navbar */}
        <header className="sticky top-0 z-20 bg-white">
          <DashboardNavbar />
        </header>

        {/* Page Content */}
        <section className={cn(isEditor ? "p-0" : "container mx-auto p-4 py-8")}>
          {children}
          <Toaster />
        </section>
      </div>
    </main>
  );
}
