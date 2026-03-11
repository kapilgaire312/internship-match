import StudentNavbar from "@/components/layouts/StudentNavbar";

export default function StudentLayout({ children }) {
  return (
    <main>
      <StudentNavbar />

      {children}
    </main>
  );
}
