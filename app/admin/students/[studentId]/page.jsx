import Back from "@/components/company/Back";
import getStudentDetails from "@/lib/utils/admin/getStudentDetails";
import ResponseSection from "../components/ResponseSection";
import StudentCard from "./components/StudentCard";
import ItemsBlock from "./components/ItemsBlock";
import ResumeSection from "./components/ResumeSection";

export default async function StudentPage({ params }) {
  const { studentId } = await params;
  const studentDetails = await getStudentDetails(studentId);
  console.log("Student Details:", studentDetails);

  if (studentDetails.error) {
    return (
      <div>
        <Back message="Back to All Students" path="/admin/students" />
        <div className="text-red-500 text-center mt-10">{studentDetails.error}</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <Back message="Back to All Students" path="/admin/students" />
      <div className="flex flex-col gap-10">
        <div className="flex justify-between ">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">{studentDetails.name}</h1>
            <div className="flex gap-2 items-center">
              <p className="font-medium">Student</p>
              <p className={`${studentDetails.isBlocked ? 'bg-gray-300' : 'bg-[#d1fae5]'} px-2 py-1 rounded-2xl text-sm font-medium`}>
                {studentDetails.isBlocked ? "Blocked Account" : "Active Account"}
              </p>
            </div>

          </div>
          <ResponseSection
            studentId={studentDetails.student_id}
            studentName={studentDetails.name}
            isBlocked={studentDetails.isBlocked}
            disableView={true}
          />

        </div>
        <div className="flex gap-6 w-full ">
          <div className=" flex-none" style={{ width: "22vw", minWidth: "22vw" }}><StudentCard studentDetails={studentDetails} /></div>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex gap-6 justify-between">
              <ItemsBlock title="Sectors" items={studentDetails.sectors} />
              <ItemsBlock title="Skills" items={studentDetails.skills} />
            </div>
            <ResumeSection resumeDetails={studentDetails.resumeDetails} />


          </div>
        </div>
      </div>
    </div>
  );
}