"use client";

import { useSession } from "~/hooks/use-session";
import Loading from "../Loading";
import { DashboardNavbar } from "./_components/layout/navbar";
import { Sidebar } from "./_components/layout/sidebar/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useSession();

  if (!user) {
    return <Loading />;
  }

  return (
    <main className="flex">
      <Sidebar />
      <section className="w-full">
        <DashboardNavbar />
        <div className="p-[16px] lg:p-[32px]">{children}</div>
      </section>
    </main>
  );
}
