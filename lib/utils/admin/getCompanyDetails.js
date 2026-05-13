import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import CompanyProfile from "@/lib/models/companyProfile-model";
import User from "@/lib/models/user-model";

export default async function getCompanyDetails(companyId) {
  try {
    //check session and admin role
    const session = await auth()
    if (!session || session.user.role !== "admin") {
      return { error: "Unauthorized" }
    }

    await dbConnect()
    const company = await CompanyProfile.findById(companyId);
    if (!company) {
      return { error: "Company not found" }
    }

    //get company email from user collection
    const user = await User.findById(company.user_id);
    if (user) {
      company.email = user.email;
    }

    return company;
  } catch (error) {
    console.error("Error fetching company details:", error);
    return { error: "Failed to fetch company details" };
  }
}