import Image from "next/image";

export default function RoleInfoCard({ data }) {
  return (
    <div className="bg-white py-4 px-4 flex flex-col gap-3 shadow-sm rounded-xl w-84">
      <div className="flex justify-between">
        <p className="font-medium text-xl">{data.title}</p>
        <p className="relative h-7 w-7  ">
          {" "}
          <Image
            src={data.logo}
            fill
            alt="icon"
            className="bg-gray-50 p-1 rounded"
          />
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">{data.value}</p>
        <p className="text-gray-500 text-sm"> {data.message}</p>
      </div>
    </div>
  );
}
