"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Application from "@/lib/models/application-model";
import Internship from "@/lib/models/internship-model";
import StudentProfile from "@/lib/models/studentProfile-model";
import { calculateMatchScore } from "@/lib/utils/getInternshipsWithMatchScore";

export default async function handleApplyNowAction(internshipId) {
  try {
    const session = await auth();

    if (session?.user?.role !== "student") {
      return { error: "not logged in as student" };
    }
    await dbConnect();
    const studentId = session.user.userId;

    const internship = await Internship.findById(internshipId);
    const today = new Date();

    if (!internship) {
      return { error: "Internship not found" };
    }

    const student = await StudentProfile.findOne({ student_id: studentId });

    if (!student) {
      return { error: "Login first to apply for internships." };
    }

    //check if students profile is complete
    if (
      !student?.sector ||
      !student?.skills ||
      student?.sector?.length === 0 ||
      student?.skills?.length === 0 ||
      student?.parsed_skills?.length === 0
    ) {
      return {
        error: "Complete your profile first to apply.",
      };
    }
    const alreadyApplied = await Application.exists({
      student_id: studentId,
      internship_id: internshipId,
    });

    console.log("sid", studentId);

    if (alreadyApplied) {
      return { error: "You have already applied to this internship." };
      //mainly for UI, will not prevent race conditions.
      //using index in db to prevent racing.
    }

    if (internship.isClosed || internship.application_date < today) {
      await closeInternship(internshipId);
      return { error: "Application is closed." };
    }

    console.log(internshipId);
    const { matchScore, matchedSkills } = calculateMatchScore(
      internship.parsed_required_skills,
      student.parsed_skills,
    );

    const newApplication = new Application({
      student_id: studentId,
      internship_id: internshipId,
      match_score: matchScore,
      matched_skills: matchedSkills,
    });
    newApplication.save();

    return { success: true };
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      //the unique index in mongodb Schema will throw this error if violated.
      return { error: "You have already applied to this internship." };
    }
    return { error: "Failed to apply." };
  }
}
