
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import CompanyProfile from "@/lib/models/companyProfile-model";
import Internship from "@/lib/models/internship-model";


export default async function getInternships(search) {
  try {
    //check session and admin role
    const session = await auth()
    if (!session || session.user.role !== "admin") {
      return { error: "Unauthorized" }
    }

    //fetch internships and populate company name
    await dbConnect()

    let matchQuery = {}
    const pipeline = []
    console.log("Search term in getInternships:", search);
    if (search && search.trim() !== "") {
      const companies = await CompanyProfile.find({ name: { $regex: search, $options: "i" } }, { company_id: 1 })
      const companyIds = companies.map(c => c.company_id)
      matchQuery.$or = [
        { title: { $regex: search, $options: "i" } },
        { company_id: { $in: companyIds } }
      ]
      pipeline.push({ $match: matchQuery })
    }

    //add sort 
    pipeline.push({ $sort: { createdAt: -1 } })

    pipeline.push({
      $lookup: {
        from: "companyprofiles",
        localField: "company_id",
        foreignField: "company_id",
        as: "company_info",
      }
    })

    //unwind company info and project required fields
    pipeline.push(
      { $unwind: "$company_info" },
      {
        $project: {
          title: 1,
          _id: 1,
          company_id: 1,
          isClosed: 1,
          company_name: "$company_info.name"
        }
      }
    )


    const internships = await Internship.aggregate(pipeline)
    console.log("Internships fetched from DB:", internships);

    return internships;


  }
  catch (error) {
    console.error("Error fetching internships:", error);
    return { error: "Failed to fetch internships" };
  }
}