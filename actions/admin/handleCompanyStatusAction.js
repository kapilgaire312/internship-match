"use server";

import { auth } from "@/lib/auth";
import CompanyProfile from "@/lib/models/companyProfile-model";
import { revalidatePath } from "next/cache";

export default async function handleCompanyStatusAction(companyId, action) {
  try {
    console.log(action);
    //check session and admin role
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return { error: "Unauthorized" };
    }
    //check validity of action
    const validActions = ["Approve", "Reject", "Blacklist", "Unblacklist"];
    if (!validActions.includes(action)) {
      return { error: "Invalid action" };
    }

    const actionsMap = {
      Approve: "approved",
      Reject: "rejected",
      Blacklist: "blacklisted",
      Unblacklist: "approved",
    };
    const newStatus = actionsMap[action];
    console.log(newStatus);

    const company = await CompanyProfile.findOne({ company_id: companyId });
    console.log(newStatus);

    if (!company) {
      return { error: "Company not found" };
    }

    company.status = newStatus;

    await company.save();

    revalidatePath("/admin/companies");
    return { success: true };
  } catch (error) {
    console.error("Error in handleCompanyStatusAction:", error);
    return { error: "Failed to update company status" };
  }
}
