import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = pathname.startsWith("/dashboard");
  const isAuthPage = pathname === "/" || pathname === "/register";

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
