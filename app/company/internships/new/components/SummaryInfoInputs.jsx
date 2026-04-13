export default function SummaryInfoInputs({ inputInfo, errorInfo }) {
  const { title, name, placeholder } = inputInfo;
  const { error, onChangeHandler, rawData } = errorInfo;
  return (
    <>
      {" "}
      <div className="w-full">
        <div className="flex flex-col gap-1 ">
          <div className="text-[1.1rem] font-semibold">{title}</div>
          <input
            className={`border py-1.5 px-2 rounded text-md  ${error.get(name) && "border-red-400 focus:outline-none"}`}
            placeholder={placeholder}
            name={name}
            defaultValue={rawData?.[name]}
            onChange={(e) => {
              onChangeHandler(e, name);
            }}
          />
          <span className="text-sm text-red-400">{error.get(name)}</span>
        </div>
      </div>
    </>
  );
}
