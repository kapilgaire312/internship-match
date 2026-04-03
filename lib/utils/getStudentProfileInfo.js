import { GetObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "../auth";
import dbConnect from "../dbConnect";
import Sector from "../models/sector-model";
import StudentProfile from "../models/studentProfile-model";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../r2";

export default async function getStudentProfileInfo() {
  try {
    const session = await auth();
    await dbConnect();

    let student;
    if (session?.user?.role === "student") {
      student = await StudentProfile.findOne({
        student_id: session.user.userId,
      })
        .populate("sector")
        .lean();
    }
    if (!student) {
      return null;
    }

    const profilePicLink = await getProfileUrl(student.profile_pic);

    const basicInfo = {
      name: student.name,
      profile_pic: profilePicLink,
      email: session?.user?.email,
      university: student.university || "",
      major: student.major || "",
      batch_year: student.batch_year || "",
      address: student.address || "",
    };
    const currentSkills = student.skills;
    const studentSectors = student.sector;
    const studentResumeDetails = student.resume_details;

    const currentSectors = studentSectors.map((item) => ({
      _id: item._id.toString(),
      name: item.name,
    }));

    const allSectorsObject = await Sector.find({}).lean();
    const allSectors = allSectorsObject.map((item) => ({
      _id: item._id.toString(),
      name: item.name,
    }));

    return {
      basicInfo,
      currentSectors,
      allSectors,
      currentSkills,
      studentResumeDetails,
    };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}

async function getProfileUrl(key) {
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
