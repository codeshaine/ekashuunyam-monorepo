import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { db } from "../db/prisma-client";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { env } from "@/env";

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
      isAdmin: boolean;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    isAdmin?: boolean;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    college?: string;
  }
  interface JWT {
    id: string;
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
      clientSecret: env.AUTH_GOOGLE_SECRET!,
    }),
    Resend({
      from: "noreply@ekashunyam.tech",
    }),
  ],
  /*eslint-disable*/
  adapter: PrismaAdapter(db as any),
  /*eslint-enable*/
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: { name: "user_session_token" },
    csrfToken: { name: "user_csrf_token" },
    callbackUrl: { name: "user_callback_url" },
  },
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      if (!url.includes("error")) return baseUrl;
      return url;
    },
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
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
