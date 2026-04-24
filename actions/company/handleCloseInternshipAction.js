"use server";

import { auth } from "@/lib/auth";
import Internship from "@/lib/models/internship-model";
import { revalidatePath } from "next/cache";

export default async function handleCloseInternshipAction(internhsipId) {
  try {
    console.log(internhsipId);
    if (!internhsipId) {
      return { error: "Internhsip not found!" };
    }
    const session = await auth();
    if (session?.user?.role !== "company")
      return { error: "Login as a company first!" };
    const companyId = session.user.userId;
    const internship = await Internship.findOne({
      _id: internhsipId,
      company_id: companyId,
    });

    if (!internship) return { error: "Login as a company first!" };

    if (internship.isClosed) return { error: "Internship is already closed." };

    internship.isClosed = true;
    await internship.save();

    revalidatePath(`/company/internships/${internhsipId}`);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Failed to close Internship." };
  }
}
