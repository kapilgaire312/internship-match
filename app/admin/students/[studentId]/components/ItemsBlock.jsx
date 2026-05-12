import { mapSkills } from "@/utils/mapSkills";

export default function ItemsBlock({ title, items }) {
  return (
    <div className="flex flex-col bg-white p-5 rounded-lg  shadow-sm gap-4 w-full
    ">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {items.length === 0 ? (
          <p className="text-gray-500">No {title.toLowerCase()} added</p>
        ) : (
          items.map(mapSkills)
        )}
      </div>
    </div>
  );
}