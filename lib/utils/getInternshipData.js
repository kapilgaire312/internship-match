import dbConnect from "../dbConnect";
import Internship from "../models/internship-model";
import { calculateMatchScore } from "./getInternshipsWithMatchScore";

import { getStudentFromSession } from "./getStudentFromSession";
export default async function getInternshipData(internshipId) {
  try {
    await dbConnect();

    const internship = await Internship.findById(internshipId).lean();
    if (!internship) { ///internship not found
      return null;
    }

    const student = await getStudentFromSession();
    if (!student) {   ///Student is not logged in
      internship.blockApply = true;
      return internship;
    }

    const { matchScore, matchedSkills, matchColour } = calculateMatchScore(
      internship.parsed_required_skills,
      student.parsed_skills,
    );

    return { ...internship, matchScore, matchedSkills, matchColour };
  } catch (error) {
    console.log(error)
    return {error:true}
  }
}
