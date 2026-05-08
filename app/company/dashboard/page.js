import getDashboardData from "@/lib/utils/company/getDashboardData";
import TopSection from "./components/TopSection";
import MostAppliedGraphSection from "./components/MostAppliedGraphSection";

export default async function Dashboard({ searchParams }) {
  const { filter } = await searchParams;
  const dashboardData = await getDashboardData(filter);
  console.log(dashboardData);
  return (
    <div className="px-10 py-4 flex flex-col gap-8">
      <TopSection dashboardData={dashboardData} filter={filter} />
      <MostAppliedGraphSection internshipData={dashboardData.internshipData} />
    </div>
  );
}
