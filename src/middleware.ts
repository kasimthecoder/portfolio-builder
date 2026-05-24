// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

function getSubdomain(host: string): string {
  const hostname = host.split(":")[0];

  if (hostname.includes(".localhost")) {
    const parts = hostname.split(".");
    return parts[0];
  }

  const parts = hostname.split(".");

  if (parts.length >= 3) {
    const sub = parts[0];
    const result = sub === "www" ? "" : sub;
    return result;
  }

  return "";
}

export default auth((request) => {
  const host = request.headers.get("host") || "";
  const subdomain = getSubdomain(host);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-subdomain", subdomain);

  if (subdomain) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/preview/:path*",
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
