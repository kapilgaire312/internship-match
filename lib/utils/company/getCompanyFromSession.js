import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import CompanyProfile from "@/lib/models/companyProfile-model";

export async function getCompanyFromSession() {
  try {
    const session = await auth();

    await dbConnect();

    if (session?.user?.role === "company") {
      const company = await CompanyProfile.findOne({
        company_id: session.user.userId,
      });
      return company;
    }
    return null;
  } catch (error) {
    throw error;
  }
}
