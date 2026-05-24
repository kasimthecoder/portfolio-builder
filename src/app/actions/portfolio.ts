"use server";

import { auth } from "@/auth";
import { Section } from "@/types/types";
import { redirect } from "next/navigation";

export async function createPortfolio(
  prevState: { error: string } | null,
  formData: FormData,
) {
  const session = await auth();
  if (!session) redirect("/login");

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/portfolio/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        portfolioName: formData.get("portfolioName"),
        portfolioDomain: formData.get("portfolioDomain"),
      }),
    },
  );

  if (!res.ok) {
    const data = await res.json();
    return { error: data?.errors ?? "Failed to create portfolio. Try again." };
  }

  redirect("/builder");
}

export async function getPortfolio() {
  const session = await auth();
  if (!session) redirect("/login");

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/portfolio/portfolio`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    },
  );

  if (!res.ok) return { error: "Failed to fetch portfolio" };

  const data = await res.json();
  return data;
}

export async function savePortfolio({ sections }: { sections: Section[] }) {
  const session = await auth();
  if (!session) redirect("/login");

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/portfolio/update-sections`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({ sections }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    return { error: data?.message ?? "Failed to save portfolio. Try again." };
  }

  return { success: true, data };
}

export async function checkDomain(
  domain: string,
): Promise<{ available: boolean } | { error: string }> {
  if (!domain || domain.length < 3) return { available: false };

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/v1/portfolio/check-domain?domain=${domain}`,
      { cache: "no-store" },
    );
    const json = await res.json();
    return { available: json.data.available };
  } catch {
    return { error: "Could not check domain" };
  }
}

export async function updatePortfolio({
  portfolioName,
  portfolioDomain,
}: {
  portfolioName: string;
  portfolioDomain: string;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/portfolio/update`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        portfolioName,
        portfolioDomain,
      }),
    },
  );

  if (!res.ok) {
    const data = await res.json();
    return {
      error: data?.errors ?? "Failed to update portfolio. Try again.",
      status: false,
    };
  }

  return { status: true, message: "Portfolio updated sucesfuly" };
}
export async function deletePortfolio() {
  const session = await auth();
  if (!session) redirect("/login");

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/portfolio/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    },
  );

  if (!res.ok) {
    const data = await res.json();
    return {
      error: data?.errors ?? "Failed to update portfolio. Try again.",
      status: false,
    };
  }

  return redirect("/");
}
