import getCompanyLogoUrl from "@/lib/utils/getCompanyLogoUrl";
import Image from "next/image";
import Link from "next/link";
import ResponseSection from "./ResponseSection";

export default function CompanyTable({ companyList }) {
  console.log("Company List in CompanyTable:", companyList);
  const statusMap = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    blacklisted: "Blacklisted",
    notApplied: "New"
  };
  const statusColors = {
    pending: "bg-yellow-200",
    approved: "bg-green-200",
    rejected: "bg-red-200",
    blacklisted: "bg-gray-300",
    notApplied: "bg-gray-100"
  };
  if (companyList.error) {
    return <div className="flex bg-white rounded-lg justify-center items-center h-[20vh]">
      <div className="text-gray-400 font-medium">{companyList.error}</div>
    </div>

  }
  return (
    <div className="bg-white p-2 rounded-lg">
      <table className="w-full table-auto border-collapse text-left">
        <thead className="w-full" >
          <tr className="w-full border-b border-gray-300">
            <th className=" px-2 py-3 text-gray-500 font-medium  ">
              Company Name
            </th>
            <th className=" p-2 text-gray-500 font-medium  ">
              Email
            </th>
            <th className=" p-2 text-gray-500 font-medium text-center ">
              Status
            </th>
            <th className=" p-2 text-gray-500 font-medium  text-center ">
              Action
            </th>

          </tr>
        </thead>
        <tbody >
          {companyList.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center align-middle py-8 text-gray-500" >
                No companies found.
              </td>
            </tr>
          ) : (
            companyList.map((company) => {
              const companyId = company._id.toString();
              const status = statusMap[company.status];
              const companyLogo = getCompanyLogoUrl(company.logo)

              return (
                <tr
                  key={company._id}
                  className=" border-b border-gray-300 "
                >
                  <td className="py-6 px-3 ">
                    <div className="flex gap-4 items-center overflow-hidden">
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          overflow: "hidden",

                        }}
                      >
                        <Image
                          src={companyLogo}
                          alt={`${company.name} logo`}
                          width={40}
                          height={40}

                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "50%",
                            display: "block",
                          }}
                        />
                      </div>

                      <Link href={`/admin/companies/${companyId}`} className="text-blue-500 hover:underline">
                        {company.name}
                      </Link>
                    </div>
                  </td>
                  <td className="p-2 ">
                    {company.email}
                  </td>
                  <td className={`p-2 `}>

                    <p className={` ${statusColors[company.status]} rounded-xl py-1 text-center`}>{status}</p>


                  </td>
                  <td className="p-2 text-center">
                    <ResponseSection status={company.status} companyId={companyId} companyName={company.name} />
                  </td>
                </tr>
              )
            }))}
        </tbody>
      </table>
    </div>
  );
}