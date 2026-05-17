import getInternships from "@/lib/utils/admin/getInternships";
import AdminSearchBar from "../students/components/AdminSearchBar";
import InternshipsTable from "./components/InternshipTable";

export default async function InternshipsPage({ searchParams }) {
  const { search } = await searchParams;
  const internships = await getInternships(search);
  console.log(internships)
  return (<div className="bg-white p-4 rounded flex flex-col gap-8">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-medium">All Internships</h2>
        <p className="text-gray-500 text-sm">
          Manage internship listings across the platform.
        </p>
      </div>
      <AdminSearchBar
        placeholder="Search internships by title or company..."
        search={search}
      />
    </div>
    <div>
      <InternshipsTable internships={internships} />

    </div>
  </div>
  )
} 