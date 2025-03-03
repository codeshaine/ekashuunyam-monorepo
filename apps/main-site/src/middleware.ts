import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { env } from "./env";

export async function middleware(request: NextRequest) {
  const hasValidToken = await getToken({
    req: request,
    secret: env.AUTH_SECRET,
    cookieName: "user_session_token",
  });
  if (!hasValidToken) {
    const redirectUrl = new URL("/login", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/form/:path*"],
};
