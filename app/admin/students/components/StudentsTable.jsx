export default function StudentsTable({ students }) {
  console.log(students);
  return (
    <table className="w-full table-auto border-collapse text-left ">
      <thead className="text-gray-500 ">
        <tr>
          <th className="font-medium">Name</th>
          <th className="font-medium">Email</th>
          <th className="font-medium">Status</th>
          <th className="font-medium">Actions</th>
        </tr>
      </thead>
      <tbody className="font-normal text">
        {!students || students.length === 0 ? (
          <tr className="h-64 ">
            <td colSpan={4} className="text-center align-middle">
              No records available
            </td>
          </tr>
        ) : (
          <>
            {students.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.isBlocked ? "Blocked" : "Active"}</td>
                  <td>{student.name}</td>
                </tr>
              );
            })}
          </>
        )}
      </tbody>
    </table>
  );
}
