import React from "react";

import { Footer } from "../_components/footer";
import { ExploreNavbar } from "./explore/_components/layout/navbar";

export default function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ExploreNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
