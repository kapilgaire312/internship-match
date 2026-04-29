import { auth } from "@/lib/auth";
import CompanyProfile from "@/lib/models/companyProfile-model";

export default async function getProfileInfo() {
  try {
    //get company id form session
    const session = await auth();
    if (session?.user?.role !== "company") {
      return { error: "Login to view your profile." };
    }
    const companyId = session.user.userId;

    const company = await CompanyProfile.findOne({
      company_id: companyId,
    }).lean();
    if (!company) return { error: "Login to view your profile." };

    return { ...company, _id: "", company_id: "" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to get profile info." };
  }
}
