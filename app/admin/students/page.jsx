import StudentsTable from "./components/StudentsTable";
import AdminSearchBar from "./components/AdminSearchBar";
import getStudents from "@/lib/utils/admin/getStudents";
export default async function StudentsPage({ searchParams }) {
  const { search } = await searchParams;
  const students = await getStudents(search);
  console.log(students);

  return (
    <div className="bg-white p-4 rounded flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium">All Students</h2>
          <p className="text-gray-500 text-sm">
            Manage student accounts across the platform.
          </p>
        </div>
        <div className="w-84"> <AdminSearchBar
          placeholder="Search students by name or email..."
          search={search}
        /></div>

      </div>
      <div>
        <StudentsTable students={students} />
      </div>
    </div>
  );
}
