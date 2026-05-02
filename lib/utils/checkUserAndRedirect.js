import { redirect } from "next/navigation";
import { auth } from "../auth";

export default async function checkUserAndRedirect() {
  const session = await auth();

  const role = session?.user?.role;

  if (role === "student") redirect("/student/home");
  else if (role === "company") redirect("/company/dashboard");
}
