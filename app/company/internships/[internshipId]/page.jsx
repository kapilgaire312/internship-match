import Back from "@/components/company/Back";
import ApplicationSection from "./components/ApplicantsSection";
import FilterSection from "./components/FilterSection";
import getApplicants from "@/lib/utils/company/getApplicants";
import CloseInternshipSection from "./components/CloseInternshipSection";

export default async function InternshipApplicants({ params, searchParams }) {
  const { internshipId } = await params;
  const { sortBy, status } = await searchParams;
  console.log(sortBy, status);
  const { applicantsList, internshipTitle, isClosed } = await getApplicants(
    internshipId,
    sortBy,
    status,
  );
  return (
    <div className="felx justify-center px-10 py-4">
      <div className="flex flex-col gap-5">
        {" "}
        <div>
          <Back message={"Back to internships"} />{" "}
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-3xl font-semibold">
            {" "}
            Applicants for {internshipTitle}{" "}
          </p>
          {isClosed && (
            <span className=" px-2 rounded-xl py-1 text-md font-medium bg-gray-300">
              Closed
            </span>
          )}
        </div>
        <div className="flex justify-end">Retrive shortlisted email</div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-6">
            {applicantsList.map((item, index) => {
              return <ApplicationSection key={index} applicantInfo={item} />;
            })}{" "}
          </div>
          <div className="w-full flex flex-col gap-4">
            <FilterSection search={{ sortBy, status }} />
            {!isClosed && (
              <CloseInternshipSection internshipId={internshipId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
