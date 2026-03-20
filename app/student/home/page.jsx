import InternshipsBlock from "@/components/home/InternshipsBlock";
import SearchBlock from "@/components/home/SearchBlock";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  console.log("params", params);

  return (
    <div className="flex flex-col gap-10">
      <SearchBlock />
      <InternshipsBlock search={params?.search} />
    </div>
  );
}
