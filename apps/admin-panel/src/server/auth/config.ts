import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { prisma } from "@ekashuunyam/database";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

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
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Resend({
      from: "noreply@ekashunyam.tech",
    }),
  ],
  /*eslint-disable*/
  adapter: PrismaAdapter(prisma as any),
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
    redirect: async ({ url, baseUrl }) => {
      if (!url.includes("error")) return baseUrl;
      return url;
    },
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          isAdmin: token.isAdmin as boolean,
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
