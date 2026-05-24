// lib/api.server.ts  ← server only
import { auth } from "@/auth";

export async function backendFetch(path: string, init?: RequestInit) {
  const session = await auth();
  if (!session) throw new Error("Unauthenticated");

  return fetch(`${process.env.BACKEND_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
      ...init?.headers,
    },
  });
}
