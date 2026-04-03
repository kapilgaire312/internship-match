"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Application from "@/lib/models/application-model";
import Internship from "@/lib/models/internship-model";

import closeInternship from "@/lib/utils/closeInternship";
export default async function handleWithdrawAction(internshipId) {
  try {
    await dbConnect();
    const session = await auth();

    if (session?.user?.role !== "student") {
      return { error: "not logged in as student." };
    }
    const studentId = session.user.userId;

    const internship = await Internship.findById(internshipId);

    if (!internship) return { error: "Internship doesnt exist." };

    const applicationDate = new Date(internship.application_date);

    if (internship.isClosed || applicationDate < Date.now()) {
      if (applicationDate < Date.now()) {
        closeInternship(internshipId);
      }
      return { error: "Internship is already closed. Unable to withdraw." };
    }

    const result = await Application.deleteOne({
      student_id: studentId,
      internship_id: internshipId,
    });

    if (result.deletedCount === 0) {
      return { error: "application doesn't exist!" };
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Error withdrawing the application!" };
  }
}
