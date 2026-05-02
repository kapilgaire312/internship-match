import StudentNavbar from "@/components/layouts/StudentNavbar";
import { auth } from "@/lib/auth";

export default async function StudentLayout({ children }) {
  const session = await auth();
  const studentLoggedIn = session?.user?.role === "student";
  return (
    <main>
      {studentLoggedIn && <StudentNavbar />}

      {children}
    </main>
  );
}
