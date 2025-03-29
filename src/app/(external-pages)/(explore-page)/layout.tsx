import React from "react";

import { CartProvider } from "~/context/cart-provider";
import { Footer } from "../_components/footer";
import { ExploreNavbar } from "./explore/_components/layout/navbar";
import { SubFooter } from "./explore/_components/layout/sub-footer";

export default function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <ExploreNavbar />
      <main>{children}</main>
      <SubFooter />
      <Footer />
    </CartProvider>
  );
}
