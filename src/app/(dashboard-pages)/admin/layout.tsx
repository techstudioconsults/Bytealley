import { Suspense } from "react";

import SessionProvider from "~/context/session-provider";
import Sidebar from "./_components/layout/sidebar/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <SessionProvider>
        <Sidebar />
        <section className="w-full">
          <div className="bg-high-grey-I p-[16px] lg:p-[32px]">
            <Suspense>{children}</Suspense>
          </div>
        </section>
      </SessionProvider>
    </main>
  );
}
