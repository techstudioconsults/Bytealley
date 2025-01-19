import { NextResponse } from "next/server";

import { authRoutes } from "./lib/session/routes";
import { getSession } from "./lib/session/session";

export async function middleware(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  const session = await getSession();

  if (session && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/admin/home", url)); // Redirect to a dashboard or home page
  }

  if (authRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Apply middleware to admin routes only
};
