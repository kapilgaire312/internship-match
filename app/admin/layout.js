import AdminNavbar from "@/components/layouts/AdminNavbar";
import { auth } from "@/lib/auth";

export default async function CompanyLayout({ children }) {
  const session = await auth();
  const adminLoggedIn = session?.user?.role === "admin";
  return (
    <div className="flex">
      {" "}
      {adminLoggedIn && <AdminNavbar />}
      <main className="ml-72 flex-1 p-6">{children}</main>
    </div>
  );
}
