export default function CompaniesPageLayout({ children }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-xl font-semibold border-b pb-4">
        Company Management
      </div>
      {children}
    </div>
  );
}
