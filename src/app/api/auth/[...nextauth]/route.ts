// app/api/auth/[...nextauth]/route.ts

export const runtime = "nodejs";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "WordPress",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        const ratelimit = new Ratelimit({
          redis: Redis.fromEnv(),
          limiter: Ratelimit.slidingWindow(5, "60 s"),
        });

        try {
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
            return {
              id: data.user_id?.toString(),
              email: data.user_email,
              name: data.user_display_name,
              token: data.token,
              role: data.user_role,
              wordpressId: data.user_id,
            };
          }

          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("=== SIGNIN CALLBACK START ===");
      console.log("Provider:", account?.provider);
      console.log("User email:", user.email);
      console.log("User name:", user.name);

      if (account?.provider === 'google') {
        const userEmail = user.email;

        if (!userEmail) {
          throw new Error("No email from Google account");
        }

        try {
          // ✅ Single call to WordPress - this creates/get user AND returns token
          const tokenRes = await fetch(
            `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/custom/v1/google-login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.WP_API_SECRET!,
              },
              body: JSON.stringify({
                email: userEmail,
                name: user.name || profile?.name || 'Google User'
              }),
            }
          );

          console.log("WP RESPONSE STATUS:", tokenRes.status);

          const tokenData = await tokenRes.json();
          console.log("WP RESPONSE DATA:", tokenData);

          if (!tokenRes.ok) {
            console.error("Failed to get WP token:", tokenData);

            throw new Error(
              tokenData?.message || "WordPress authentication failed"
            );
          }

          if (!tokenData.token) {
            console.error("No token in response");

            throw new Error("No token returned from WordPress");
          }

          // ✅ Attach all WordPress data to user object
          user.wordpressId = tokenData.id;
          user.wordpressName = tokenData.name;
          user.accessToken = tokenData.token;
          user.id = tokenData.id.toString();
          user.role = tokenData.role || 'subscriber';

          console.log("Google sign in successful! WordPress ID:", tokenData.id);
          return true;

        } catch (error: any) {
          console.error('Error syncing with WordPress:', error);
          throw new Error(error.message || "Google login failed");
        }
      }

      console.log("Non-Google sign in, allowing");
      return true;
    },

    async jwt({ token, user, account }) {
      console.log("JWT - Trigger:", user ? "LOGIN" : "SESSION");
      console.log("JWT - Provider:", token.provider);
      console.log("JWT - Has user:", !!user);

      if (user) {
        // For WordPress login (credentials)
        if (account?.provider === "credentials") {
          token.email = user.email ?? undefined;
          token.accessToken = user.token;
          token.name = user.name ?? undefined;
          token.role = user.role;
          token.provider = account.provider;
          token.wordpressId = user.wordpressId || (user.id ? parseInt(user.id) : undefined);
          if (token.wordpressId) {
            token.sub = token.wordpressId.toString();
          }
        }

        // For Google login
        if (account?.provider === "google") {
          token.provider = 'google';
          token.name = (user.wordpressName || user.name) ?? undefined;
          token.accessToken = user.accessToken;
          token.email = user.email ?? undefined;
          token.role = user.role || 'subscriber';
          token.wordpressId = user.wordpressId;
          if (user.wordpressId) {
            token.sub = user.wordpressId.toString();
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      console.log("SESSION - Building session");
      console.log("SESSION - Token has wordpressId:", token.wordpressId);

      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.provider = token.provider as string;
        session.user.role = token.role as string;
        session.user.wordpressId = token.wordpressId as number;
        session.user.id = token.sub as string;
      }

      session.accessToken = token.accessToken as string;

      return session;
    },
  },

  pages: {
    signIn: "/",
    error: "/auth/error",
  },



  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };