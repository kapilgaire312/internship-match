import InternshipsBlock from "@/components/home/InternshipsBlock";
import SearchBlock from "@/components/home/SearchBlock";

export default async function Home({ searchParams }) {
  const params = await searchParams;

  return (
    <div className="flex flex-col gap-10">
      <SearchBlock />
      <InternshipsBlock search={params?.search} />
    </div>
  );
}
