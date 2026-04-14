import Filter from "@/components/Filter";
import BackButton from "@/components/home/BackButton";
import InternshipsCard from "@/components/home/InternshipsCard";
import SearchBar from "@/components/SearchBar";
import { getInternshipsWithMatchScore } from "@/lib/utils/getInternshipsWithMatchScore.js";

export default async function MatchesPage({ searchParams }) {
  const params = await searchParams;
  const search = params.search;
  const filter = params.filter;
  let error = false;

  const internships = await getInternshipsWithMatchScore(search, filter);

  if (internships.error) error = true;

  return (
    <div>
      <div className="flex flex-col items-center gap-5 mt-3">
        <div className="flex flex-col items-start ml-[13vw] gap-5">
          <div className="flex justify-left">
            <div className="w-[82vw]">
              <div className="ml-1">
                {" "}
                <p className="text-2xl font-semibold"> Matched Internships</p>
                <p className="text-gray-600">
                  Recommended Internships based on your sectors and skills.
                </p>
              </div>
            </div>
          </div>
          {!error && (
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
          )}
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
            {error || internships.length === 0 ? (
              <div className="flex justify-center items-center w-[65vw] h-[40vh] bg-white rounded-xl text-xl font-medium text-gray-500">
                {error
                  ? internships.message
                  : "No internhsips matching your skills and sectors found."}
              </div>
            ) : (
              internships?.map((internshipInfo, index) => {
                return (
                  <InternshipsCard
                    key={index}
                    internshipInfo={internshipInfo}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
