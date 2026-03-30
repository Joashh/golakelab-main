export const runtime = "nodejs";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "WordPress",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("CREDENTIALS:", credentials);

        const res = await fetch(
  `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/jwt-auth/v1/token`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: credentials?.username,
      password: credentials?.password,
    }),
  }
);
        const data = await res.json();

        console.log("WP RESPONSE:", data);

        if (res.ok && data.token) {
          return data;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.user_email ?? undefined;
        token.accessToken = user.token;
        token.name = user.user_display_name;
      }
      return token;
    },

    async session({ session, token }) {
       if (session.user) {
      session.user.email = token.email as string;
      session.user.name = token.name as string;
    }
       session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };