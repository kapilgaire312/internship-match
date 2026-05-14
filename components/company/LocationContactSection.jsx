import Image from "next/image";

export default function LocationContactSection({ companyDetails }) {
  return (
    <div className="bg-white p-4 w-full rounded-lg flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b pt-2 pb-4">
        <Image
          src="/location-logo.svg"
          alt="location_icon"
          width={16}
          height={16}
        />
        <h2 className="text-xl font-semibold">Location & Contact</h2>
      </div>

      <div className="flex flex-col gap-4">
        <div className="border-b pb-4">
          <p className="font-medium text-gray-500">Address</p>
          <p className="bg-gray-100 py-2 px-4 rounded-lg break-all text-wrap">
            {companyDetails.location
              ? `${companyDetails.location.street_address ? capitalizeFirstLetter(companyDetails.location.street_address) : "--"}, ${companyDetails.location.city ? capitalizeFirstLetter(companyDetails.location.city) : "--"}, ${companyDetails.location.country ? capitalizeFirstLetter(companyDetails.location.country) : "--"}`
              : "--"}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <p className="font-medium text-gray-500">Contact Email</p>
            <p className="bg-gray-100 py-2 px-4 rounded-lg break-all text-wrap">
              {companyDetails.contact?.email ? companyDetails.contact.email : "--"}
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-500">Phone</p>
            <p className="bg-gray-100 py-2 px-4 rounded-lg break-all text-wrap">
              {companyDetails.contact?.number ? companyDetails.contact.number : "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}