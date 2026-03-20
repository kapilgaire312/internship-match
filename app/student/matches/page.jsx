import InternshipsCard from "@/components/home/InternshipsCard";
import SearchBar from "@/components/SearchBar";
import { getInternshipsWithMatchScore } from "@/lib/utils/getInternshipsWithMatchScore.js";

export default async function MatchesPage() {
  const sectors = ["Backend", "Frontend", "Software"];
  const userSkills = [
    "node.js",
    "mongodb",
    "express",
    "react",
    "git",
    "python",
    "javascript",
  ];
  const internships = await getInternshipsWithMatchScore(sectors, userSkills);
  console.log(internships);
  return (
    <div>
      <div className="flex flex-col items-center gap-5 mt-3">
        <div className="flex justify-left">
          <div className="w-[70vw]">
            <div className="ml-1">
              {" "}
              <p className="text-2xl font-semibold"> Matched Internships</p>
              <p className="text-gray-600">
                Recommended Internships based on your sectors and skills.
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
          <div>sort</div>
        </div>
        <div className="flex justify-center mt-8 ">
          {" "}
          <div className=" flex flex-col gap-9  w-[65vw]">
            {internships?.map((internshipInfo, index) => {
              return (
                <InternshipsCard key={index} internshipInfo={internshipInfo} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
