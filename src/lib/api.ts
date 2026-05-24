import { auth } from "@/auth";
import { headers } from "next/headers";

// ✅ Server Components, Route Handlers, Server Actions only
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

// ✅ Client Components only (useEffect, event handlers)
export async function clientFetch(path: string, init?: RequestInit) {
  return fetch(`/api/proxy${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}
