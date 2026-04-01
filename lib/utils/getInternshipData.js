import { auth } from "../auth";
import dbConnect from "../dbConnect";
import Internship from "../models/internship-model";
import Application from "../models/application-model";

import { calculateMatchScore } from "./getInternshipsWithMatchScore";

import { getStudentFromSession } from "./getStudentFromSession";
export default async function getInternshipData(internshipId) {
  try {
    await dbConnect();

    const session = await auth();

    const internship = await Internship.findById(internshipId).lean();
    if (!internship) {
      ///internship not found
      return null;
    }

    const student = await getStudentFromSession();
    if (!student) {
      ///Student is not logged in
      internship.blockApply = true;
      return internship;
    }

    const studentId = session.user.userId;

    const appliedInternship = await Application.findOne({
      student_id: studentId,
      internship_id: internshipId,
    });

    if (!appliedInternship) {
      const { matchScore, matchedSkills, matchColour } = calculateMatchScore(
        internship.parsed_required_skills,
        student.parsed_skills,
      );

      return { ...internship, matchScore, matchedSkills, matchColour };
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
