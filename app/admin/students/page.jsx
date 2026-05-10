import Image from "next/image";
import StudentsTable from "./components/StudentsTable";
import getStudents from "@/lib/utils/admin/getStudents";
export default async function StudentsPage({ searchParams }) {
  const { search } = await searchParams;
  const students = await getStudents(search);
  console.log(students);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-xl font-semibold border-b pb-4">
        Student Management
      </div>
      <div className="bg-white p-4 rounded flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-medium">All Students</h2>
            <p className="text-gray-500 text-sm">
              Manage student accounts across the platform.
            </p>
          </div>
          <div className="border bg-gray-200 h-8 rounded flex items-center gap-1 px-2 w-84">
            <div className="relative h-6 w-6">
              <Image src="/search-icon.svg" fill alt="search" />
            </div>
            <input
              className="w-full focus:outline-none focus:ring-0 px-1 py-1 "
              placeholder="Search students by name or email..."
            />
          </div>
        </div>
        <div>
          <StudentsTable students={students} />
        </div>
      </div>
    </div>
  );
}
