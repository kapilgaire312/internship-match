import dbConnect from "@/lib/dbConnect";
import Application from "@/lib/models/application-model";
import Internship from "@/lib/models/internship-model";
import mongoose from "mongoose";
import { getProfilePicUrl } from "../getProfilePicUrl";
export default async function getApplicants(internshipId, sortBy, status) {
  try {
    if (!internshipId) {
      return { error: true, message: "Invalid Internship Id." };
    }
    await dbConnect();

    const internship = await Internship.findById(internshipId);
    if (!internship) return { error: true, message: "Invalid Internship Id." };

    //first lets understand
    //we need to find the applications and use its student_id to get students data
    //so its best to use aggregate
    //
    //we have two filters here, so first dyanmically constructing the query should be the way to go
    //
    //first is sortBy, it has two values latest and matchScore, both of these are present in Application model. so after finding the applications,
    //we should sort acc to request.
    //
    //next is status, this is also in the Application model.
    //
    //so, the steps in pipeline will be:
    //find all the applications with the internship id using match
    //then filter the results acc to request dyanmically
    //join the studentProfile model with lookup to get the students data
    //send only the relecent data with project
    //
    //

    //sanitize the status value
    let statusFilter = null;

    if (status === "shortlisted") {
      statusFilter = "accepted";
    } else if (status === "pending") {
      statusFilter = status;
    }

    const match = {
      internship_id: new mongoose.Types.ObjectId(internshipId),
    };

    if (statusFilter) match.status = statusFilter;

    //initialize query. for aggregate it is a array of steps in pipeline
    const query = [
      {
        $match: match,
      },
    ];

    //handle sorting
    if (sortBy === "matchScore") {
      query.push({ $sort: { match_score: 1 } });
    } else query.push({ $sort: { applied_date: -1 } });

    //join the student profile
    query.push({
      $lookup: {
        from: "studentprofiles", ////which document to jooin, collectiion name not schema
        localField: "student_id", //which field of this document to compare
        foreignField: "student_id", //which field of other document to compare
        as: "studentInfo", // what will be the name of the joined document
      },
    });

    //which fields to send
    query.push({
      $project: {
        "studentInfo.name": 1,
        status: 1,
        "studentInfo.university": 1,
        "studentInfo.major": 1,
        "studentInfo.batch_year": 1,
        match_score: 1,
        "studentInfo.profile_pic": 1,
        "studentInfo.skills": 1,
      },
    });

    //search db with aggregate
    const applicants = await Application.aggregate(query);

    //get profile pic url from key and reformat the data
    const applicantsList = await Promise.all(
      applicants.map(async (applicant) => {
        console.log(applicant);
        const profilePicUrl = await getProfilePicUrl(
          applicant?.studentInfo[0]?.profile_pic,
        );
        return {
          ...applicant.studentInfo[0],
          status: applicant.status,
          match_score: applicant.match_score,
          profilePicUrl,
        };
      }),
    );

    console.log(applicantsList);

    return applicantsList;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}
