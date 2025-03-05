import React from "react";

import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navbar />
      <section>{children}</section>
      <Footer />
    </section>
  );
}
