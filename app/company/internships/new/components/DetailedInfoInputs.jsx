export default function DetailedInfoInputs({ inputInfo, changeHandler }) {
  const { title, name, placeholder, height } = inputInfo;
  const { rawData, handleOnChange, error } = changeHandler;
  return (
    <div className="flex flex-col gap-1 ">
      <div className="text-[1.1rem] font-semibold">{title}</div>
      <textarea
        className={`border py-1.5 px-2 rounded text-md h-[${height}]  ${error.get(name) && "border-red-400 focus:outline-none"}`}
        placeholder={placeholder}
        name={name}
        defaultValue={rawData?.[name]}
        onChange={(e) => {
          handleOnChange(e, name);
        }}
      />{" "}
      <span className="text-sm text-red-400">{error.get(name)}</span>
    </div>
  );
}
