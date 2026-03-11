import InternshipsBlock from "@/components/home/InternshipsBlock";
import SearchBlock from "@/components/home/SearchBlock";

export default function Internships() {
  return (
    <div className="flex flex-col gap-10">
      <SearchBlock />
      <InternshipsBlock />
    </div>
  );
}
