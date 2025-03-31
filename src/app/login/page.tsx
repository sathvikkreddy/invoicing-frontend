import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

const Login = async () => {
  const session = await auth();

  // If user is already logged in, redirect to home
  if (session && session.user) {
    redirect("/");
  }

  // If not logged in, redirect to the NextAuth sign-in page with Google provider
  redirect("/api/auth/signin?callbackUrl=/");
};

export default Login;
