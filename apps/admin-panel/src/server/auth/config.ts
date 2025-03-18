import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { db } from "../db/prisma-client";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { env } from "@/env";
import { allowedMembers, Role } from "@/lib/members";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    college?: string;
    role?: Role;
  }
  interface JWT {
    id: string;
    role: Role;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
    Resend({
      from: "noreply@ekashunyam.xyz",
    }),
  ],
  /*eslint-disable*/
  adapter: PrismaAdapter(db as any),
  /*eslint-enable*/
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: { name: "admin_session_token" },
    csrfToken: { name: "admin_csrf_token" },
    callbackUrl: { name: "admin_callback_url" },
  },
  callbacks: {
    signIn: async ({ user }) => {
      if (
        user.email &&
        allowedMembers.map((member) => member.email).includes(user.email)
      ) {
        return true;
      }
      return false;
    },
    redirect: async ({ url, baseUrl }) => {
      if (!url.includes("error")) return baseUrl;
      return url;
    },
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        token.id = user.id;
        token.role =
          allowedMembers.find((member) => member.email == user.email)?.role ??
          Role.ERROR;
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as Role,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth/error",
  },
};
