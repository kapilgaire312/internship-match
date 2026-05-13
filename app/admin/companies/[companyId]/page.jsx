import Back from "@/components/company/Back";
import getCompanyDetails from "@/lib/utils/admin/getCompanyDetails";
import ResponseSection from "../components/ResponseSection";

export default async function CompanyProfilePage({ params }) {
  const { companyId } = await params;
  const companyDetails = await getCompanyDetails(companyId);

  const statusMap = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    blacklisted: "Blacklisted",
    notApplied: "New"
  };
  const statusColors = {
    pending: "#FEF08A",      // yellow-200
    approved: "#BBF7D0",     // green-200
    rejected: "#FECACA",     // red-200
    blacklisted: "#D1D5DB",  // gray-300
    notApplied: "#F3F4F6"    // gray-100
  };

  if (companyDetails.error) {
    return (
      <div className="flex justify-center items-center h-64">

        <p className="text-gray-500 font-medium">{companyDetails.error}</p>
      </div>
    );
  }
  return (
    <div className=" flex flex-col gap- ">

      <div className="flex justify-between pr-8 items-center bg-white px-2 py-6 rounded-lg shadow-sm w-full">
        <div className="text-xl font-semibold flex gap-2 items-center">
          <Back path="/admin/companies" />
          Review Company Profile</div>
        <div className="flex justify-center gap-10">
          <p className="text-lg font-medium px-4 py-2 rounded-2xl" style={{ backgroundColor: statusColors[companyDetails.status] }}>
            {statusMap[companyDetails.status]}</p>
          <div >
            <ResponseSection
              status={companyDetails.status}
              companyId={companyDetails.company_id.toString()}
              companyName={companyDetails.name}
              allResponse={true}
            />
          </div>

        </div>
      </div>
      <div></div>



    </div>
  );
}