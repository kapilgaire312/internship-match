import DeleteSectorButton from "./DeleteSectorButton";

export default function AllSectorsTable({ sectors }) {
  return (
    <div className="p-5 bg-white flex flex-col rounded gap-3">
      <p className="font-medium">All Sectors</p>
      <div className="flex flex-col gap-1">
        {sectors.length > 0 ? (
          <table className="w-full table-auto border-collapse text-left">
            <thead className="w-full">
              <tr className="w-full border-b border-gray-300">
                <th className=" px-2 py-3 text-gray-500 font-medium  ">
                  Sector Name
                </th>

                <th
                  className=" px-2 py-3 text-gray-500 font-medium  "
                  style={{ textAlign: "center" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sectors.map((sector) => (
                <tr key={sector._id} className=" border-b border-gray-300 ">
                  <td className="py-3 px-3 ">{sector.name}</td>
                  <td className="px-2 py-3" style={{ textAlign: "center" }}>
                    <DeleteSectorButton
                      sectorId={sector._id}
                      sectorName={sector.name}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No sectors added.</p>
        )}
      </div>
    </div>
  );
}
