import { auth } from "../auth";
import dbConnect from "../dbConnect";
import Internship from "../models/internship-model";
import Application from "../models/application-model";

import { calculateMatchScore } from "./getInternshipsWithMatchScore";

import { getStudentFromSession } from "./getStudentFromSession";
import getParsedRequiredSkills from "./getParsedRequiredSkills";
import mongoose from "mongoose";
import getCompanyLogoUrl from "./getCompanyLogoUrl";
export default async function getInternshipData(internshipId) {
  try {
    await dbConnect();

    const session = await auth();

    let internship = await Internship.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(internshipId) } },
      {
        $lookup: {
          from: "companyprofiles",
          localField: "company_id",
          foreignField: "company_id",
          as: "company",
        },
      },
      { $unwind: "$company" },
      {
        $addFields: {
          company_name: "$company.name",
          company_logo: "$company.logo",
          company_location: "$company.location.city",
        },
      },
      { $unset: "company" },
    ]);

    console.log(internship);

    if (!internship || internship.length === 0) {
      ///internship not found
      return null;
    }

    const company_logo = getCompanyLogoUrl(internship[0]?.company_logo);
    internship = { ...internship[0], company_logo };

    const student = await getStudentFromSession();
    if (!student) {
      ///Student is not logged in
      internship.blockApply = true;
      internship.blockMessage = "Login to apply for internsips.";
      return internship;
    }

    const studentId = session.user.userId;

    const appliedInternship = await Application.findOne({
      student_id: studentId,
      internship_id: internshipId,
    });

    let blockApply = false;

    const applicationDate = new Date(internship.application_date);
    if (internship.isClosed || applicationDate < Date.now()) {
      blockApply = true;
      if (applicationDate < Date.now()) {
        Internship.findOneAndUpdate(
          { _id: internshipId },
          { $set: { isClosed: true } },
        );
      }
    }

    if (!appliedInternship) {
      const parsedRequiredSkills = await getParsedRequiredSkills(internship);

      if (parsedRequiredSkills.length === 0)
        return {
          ...internship,
          blockApply,
        };

      const { matchScore, matchedSkills, matchColour } = calculateMatchScore(
        parsedRequiredSkills,
        student.parsed_skills,
      );

      return {
        ...internship,
        matchScore,
        matchedSkills,
        blockApply,
        matchColour,
      };
    }

    return {
      ...internship,
      matchScore: appliedInternship.match_score,
      status: appliedInternship.status,
      appliedDate: appliedInternship.applied_date,
      blockApply: true,
      isApplied: true,
    };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}
