import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import HomePage from "./student/home/page";

export default async function Home() {
  const session = await auth();
  // if (!session) redirect("/login");

  const role = session?.user?.role;

  if (role === "student") redirect("/student/home");
  if (role === "company") redirect("/company/dashboard");
  return (
    <div>
      <HomePage />
    </div>
  );
}
