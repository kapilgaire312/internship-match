"use server";

import { auth } from "@/lib/auth";
import Application from "@/lib/models/application-model";
import Internship from "@/lib/models/internship-model";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export default async function handleApplicantResponse(applicationId, status) {
  try {
    //check if user is logged in
    const session = await auth();

    if (session?.user?.role !== "company")
      return { error: true, message: "Not logged in as company!" };
    const companyId = session.user.userId;

    console.log("applicationidis", applicationId);
    const application = await Application.findById(applicationId);
    if (!application)
      return { error: true, message: "Failed to update application." };

    //check if internship is of the same company
    const internship = await Internship.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(application.internship_id),
          company_id: new mongoose.Types.ObjectId(companyId),
        },
      },
    ]);

    if (internship.length === 0) {
      return { error: true, message: "Failed to update application." };
    }

    //check if the status value is valid
    const statusValues = ["accepted", "rejected"];
    if (!statusValues.includes(status)) {
      return { error: true, message: "Failed to update application." };
    }

    //check if the value is already updated
    if (application.status !== "pending")
      return { error: true, message: "Cannot change the applicant status." };

    application.status = status;
    await application.save();

    revalidatePath(`/company/internships/${application.internship_id}`);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: true, message: "Failed to update application." };
  }
}
