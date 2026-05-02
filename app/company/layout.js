import CompanyNavbar from "@/components/layouts/CompanyNavbar";
import { auth } from "@/lib/auth";

export default async function CompanyLayout({ children }) {
  const session = await auth();
  const companyLoggedIn = session?.user?.role === "company";
  return (
    <main>
      {companyLoggedIn && <CompanyNavbar />}

      {children}
    </main>
  );
}
