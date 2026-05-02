"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import StudentProfile from "@/lib/models/studentProfile-model";
import { s3Client } from "@/lib/r2";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export default async function handleUploadProfilePicAction(prevVal, formData) {
  try {
    const session = await auth();
    if (session?.user.role !== "student") {
      return { error: "Not logged in as student!" };
    }

    const image = formData.get("file");
    if (!image) {
      return { error: "Upload a image!" };
    }
    if (image.type !== "image/jpeg") {
      return { error: "Only .jpg format is supported!" };
    }
    if (image.size > 1024 * 2 * 1024) {
      return { error: "File size should be less than 2MB!" };
    }

    const bytes = await image.arrayBuffer();
    const imageBuffer = Buffer.from(bytes);

    await dbConnect();
    const studentId = session.user.userId;

    //resize and compress the image

    const compressedImageBuffer = await sharp(imageBuffer)
      .resize({ width: 512, height: 512, fit: "inside" }) //resize
      .jpeg({ quality: 80 }) //compress
      .toBuffer();

    //save the image to cloudflare

    const uniqueKey = `profile-pics/${Date.now()}-${image.name}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: uniqueKey,
      Body: compressedImageBuffer,
      ContentType: image.type,
    });

    await s3Client.send(command);

    //save the image url to db
    //
    const student = await StudentProfile.findOne({ student_id: studentId });

    if (!student) {
      return { error: "Student not found!" };
    }

    const previousProfilePicKey = student.profile_pic;

    student.profile_pic = uniqueKey;
    student.save();

    revalidatePath("/student/profile");
    //delete previous pic
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: previousProfilePicKey,
    });

    try {
      //donot disturb the upload process if deletion of previous profile pic fails.
      if (
        previousProfilePicKey &&
        previousProfilePicKey.length !== 0 &&
        previousProfilePicKey.startsWith("http")
      )
        await s3Client.send(deleteCommand);
    } catch (error) {
      console.log(error);
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Failed uploading the profile picture." };
  }
}
