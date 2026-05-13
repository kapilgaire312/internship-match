
import AdminSearchBar from "../students/components/AdminSearchBar";
import FilterBar from "./components/Filterbar";

export default async function CompaniesPage({ searchParams }) {
  let { filter, search } = await searchParams;
  const filterValues = ["all", "pending", "approved", "rejected", "blacklisted"]
  if (!filterValues.includes(filter?.toLowerCase())) {
    filter = "all"
  }

  return (
    <div className="p-4">
      <div className="flex justify-between"
      ><FilterBar filter={filter} search={search} />
        <AdminSearchBar placeholder="Search companies..." />
      </div>

    </div>
  );
}