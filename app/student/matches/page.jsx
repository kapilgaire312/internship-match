import Filter from "@/components/Filter";
import BackButton from "@/components/home/BackButton";
import InternshipsCard from "@/components/home/InternshipsCard";
import SearchBar from "@/components/SearchBar";
import { getInternshipsWithMatchScore } from "@/lib/utils/getInternshipsWithMatchScore.js";

export default async function MatchesPage({ searchParams }) {
  const params = await searchParams;
  const search = params.search;
  const filter = params.filter;

  const internships = await getInternshipsWithMatchScore(search, filter);
  console.log(internships);
  return (
    <div>
      <div className="flex flex-col items-center gap-5 mt-3">
        <div className="flex flex-col items-start ml-[13vw] gap-5">
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
          <div className="flex mt-2 gap-3">
            <div className=" ">
              <div className="w-[67vw] ">
                <SearchBar
                  placeholder={"Search by role, skills, or sectors..."}
                />
              </div>
            </div>
            <div className="flex items-center">
              {" "}
              <Filter />{" "}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2  items-center  ">
          <div className="flex justify-start w-full">
            {search && (
              <div className="flex gap-3">
                <BackButton />
                <div className="text-xl font-medium">
                  Showing results for &quot;{search}&quot;
                </div>
              </div>
            )}
          </div>{" "}
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
