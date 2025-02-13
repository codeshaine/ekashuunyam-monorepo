import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(request: NextRequest) {
  const hasValidToken = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName: "user_session_token",
  });
  console.log("hasValidToken", hasValidToken);
  if (!hasValidToken) {
    const redirectUrl = new URL("/login", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};
