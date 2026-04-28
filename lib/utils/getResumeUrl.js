import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../r2";

export default async function getResumeUrl(
  fileKey,
  contentDisposition = false,
  fileName,
) {
  try {
    if (!fileKey) return { error: true, message: "Resume Key is empty" };

    let command;
    if (!contentDisposition)
      command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileKey,
      });
    else
      command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileKey,
        ResponseContentDisposition: `attachment; filename=${fileName}`,
      });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 15,
    });

    return signedUrl;
  } catch (error) {
    return { error: true, message: error.message };
  }
}
