import InternshipPage from "@/app/student/internships/[internshipId]/page";
import Back from "@/components/company/Back";

import DeleteInternshipButton from "../components/DeleteInternshipButton";

export default async function InternshipDetailsPage({ params }) {
  const { internshipId } = await params;
  console.log(internshipId)
  return (
    <div className=" flex flex-col gap-6 ">

      <div className="flex justify-between pr-8 items-center bg-white px-2 py-6 rounded-lg w-full">
        <div className="text-xl font-semibold flex gap-2 items-center">
          <Back path="/admin/internships" />
          Review Internship
        </div>
        <div>
          <DeleteInternshipButton internshipId={internshipId} />
        </div>

      </div>
      <InternshipPage params={{ internshipId, isAdmin: true }} />
    </div>
  )
}