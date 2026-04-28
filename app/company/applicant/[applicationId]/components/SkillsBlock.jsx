import { mapSkills } from "@/utils/mapSkills";

export default function SkillsBlock({ title, skillsList }) {
  return (
    <div className=" bg-white rounded py-4 px-6 w-full">
      <div className="flex flex-col gap-3 items-start  h-fit">
        <div className="font-medium text-xl">{title}</div>
        <div className="flex gap-3 items-start flex-wrap">
          {skillsList?.length !== 0 ? skillsList.map(mapSkills) : "--"}
        </div>
      </div>
    </div>
  );
}
