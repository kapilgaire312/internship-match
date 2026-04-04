import CompanyNavbar from "@/components/layouts/CompanyNavbar";

export default function CompanyLayout({ children }) {
  return (
    <main>
      <CompanyNavbar />

      {children}
    </main>
  );
}
