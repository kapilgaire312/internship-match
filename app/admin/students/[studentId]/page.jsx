export default async function StudentPage({ params }) {
  const { studentId } = await params;
  return (
    <div>
      <h1>Student ID: {studentId}</h1>
    </div>
  );
}