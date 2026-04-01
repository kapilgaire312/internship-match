import SearchBar from "@/components/SearchBar";
import { getInternshipsWithMatchScore } from "@/lib/utils/getInternshipsWithMatchScore";
import InternshipCardApplied from "./internshipCardApplied";
import getAppliedInternships from "@/lib/utils/getAppliedInternships";

export default async function AppliedPage() {
  const internships = await getInternshipsWithMatchScore();
  const appliedInternhsips = await getAppliedInternships();

  return (
    <div>
      <div className="flex flex-col items-center gap-5 mt-3">
        <div className="flex justify-left">
          <div className="w-[70vw]">
            <div className="ml-1">
              {" "}
              <p className="text-2xl font-semibold">Applied Internships</p>
              <p className="text-gray-600">
                Track the status of your Internships applications.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-[5vw] w-[70vw] mt-2">
          <div className="  flex justify-center">
            <div className="w-[70vw]">
              <SearchBar
                placeholder={"Search by role, skills, or sectors..."}
              />
            </div>
          </div>
        </div>
        <div className="flex  flex-col justify-center mt-8  gap-10">
          {" "}
          {appliedInternhsips?.map((internshipData, index) => {
            return (
              <InternshipCardApplied
                key={index}
                internshipData={internshipData}
              />
            );
          })}
          <div className=" flex flex-col gap-9  w-[65vw]"></div>
        </div>
      </div>
    </div>
  );
}
