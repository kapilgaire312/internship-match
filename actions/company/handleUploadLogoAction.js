"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import CompanyProfile from "@/lib/models/companyProfile-model";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export default async function handleUploadLogoAction(prevVal, formData) {
  try {
    const session = await auth();
    if (session?.user.role !== "company") {
      return { error: "Not logged in as company!" };
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
    const companyId = session.user.userId;

    //resize and compress the image

    const compressedImageBuffer = await sharp(imageBuffer)
      .resize({ width: 512, height: 512, fit: "inside" }) //resize
      .jpeg({ quality: 80 }) //compress
      .toBuffer();

    //save the image to cloudflare

    const uniqueKey = `company-logo/${Date.now()}-${image.name}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME_COMPANY_LOGO,
      Key: uniqueKey,
      Body: compressedImageBuffer,
      ContentType: image.type,
    });

    const s3Client = new S3Client({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT_COMPANY_LOGO,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID_COMPANY_LOGO,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY_COMPANY_LOGO,
      },
    });

    await s3Client.send(command);

    //save the image url to db
    //
    const company = await CompanyProfile.findOne({ company_id: companyId });

    if (!company) {
      return { error: "Company not found!" };
    }

    const previousLogoKey = company.logo;

    company.logo = uniqueKey;
    company.save();
    revalidatePath("/company/profile");

    //delete previous logo
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME_COMPANY_LOGO,
      Key: previousLogoKey,
    });

    try {
      //donot disturb the upload process if deletion of previous logo fails.
      console.log(previousLogoKey);
      if (previousLogoKey && !previousLogoKey.startsWith("http"))
        await s3Client.send(deleteCommand);
    } catch (error) {
      console.log(error);
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Failed uploading the logo." };
  }
}
