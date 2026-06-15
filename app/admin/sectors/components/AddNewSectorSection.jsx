"use client"
export default function AddNewSectorSection() {
  return (
    <div className="p-5 bg-white flex flex-col rounded gap-3">
      <p className="font-medium">Add New Sector</p>
      <div className="flex flex-col gap-1">
        <p>Sector Name</p>
        <form className="flex gap-6 items-center">
          <input className="border-2 px-2 py-1 w-full rounded" />
          <button
            type="submit"
            className="w-50 bg-[#2762ea] text-white py-2 px-2 rounded cursor-pointer"
          >
            + Add Sector
          </button>
        </form>
      </div>
    </div>
  );
}
