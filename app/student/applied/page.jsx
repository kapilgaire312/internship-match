import SearchBar from "@/components/SearchBar";
import InternshipCardApplied from "./internshipCardApplied";
import getAppliedInternships from "@/lib/utils/getAppliedInternships";

export default async function AppliedPage() {
  const appliedInternhsips = await getAppliedInternships();

  let error = false;

  if (appliedInternhsips.error) error = true;

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
          {!error && (
            <div className="  flex justify-center">
              <div className="w-[70vw]">
                <SearchBar
                  placeholder={"Search by role, skills, or sectors..."}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex  flex-col justify-center mt-8  gap-10">
          {" "}
          {error ||
            (appliedInternhsips.length === 0 && (
              <div className="flex justify-center items-center w-[65vw] h-[40vh] bg-white rounded-xl text-xl font-medium text-gray-500">
                {error
                  ? appliedInternhsips.error
                  : "You have'nt applied to any internships yet."}
              </div>
            ))}
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
