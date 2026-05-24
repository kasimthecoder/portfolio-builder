// app/api/proxy/[...path]/route.ts
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const session = await auth();

  // strip /api/proxy from the path
  const path = req.nextUrl.pathname.replace("/api/proxy", "");
  const url = `${process.env.BACKEND_URL}${path}${req.nextUrl.search}`;

  const backendRes = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      ...(session?.accessToken && {
        Authorization: `Bearer ${session.accessToken}`,
      }),
    },
    body: req.method !== "GET" ? await req.text() : undefined,
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
