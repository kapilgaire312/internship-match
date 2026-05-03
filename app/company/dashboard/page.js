import getDashboardData from "@/lib/utils/company/getDashboardData";
import TopSection from "./components/TopSection";

export default async function Dashboard() {
  await getDashboardData();
  return (
    <div>
      <TopSection />
    </div>
  );
}
