
import getCompanies from "@/lib/utils/admin/getCompanies";
import AdminSearchBar from "../students/components/AdminSearchBar";
import CompanyTable from "./components/CompanyTable";
import FilterBar from "./components/Filterbar";

export default async function CompaniesPage({ searchParams }) {
  let { filter, search } = await searchParams;
  const filterValues = ["all", "pending", "approved", "rejected", "blacklisted"]
  if (!filterValues.includes(filter?.toLowerCase())) {
    filter = "all"
  }
  const comapanyList = await getCompanies(filter, search);

  return (
    <div className="p-4 flex gap-8 flex-col">
      <div className="flex justify-between" >
        <FilterBar filter={filter} search={search} />
        <div className="w-84"> <AdminSearchBar placeholder="Search companies..." /></div>

      </div>
      <CompanyTable companyList={comapanyList} />

    </div>
  );
}