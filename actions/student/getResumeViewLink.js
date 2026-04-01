"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import StudentProfile from "@/lib/models/studentProfile-model";
import { s3Client } from "@/lib/r2";
import CustomError from "@/utils/CustomError";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileKey,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3 });
    return { success: true, signedUrl };
  } catch (error) {
    if (error instanceof CustomError) {
      return { error: "Resume not found!" };
    }
    console.log(error);
    return { error: "Failed to get the resume." };
  }
}
