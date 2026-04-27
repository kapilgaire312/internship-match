import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../r2";

export default async function getResumeUrl(fileKey) {
  try {
    if (!fileKey) return { error: true, message: "Resume Key is empty" };

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileKey,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 5,
    });

    return signedUrl;
  } catch (error) {
    return { error: true, message: error.message };
  }
}
