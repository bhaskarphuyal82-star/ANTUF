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

    console.log('[Middleware] Path:', url, 'isAdmin:', isAdmin, 'hasToken:', !!token);

    // Don't redirect API routes - let them handle auth
    if (url?.startsWith("/api/")) {
      return;
    }

    // Check admin access
    if (url?.includes("/admin")) {
      if (!isAdmin) {
        console.log('[Middleware] Blocking non-admin access to:', url);
        // Preserve the original URL as callback for after login
        const callbackUrl = encodeURIComponent(req.url);
        return NextResponse.redirect(new URL(`/?error=unauthorized&callbackUrl=${callbackUrl}`, req.url));
      }
      console.log('[Middleware] Allowing admin access to:', url);
    }

    // Check regular user access
    if (url?.includes("/dashboard/users") && !token) {
      const callbackUrl = encodeURIComponent(req.url);
      return NextResponse.redirect(new URL(`/?callbackUrl=${callbackUrl}`, req.url));
    }
  },

  {
    callbacks: {
      authorized: ({ token, req }) => {
        const url = req.nextUrl.pathname;

        console.log('[Middleware Auth] Checking:', url, 'hasToken:', !!token);

        // If no token, deny access
        if (!token) {
          console.log('[Middleware Auth] No token, denying access');
          return false;
        }

        // For admin routes, check if user is admin
        if (url?.includes("/admin")) {
          const isAdmin = token?.user?.isAdmin || token?.user?.role === "admin";
          console.log('[Middleware Auth] Admin check:', isAdmin);
          return isAdmin;
        }

        // For other protected routes, just check if logged in
        return true;
      },
    },
    pages: {
      signIn: "/",  // Redirect unauthorized users to home page
    },
  }
);
