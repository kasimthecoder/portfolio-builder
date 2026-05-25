// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

import "next-auth";
import "next-auth/jwt";

interface User {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

declare module "next-auth" {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number | null;
  }

  interface Session {
    accessToken: string;
    refreshToken: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number | null;
    error?: string;
  }
}
