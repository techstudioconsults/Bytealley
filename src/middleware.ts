import { NextResponse } from "next/server";

import {
  adminRoutes,
  authRoutes,
  isUserSpecificRoute,
  publicRoutes,
  superAdminRoutes,
  userRoutes,
} from "./lib/session/routes";
import { getSession } from "./lib/session/session";

export async function middleware(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  // Get session and user details
  const session = await getSession();
  const userRole = session?.user?.role;
  const userId = session?.user?.id;

  // Skip middleware for auth callback routes
  if (pathname.startsWith("/auth/fetching-data")) {
    return NextResponse.next();
  }
  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Handle auth routes (login, register, etc.)
  if (authRoutes.includes(pathname)) {
    if (session) {
      // If user is already logged in, redirect based on their role
      if (userRole === "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/SUPER_ADMIN/dashboard", url));
      } else if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/home", url));
      } else {
        return NextResponse.redirect(new URL(`/dashboard/${userId}/home`, url));
      }
    }
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", url));
  }

  // Handle routes based on user role
  switch (userRole) {
    case "SUPER_ADMIN": {
      // Super admin can access everything
      if (
        [...superAdminRoutes, ...adminRoutes, ...userRoutes].some((route) =>
          pathname.startsWith(route.split(":")[0]),
        )
      ) {
        return NextResponse.next();
      }
      break;
    }

    case "ADMIN": {
      // Admin can access admin routes and user routes
      if (
        [...adminRoutes, ...userRoutes].some((route) =>
          pathname.startsWith(route.split(":")[0]),
        )
      ) {
        return NextResponse.next();
      }
      break;
    }

    case "USER": {
      // Users can only access their own routes
      const isUserRoute = userRoutes.some((route) => {
        if (isUserSpecificRoute(userId!, route)) {
          const actualRoute = route.replace(":userID", userId!);
          return pathname.startsWith(actualRoute);
        }
        return false;
      });

      if (isUserRoute) {
        return NextResponse.next();
      }
      break;
    }

    default: {
      // Invalid role or no role
      return NextResponse.redirect(new URL("/auth/login", url));
    }
  }

  // If none of the above conditions are met, redirect to appropriate homepage
  if (userRole === "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/SUPER_ADMIN/dashboard", url));
  } else if (userRole === "ADMIN") {
    return NextResponse.redirect(new URL("/admin/home", url));
  } else {
    return NextResponse.redirect(new URL(`/dashboard/${userId}/home`, url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js internals)
     * - static (static files)
     * - images (image files)
     * - favicon.ico (favicon file)
     * - public (public assets)
     */
    "/((?!api|_next|static|images|favicon.ico|public).*)",
  ],
};
