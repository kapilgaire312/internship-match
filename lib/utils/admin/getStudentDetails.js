import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import StudentProfile from "@/lib/models/studentProfile-model";
import { getProfilePicUrl } from "../getProfilePicUrl";
import getResumeUrl from "../getResumeUrl";

export default async function getStudentDetails(studentId) {
  try {
    const session = auth()
    if (!session || session.user.role !== "admin") {
      return { error: "Unauthorized" };
    }
    await dbConnect()
    const studentDetails = await StudentProfile.findOne({ studentId: studentId }).lean();
    if (!studentDetails) {
      return { error: "Student not found" };
    }
    //get signedurl for resume and profile 
    const profilePicUrl = await getProfilePicUrl(studentDetails.profile_pic)

    let resumeUrl = null
    if (studentDetails.resume_details && studentDetails.resume_details.file_key) {
      const url = await getResumeUrl(studentDetails.resume_details.file_key)
      if (!url.error) {
        resumeUrl = url
      }
    }
    let resumeDetails = null
    if (studentDetails.resume_details) {
      resumeDetails = studentDetails.resume_details
      resumeDetails.file_key = undefined
      resumeDetails.url = resumeUrl
    }

    studentDetails.resume_details = undefined;
    studentDetails.profile_pic = undefined

    return { ...studentDetails, profilePicUrl, resumeDetails, _id: "", student_id: "" };


  } catch (error) {
    console.log("Error in getStudentDetails:", error);
    return { error: "An error occurred while fetching student details" };
  }




}