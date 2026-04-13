import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function SummaryInfoSelects({ selectInfo, error }) {
  const { title, name, values } = selectInfo;
  console.log(selectInfo);
  return (
    <div className="w-full">
      <div className="flex flex-col  gap-1 ">
        <div className="text-[1.1rem] font-semibold">{title}</div>
        <>
          <div className="border py-1.5 px- rounded text-md">
            {" "}
            <Select defaultValue={values[0]} name={name}>
              <SelectTrigger className="w-full py-1.5 px-2 rounded text-md border-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {values?.map((item, index) => {
                  return (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>{" "}
          <span className="text-sm text-red-400">{error.get(name)}</span>
        </>
      </div>
    </div>
  );
}
