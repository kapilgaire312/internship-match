import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Application from "@/lib/models/application-model";
import mongoose from "mongoose";
import { getProfilePicUrl } from "../getProfilePicUrl";
import getResumeUrl from "../getResumeUrl";

export default async function getApplicantInfo(applicationId) {
  try {
    if (!applicationId) return { error: "application not found." };

    const session = await auth();

    if (session?.user?.role !== "company")
      return { error: "Login as a company to view applicant's info." };

    const companyId = session.user.userId;

    await dbConnect();

    //use aggregate on application to connect with
    //internships to get company id to verify company id is same
    //studentProfile to get student info
    //user to get email
    //and get the required fields

    const query = [
      { $match: { _id: new mongoose.Types.ObjectId(applicationId) } }, //find the applicaton
      {
        $lookup: {
          ///join the internship to get company id to check the same company is requesting access.
          from: "internships",
          localField: "internship_id",
          foreignField: "_id",
          as: "internship",
        },
      },

      { $unwind: "$internship" }, // lookup returns an array and unwind converts it to a document ObjectId  //removes document if array is empty
      {
        $match: {
          "internship.company_id": new mongoose.Types.ObjectId(companyId),
        },
      }, // check if both the company posting the internship and logged in company are same

      {
        $lookup: {
          ///join the student to get the info
          from: "studentprofiles",
          localField: "student_id",
          foreignField: "student_id",
          as: "student",
        },
      },
      { $unwind: "$student" },

      {
        $lookup: {
          //join user to get the email
          from: "users",
          localField: "student.student_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $project: {
          //get the required values only
          _id: 1,
          matched_skills: 1,
          match_score: 1,
          status: 1,
          name: "$student.name",
          university: "$student.university",
          major: "$student.major",
          batch_year: "$student.batch_year",
          address: "$student.address",

          profilePicUrl: "$student.profile_pic",
          skills: "$student.skills",
          resumeUrl: "$student.resume_details.file_key",
          email: "$user.email",
          internshipTitle: "$internship.title",
        },
      },
    ];

    const applicantInfo = await Application.aggregate(query);

    if (!applicantInfo || applicantInfo?.length === 0)
      return { error: "Application not found." };

    //get profile pic url
    const profilePicUrl = await getProfilePicUrl(
      applicantInfo[0].profilePicUrl,
    );
    //get resume url
    const res = await getResumeUrl(applicantInfo[0].resumeUrl);
    let resumeUrl = null;
    if (!res.error) resumeUrl = res;

    //get resume file name
    const id = applicantInfo[0]._id.toString().slice(-6);
    const name = applicantInfo[0].name.replace(/\s+/g, "_");
    const title = applicantInfo[0].internshipTitle?.replace(/\s+/g, "_");
    const fileName = `${name}-${title}-${id}.pdf`;

    //get download resume url
    const response = await getResumeUrl(
      applicantInfo[0].resumeUrl,
      true,
      fileName,
    );
    console.log("respomnse is", response);
    let resumeUrlDownload = null;
    if (!res.error) resumeUrlDownload = response;

    const fullApplicantInfo = {
      ...applicantInfo[0],
      profilePicUrl,
      resumeUrl,
      _id: "",
      resumeUrlDownload,
      fileName,
    };

    return { success: true, applicantInfo: fullApplicantInfo };
  } catch (error) {
    console.log(error);
    return { error: "Failed to get applicant info." };
  }
}
