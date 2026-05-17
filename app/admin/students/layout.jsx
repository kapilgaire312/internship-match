export default function StudentPageLayout({ children }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-xl font-semibold border-b pb-4">
        Student Management
      </div>
      {children}
    </div>
  );
}
