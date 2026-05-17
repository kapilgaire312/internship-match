import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Internship from "@/lib/models/internship-model";

export default async function getInternships() {
  try {
    //check session and admin role
    const session = await auth()
    if (!session || session.user.role !== "admin") {
      return { error: "Unauthorized" }
    }

    //fetch internships and populate company name
    await dbConnect()
    const internships = await Internship.aggregate(
      [
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: "companyprofiles",
            localField: "company_id",
            foreignField: "company_id",
            as: "company_info"
          }
        },
        {
          $unwind: "$company_info"
        },
        {
          $project: {
            title: 1,
            _id: 1,
            company_id: 1,
            isClosed: 1,
            company_name: "$company_info.name"
          }
        }
      ]
    )
    return internships;


  }
  catch (error) {
    console.error("Error fetching internships:", error);
    return { error: "Failed to fetch internships" };
  }
}