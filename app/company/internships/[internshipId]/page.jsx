import Back from "@/components/company/Back";
import ApplicationSection from "./components/ApplicantsSection";
import FilterSection from "./components/FilterSection";
import getApplicants from "@/lib/utils/company/getApplicants";

export default async function InternshipApplicants({ params, searchParams }) {
  const { internshipId } = await params;
  const { sortBy, status } = await searchParams;
  console.log(sortBy, status);
  const applicants = await getApplicants(internshipId, sortBy, status);
  return (
    <div className="felx justify-center px-10 py-4">
      <div className="flex flex-col gap-5">
        {" "}
        <div>
          <Back message={"Back to internships"} />{" "}
        </div>
        <div className="text-3xl font-semibold">
          Applicants for this Internship
        </div>
        <div className="flex justify-end">Retrive shortlisted email</div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-6">
            {applicants.map((item, index) => {
              return <ApplicationSection key={index} applicantInfo={item} />;
            })}{" "}
          </div>
          <FilterSection search={{ sortBy, status }} />
        </div>
      </div>
    </div>
  );
}
