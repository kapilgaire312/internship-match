import getDashboardData from "@/lib/utils/company/getDashboardData";
import TopSection from "./components/TopSection";

export default async function Dashboard({ searchParams }) {
  const { filter } = await searchParams;
  const dashboardData = await getDashboardData(filter);
  console.log(dashboardData);
  return (
    <div className="px-10 py-4">
      <TopSection dashboardData={dashboardData} filter={filter} />
    </div>
  );
}
