import { DashboardNavbar } from "./_components/layout/navbar";
import { Sidebar } from "./_components/layout/sidebar/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
