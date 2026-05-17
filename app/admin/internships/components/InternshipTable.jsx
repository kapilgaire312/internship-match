import Link from "next/link";


export default function InternshipsTable({ internships }) {
  console.log("Internships in Table:", internships);
  return (
    <table className="w-full table-auto border-collapse text-left">
      <thead>
        <tr className="w-full border-b border-gray-300">
          <th className=" px-2 py-3 text-gray-500 font-medium">Title</th>
          <th className=" px-2 py-3 text-gray-500 font-medium">Company</th>
          <th className=" px-2 py-3 text-gray-500 font-medium text-center">Status</th>
          <th className=" px-2 py-3 text-gray-500 font-medium">Action</th>
        </tr>
      </thead>
      <tbody>
        {internships.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center align-middle py-8 text-gray-500" >
              No internships found.
            </td>
          </tr>
        ) :
          (internships.map((internship) => {
            const bgColor = internship.isClosed ? '#ebebeb' : '#BBF7D0';
            return (
              <tr key={internship._id} className=" border-b border-gray-300 ">
                <td className="px-3 py-6">
                  <Link href={`/admin/internships/${internship._id}`} className="flex items-center gap-1 text-blue-500 hover:underline cursor-pointer">
                    {internship.title}
                  </Link>

                </td>
                <td className=" px-3 py-6">
                  <Link href={`/admin/companies/${internship.company_id}`} className="flex items-center gap-1 text-blue-500 hover:underline cursor-pointer">
                    {internship.company_name}
                  </Link>
                </td>
                <td className={` px-3 py-6 flex justify-center items-center`}>
                  <p className={`text-sm font-medium w-24 text-center rounded-xl py-1`}
                    style={{ backgroundColor: bgColor }}
                  >
                    {internship.isClosed ? 'Closed' : 'Active'}
                  </p>

                </td>
                <td className="px-3 py-6">
                  <button className="text-blue-500 hover:text-blue-700">View</button>
                </td>

              </tr>
            )
          }))}
      </tbody>
    </table>
  );
}