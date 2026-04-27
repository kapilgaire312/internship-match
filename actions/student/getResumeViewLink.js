"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import StudentProfile from "@/lib/models/studentProfile-model";
import getResumeUrl from "@/lib/utils/getResumeUrl";
import CustomError from "@/utils/CustomError";
export default async function getResumeViewLink() {
  try {
    const session = await auth();

    if (session?.user?.role !== "student") throw new CustomError("");

    await dbConnect();
    const student = await StudentProfile.findOne({
      student_id: session.user.userId,
    });

    if (!student) throw new CustomError("");

    if (!student.resume_details?.file_key) throw new CustomError("");

    const fileKey = student.resume_details.file_key;

    console.log("Key is", fileKey);
    const res = await getResumeUrl(fileKey);

    if (res?.error) throw new Error(res.message);

    console.log(res);
    return { success: true, signedUrl: res };
  } catch (error) {
    if (error instanceof CustomError) {
      return { error: "Resume not found!" };
    }
    console.log(error);
    return { error: "Failed to get the resume." };
  }
}
