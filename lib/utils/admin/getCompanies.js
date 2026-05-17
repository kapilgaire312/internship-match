import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import CompanyProfile from "@/lib/models/companyProfile-model";
import User from "@/lib/models/user-model";

export default async function getCompanies(filter, search) {
  try {

    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return { error: "Unauthorized" };
    }
    await dbConnect();

    let companyIds = [];
    let query = {};
    if (search && search.trim() !== "") {
      const emailMatchingCompanies = await User.find({
        role: "company",
        email: { $regex: search, $options: "i" },
      }).select("_id");

      companyIds = emailMatchingCompanies.map((company) => company._id);

    }
    if (companyIds.length > 0) {
      query = {
        $or: [
          { company_id: { $in: companyIds } },

        ]
      };
    }
    if (search && search.trim() !== "") {
      query.$or.push({ name: { $regex: search, $options: "i" } });
    }

    if (filter && filter.toLowerCase() !== "all") {
      query.status = filter.toLowerCase();
    };
    const pipeline = [
      { $match: query },
      { $sort: { joined_on: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "company_id",
          foreignField: "_id",
          as: "company_info",
        },
      },
      { $unwind: "$company_info" },
      {
        $project: {
          company_id: 1,
          _id: 0,
          name: 1,
          status: 1,
          logo: 1,

          email: "$company_info.email",
        },
      },
    ];

    console.log(pipeline)

    const companies = await CompanyProfile.aggregate(pipeline);
    return companies;


  } catch (error) {
    console.error("Error fetching companies:", error);
    return { error: "An error occurred while fetching companies" };
  }
}