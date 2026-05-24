// app/actions/auth.ts
"use server";

import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

interface RegisterPayload {
  username: string;
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

interface ActionResult {
  error?: string;
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<ActionResult | void> {
  const { username, email, fullName, password, confirmPassword } = payload;

  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      fullName,
      password,
      confirmPassword,
    }),
  });

  if (!res.ok) {
    const data = await res.json();
    return { error: data?.message ?? "Registration failed. Try again." };
  }

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    return {
      error: "Account created but sign in failed. Please log in manually.",
    };
  }

  redirect("/");
}

export async function checkUsername(
  username: string,
): Promise<{ available: boolean } | { error: string }> {
  if (!username || username.length < 3) return { available: false };

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/v1/users/check-username?username=${username}`,
      { cache: "no-store" },
    );
    const json = await res.json();
    return { available: json.data.available };
  } catch {
    return { error: "Could not check username" };
  }
}

export async function getSession() {
  const session = await auth();
  if (!session) redirect("/login");
  return session;
}
