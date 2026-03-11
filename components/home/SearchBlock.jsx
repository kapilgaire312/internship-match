export default function SearchBlock() {
  return (
    <div className="flex justify-center mt-5 select-none">
      <div className="flex flex-col w-[50vw] text-center gap-6">
        <div className="text-3xl font-semibold">
          Find internships that fit your path
        </div>
        <div>
          {" "}
          <div className="shadow-xs rounded-2xl bg-white">
            {" "}
            <form className="flex justify-between gap-4 px-2 py-1">
              {" "}
              <input
                className="w-full focus:outline-none focus:ring-0"
                placeholder="Search internships across roles,skills and sectors"
              />
              <button
                type="submit"
                className="bg-[#2762ea] text-white py-2 px-6 rounded-2xl"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="px-8 text-gray-600">
          <p>
            InternKaji helps students discover relevant internship opportunities
            faster. Search open roles from companies, explore curated
            recommendations, and focus on opportunities that align with your
            profile.
          </p>
        </div>
      </div>
    </div>
  );
}
