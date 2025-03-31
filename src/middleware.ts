import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./server/auth";

export default async function middleware(request: NextRequest) {
  const session = await auth();

  // If there's no session and user is trying to access a protected route
  if (!session) {
    // Redirect to the homepage
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Define which paths this middleware applies to
export const config = {
  matcher: ["/sales/:path*", "/invoices/:path*"],
};
