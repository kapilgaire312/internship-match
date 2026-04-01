import Image from "next/image";

export default function InternshipInfoSections({ item, index }) {
  return (
    <div className="flex items-center gap-3">
      <div className="  bg-[#f5f6fc] h-10 flex items-center justify-center rounded w-10">
        {" "}
        <div className="h-5 w-6 relative">
          <Image src={item.iconSrc} alt={`${item.name}-icon`} fill />
        </div>
      </div>
      <div className="flex flex-col text-[0.9rem]">
        <div className="text-gray-600 font-medium">{item.name}</div>
        <div
          className={`${item.bgColour && "rounded-xl px-2.5 py-1"} font-semibold`}
          style={{ backgroundColor: item.bgColour }}
        >
          {item.value}{" "}
        </div>
      </div>
    </div>
  );
}
