import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { env } from "./env";
import { Role } from "./lib/members";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: env.AUTH_SECRET,
    cookieName: "admin_session_token",
  });

  console.log("Token:", token);

  if (!token?.role) {
    console.log("No valid token found, redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = token.role as Role;

  if (role === Role.SUPER_ADMIN || role === Role.REGISTRATION) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith(`/event/${role}`)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(`/event/${role}`, request.url));
}

export const config = {
  matcher: ["/", "/event/:path*"],
};
