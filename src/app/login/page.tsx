import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginClient from "../component/loginClient";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/"); // prevents logged-in users from seeing login
  }

  return null;
}