import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const res = await fetch(
          `${process.env.BACKEND_URL}/api/v1/users/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          },
        );

        if (!res.ok) return null;

        const json = await res.json();

        const { data } = json;

        return {
          id: String(data.user._id),
          email: data.user.email,
          name: data.user.fullName,
          emailVerified: false,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // Credentials login — same as before
      if (user && account?.provider === "credentials") {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      // Google login — hit your Express backend to get your own JWT pair
      if (account?.provider === "google") {
        const res = await fetch(
          `${process.env.BACKEND_URL}/api/v1/users/google/callback-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              googleId: account.providerAccountId,
              email: user.email,
              fullName: user.name,
            }),
          },
        );

        if (res.ok) {
          const json = await res.json();
          token.id = json.data.user._id;
          token.accessToken = json.data.accessToken;
          token.refreshToken = json.data.refreshToken;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },
});
