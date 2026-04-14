import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../r2";

export async function getProfilePicUrl(key) {
  //get signed url for profile pics
  //
  try {
    if (!key) {
      throw new Error("No key");
    }
    console.log(key);
    if (key.startsWith("https")) {
      // if key is the default link
      return key;
    }

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 60 * 10,
    });
    return signedUrl;
  } catch (error) {
    console.log(error);
    return "https://pub-4e224a60371345f9994eb80b6f5ef710.r2.dev/profile-pics_default_profile_pic.jpg";
  }
}
