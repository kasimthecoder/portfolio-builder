// api.client.ts
export async function clientFetch(path: string, init?: RequestInit) {
  // make sure path starts with / not //
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return fetch(`/api/proxy${normalizedPath}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}
