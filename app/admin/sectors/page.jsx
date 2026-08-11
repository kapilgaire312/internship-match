import getAllSectors from "@/lib/utils/getAllSectors";
import AddNewSectorSection from "./components/AddNewSectorSection";
import AllSectorsTable from "./components/AllSectorsTable";

export default async function SectorsPage() {
  const sectors = await getAllSectors();
  return (
    <div className="p-4 flex gap-8 flex-col">
      <AddNewSectorSection />
      <AllSectorsTable sectors={sectors} />
    </div>
  );
}

