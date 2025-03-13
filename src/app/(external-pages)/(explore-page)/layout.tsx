import React from "react";

import { CartProvider } from "~/context/cart-provider";
import { Footer } from "../_components/footer";
import { ExploreNavbar } from "./explore/_components/layout/navbar";

export default function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <ExploreNavbar />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}
