// middleware.ts

import { auth } from "@/auth";
import { NextResponse } from "next/server";

function getSubdomain(host: string): string {
  const hostname = host.split(":")[0];

  if (hostname.includes(".localhost")) {
    return hostname.split(".")[0];
  }

  if (hostname === "localhost") {
    return "";
  }

  const rootDomain = process.env.ROOT_DOMAIN || "";

  if (hostname === rootDomain || hostname === `www.${rootDomain}`) {
    return "";
  }

  if (hostname.endsWith(rootDomain)) {
    return hostname.replace(`.${rootDomain}`, "");
  }

  return "";
}

export default auth((request) => {
  const host = request.headers.get("host") || "";

  const subdomain = getSubdomain(host);

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-subdomain", subdomain);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
