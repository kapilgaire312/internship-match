import { filterInternshipsBySector } from "@/lib/utils/filterInternshipsBySector";
import InternshipsCard from "./InternshipsCard";

export default async function InternshipsBlock() {
  const internshipsBySector = await filterInternshipsBySector([
    "Data",
    "Frontend",
    "DevOps",
  ]);

  return (
    <div className="flex justify-center">
      {" "}
      <div className="w-[80vw] bg-white p-6  rounded shadow-md">
        <div>
          <div className="text-2xl font-medium">Suggested Internships</div>
          <div>
            <p className="text-gray-500 ml-3">
              Opportunities that match your sectors in your profile.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-6">
          {internshipsBySector?.map((item) => {
            return <InternshipsCard key={item._id} internshipInfo={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
