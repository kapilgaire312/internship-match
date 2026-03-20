import SearchBar from "../SearchBar";

export default function SearchBlock() {
  return (
    <div className="flex justify-center mt-5 select-none">
      <div className="flex flex-col w-[50vw] text-center gap-6">
        <div className="text-3xl font-semibold">
          Find internships that fit your path
        </div>
        <SearchBar
          placeholder={"Search internships across roles,skills and sectors"}
        />

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
