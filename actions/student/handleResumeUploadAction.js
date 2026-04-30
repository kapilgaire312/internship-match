"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import StudentProfile from "@/lib/models/studentProfile-model";
import { s3Client } from "@/lib/r2";
import handleStudentSkillsParse from "@/lib/utils/handleStudentSkillsParse";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

export default async function handleResumeSubmitAction(prevState, formData) {
  try {
    const session = await auth();

    if (session.user.role !== "student") {
      return { error: "Login as student to upload resume!" };
    }

    const file = formData?.get("file");
    console.log(file);
    if (!file) return { error: "No file provided" };
    if (file.type !== "application/pdf") {
      return { error: "Only .pdf format is supported!" };
    }

    if (file.size > 500 * 1024) {
      return { success: false, message: "File size must be less than 500KB" };
    }

    //// create unique name for the file to avoid collisions and overwriting of the file

    const uniqueName = `resumes/${Date.now()}-${file.name}`;
    console.log(uniqueName);

    ///covnvert the file into buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    /// Upload to R2 usinf putObjextCommand
    //
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: uniqueName,
      Body: buffer,
      ContentType: file.type,
    });

    await s3Client.send(command);

    await dbConnect();

    const update = {
      $set: {
        resume_details: {
          file_name: file.name,
          file_size: file.size,
          file_key: uniqueName,
          parse_status: "pending",
        },
      },
    };
    const resume_details = {
      file_name: file.name,
      file_size: file.size,
      file_key: uniqueName,
      parse_status: "pending",
    };

    const student = await StudentProfile.findOne({
      student_id: session.user.userId,
    });

    if (!student) {
      return { error: "Student not found!" };
    }
    const previousResumeKey = student.resume_details?.file_key;

    student.resume_details = resume_details;
    student.save();

    revalidatePath("/student/profile");
    //delete previous pic
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: previousResumeKey,
    });

    try {
      if (previousResumeKey && previousResumeKey.length !== 0) {
        console.log("deleting previous resume");
        await s3Client.send(deleteCommand);
      }
    } catch (error) {
      console.log(error);
    }

    if (student.skills?.length !== 0) {
      //call gemini to parse the resume in background, if skills is there.
      const res = await handleStudentSkillsParse(
        student._id,
        buffer,
        student.skills,
      );
      console.log(res);
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Failed to upload resume! Try again later." };
  }
}
