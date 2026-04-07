export const runtime = "nodejs";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createOrGetWordPressUser } from "@/app/lib/wordpress";

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
          console.error('No email provided from Google');
          return false;
        }

        try {
          console.log("Calling createOrGetWordPressUser with:", userEmail, user.name);
          const wpUser = await createOrGetWordPressUser(
            userEmail,
            user.name || profile?.name || 'Google User'
          );

          console.log("WordPress user result:", wpUser);

          if (!wpUser) {
            console.error('Failed to create/get WordPress user - wpUser is null');
            return false;
          }

          user.wordpressId = wpUser.id;
          user.wordpressName = wpUser.name;

          console.log("Google sign in successful, wpUserId:", wpUser.id);
          return true;
        } catch (error) {
          console.error('Error syncing with WordPress:', error);
          return false;
        }
      }

      console.log("Non-Google sign in, allowing");
      return true;
    },

    async jwt({ token, user, account, profile }) {
      console.log("JWT - account:", account?.provider);
      console.log("JWT - user exists:", !!user);

      // Only set these on initial sign in (when user object exists)
      if (user) {
        // For WordPress login
        if (account?.provider === "credentials") {
          token.email = user.user_email ?? undefined;
          token.accessToken = user.token;
          token.name = user.user_display_name;
          token.role = user.role;
          token.provider = account?.provider;
        }

        // For Google login
        if (account?.provider === "google") {
          token.provider = 'google';
          token.name = (user.wordpressName || user.name) ?? undefined;

          token.email = user.email ?? undefined;
          token.role = 'subscriber';
          token.wordpressId = user.wordpressId;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        // Handle potential undefined values
        session.user.email = token.email ?? null;
        session.user.name = token.name ?? null;
        session.user.provider = token.provider as string;
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