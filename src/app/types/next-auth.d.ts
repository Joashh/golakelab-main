import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
       role?: string;
      name?: string | null;
      email?: string | null;
       provider?: string;
    };
  }

  interface User {
     role?: string;
    token?: string;
    user_display_name?: string;
    user_email?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
     role?: string;
    accessToken?: string;
    name?: string;
    email?: string;
    provider?: string;
  }
}

