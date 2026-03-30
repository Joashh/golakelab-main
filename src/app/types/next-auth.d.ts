import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    token?: string;
    user_display_name?: string;
    user_email?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    name?: string;
    email?: string;
  }
}