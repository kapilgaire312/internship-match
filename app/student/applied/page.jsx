import InternshipsCard from "@/components/home/InternshipsCard";
import SearchBar from "@/components/SearchBar";

export default function AppliedPage() {
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
                placeholder={"Search by role, company, or keyword..."}
              />
            </div>
          </div>
          <div>sort</div>
        </div>
        <div className="flex justify-center mt-8 ">
          {" "}
          <div className=" flex flex-col gap-9  w-[65vw]"></div>
        </div>
      </div>
    </div>
  );
}
