"use server";

import { auth } from "@/server/auth";

export async function getUserSession() {
  const session = await auth();
  return session;
}
