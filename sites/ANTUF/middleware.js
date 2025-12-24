import { withAuth } from "next-auth/middleware";

import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/dashboard/users/:path*",
    "/dashboard/admin/:path*",
    "/api/user/:path*",
    "/api/admin/:path*",
  ],
};

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const token = req.nextauth?.token;
    const userRole = token?.user?.role;
    const isAdmin = token?.user?.isAdmin || userRole === "admin";

    // Don't redirect API routes - let them handle auth
    if (url?.startsWith("/api/")) {
      return;
    }

    // Check admin access
    if (url?.includes("/admin")) {
      if (!isAdmin) {
        // Redirect non-admin users to home
        return NextResponse.redirect(new URL("/?error=unauthorized", req.url));
      }
    }

    // Check regular user access
    if (url?.includes("/dashboard/users") && !token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },

  {
    callbacks: {
      authorized: ({ token, req }) => {
        const url = req.nextUrl.pathname;
        
        // If no token, deny access
        if (!token) {
          return false;
        }

        // For admin routes, check if user is admin
        if (url?.includes("/admin")) {
          const isAdmin = token?.user?.isAdmin || token?.user?.role === "admin";
          return isAdmin;
        }

        // For other protected routes, just check if logged in
        return true;
      },
    },
  }
);
