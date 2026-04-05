import Link from "next/link";

export default function Internships() {
  return (
    <div className="felx justify-center px-10 py-4">
      <div className="flex flex-col gap-5">
        {" "}
        <div className="flex justify-start">
          <div className="text-2xl font-semibold">Manage Internships</div>
        </div>
        <div>
          <div className="flex items-center justify-between bg-white py-6 px-6 rounded ">
            <div className="text-xl font-semibold">Post New Internhsip</div>
            <div>
              <Link href="internships/new">
                {" "}
                <button className="bg-[#2762ea] text-white py-2 px-8 rounded hover:opacity-80 active:opacity-60   cursor-pointer">
                  Post Internship
                </button>
              </Link>
            </div>
          </div>{" "}
        </div>
        <div>
          <div className="flex items-center justify-between bg-white py-6 px-6 rounded ">
            <div className="font-medium text-xl">Released Internships</div>
            <div className="flex flex-col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
