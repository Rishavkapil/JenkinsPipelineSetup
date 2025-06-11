import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const publicPaths = ["/"];
  // const publicPaths = ["/", "/sign-in", "/signup"];
  const privatePaths = [
    "/dashboard",
    "/kyc-details",
    "/profile",
    "/settings",
    "/wallets/crypto",
    "/contact",
  ];

  const currentPath = req.nextUrl.pathname;
  const isLogin = req.cookies.get("isLogin")?.value || "";
  if (currentPath === "/") {
    return NextResponse.next(); // Always allow access to the home page
  }
  // If the current path is a private path, check for token immediately
  if (privatePaths.includes(currentPath)) {
    if (!isLogin) {
      return NextResponse.redirect(new URL("/", req.url));
      // return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
  // If the current path is a public path and the user has a valid token, redirect to the dashboard
  if (publicPaths.includes(currentPath)) {
    if (isLogin) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    // "/sign-in",
    // "/signup",
    // "/dashboard",
    // "/kyc-details",
    // "/profile",
    // "/settings",
    // "/wallets/crypto",
    // "/order-details",
    // "/contact",
  ],
};
