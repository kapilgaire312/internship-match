"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Application from "@/lib/models/application-model";

export default async function handleWithdrawAction(internshipId) {
  try {
    await dbConnect();
    const session = await auth();

    if (session?.user?.role !== "student") {
      return { error: "not logged in as student." };
    }
    const studentId = session.user.userId;

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
