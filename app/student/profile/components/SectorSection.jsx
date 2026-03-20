"use client";

import EditSection from "./EditSection";
import { useEffect, useState } from "react";
import SectorSelector from "./SectorSelector";
import saveSectorInfoAction from "@/actions/student/saveSectorInfoAction";

export default function SectorSection({ currentSectors, allSectors }) {
  const [availableSectors, setAvailableSectors] = useState(allSectors);
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(currentSectors);

  const [isPending, setIsPending] = useState(null);
  const [returnState, setReturnState] = useState(null);

  async function handleSave() {
    if (returnState?.error) {
      setReturnState(null);
    }
    if (values.length === 0) {
      setReturnState({ error: "Add atleast one sector." });
      return;
    }

    setIsPending(true);
    const response = await saveSectorInfoAction(values);
    console.log(response);
    setReturnState(response);
    setIsPending(null);
  }
  useEffect(() => {
    if (returnState?.success) {
      setEditing(false);
      setReturnState(null);
    }
  }, [returnState]);

  function handleDeleteSector(sectorId) {
    const newSectors = values.filter((item) => item._id != sectorId);
    const deletedSector = values.find((item) => item._id === sectorId);
    setValues(newSectors);
    if (deletedSector)
      setAvailableSectors([...availableSectors, deletedSector]);
  }

  function handleSectorSelect(sectorId) {
    const selectedSector = availableSectors.find(
      (item) => item._id === sectorId,
    );
    const newAvailableSectors = availableSectors.filter(
      (item) => item._id != sectorId,
    );
    setAvailableSectors(newAvailableSectors);
    if (selectedSector) {
      setValues([...values, selectedSector]);
    }
  }

  function handleCancel() {
    setEditing(false);
    setValues(currentSectors);
    setAvailableSectors(allSectors);
    if (returnState?.error) {
      setReturnState(null);
    }
  }
  return (
    <div className="bg-white p-5 rounded w-full flex flex-col gap-4">
      <div>
        <EditSection
          editingInfo={{ editing, setEditing }}
          isPending={isPending}
          handleCancel={handleCancel}
          handleSave={handleSave}
          titleInfo={{
            title: "Sector",
            text: "Choose the industries you want to target",
          }}
        />
      </div>
      <div className="flex flex-col gap-2 ">
        {" "}
        {currentSectors?.length === 0 && !editing ? (
          <div className="flex justify-center text-gray-600">
            Click edit to add new sector.
          </div>
        ) : (
          <div className="text-gray-600">Current Sectors</div>
        )}
        <div className="flex gap-2 flex-wrap">
          {values?.map((item, index) => {
            return (
              <div
                className="flex items-center gap-2 bg-[#f5f6fc] border border-gray-300 rounded-xl px-2 py-1 font-medium"
                key={index}
              >
                {" "}
                {item.name}
                {editing && (
                  <button
                    onClick={() => handleDeleteSector(item._id)}
                    className="hover:opacity-70  cursor-pointer text-gray-600 rounded-full bg-gray-500 w-5 text-xs h-5 flex justify-center items-center text-white"
                  >
                    {" "}
                    x
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        {editing && (
          <SectorSelector
            availableSectors={availableSectors}
            handleSectorSelect={handleSectorSelect}
          />
        )}{" "}
        {returnState?.error && (
          <p className="text-red-400 text-center mt-2">{returnState.error}</p>
        )}
      </div>
    </div>
  );
}
