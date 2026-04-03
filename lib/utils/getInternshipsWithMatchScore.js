import { getStudentFromSession } from "./getStudentFromSession";
import getQuery from "./getQuery";
import Internship from "../models/internship-model";
import Application from "../models/application-model";
import { auth } from "../auth";
import handleStudentSkillsParse from "./handleStudentSkillsParse";
import CustomError from "@/utils/CustomError";

export async function getInternshipsWithMatchScore(search, filter) {
  try {
    const session = await auth();

    const student = await getStudentFromSession();

    if (!student) {
      return {
        error: true,
        message: "Student not logged in. Login to view recommendations.",
      };
    }
    if (
      student?.sector?.length === 0 ||
      student?.skills?.length === 0 ||
      student?.parsed_skills?.length === 0
    ) {
      return {
        error: true,
        message: "Complete your profile to get internship recommendations.",
      };
    }
    const studentId = session.user.userId;

    //check if pasrsed required skills are available

    if (!student.resume_details?.file_key) {
      //no resume
      return {
        error: true,
        message: "Complete your profile to get internship recommendations.",
      };
    }

    const parseStatus = student.resume_details.parse_status;
    let parsedSkills = null;
    if (parseStatus) {
      if (parseStatus === "pending") {
        //retry too parse the file
        console.log("file present but not parsed.");
        const res = await handleStudentSkillsParse(
          student._id,
          null,
          student.skills,
          student.resume_details.file_key,
        );
        if (res.error) throw new CustomError("failed parsing skilld.");
        parsedSkills = res.parsedSkills;
      }
    }

    if (!parsedSkills) {
      parsedSkills = student.parsed_skills;
    }

    let query = { sector: { $in: student?.sector } };
    if (search && search?.length != 0) {
      const searchQuery = await getQuery(search);
      query = { ...query, ...searchQuery };
    }
    const intenshipsBySectors = await Internship.find(query)
      .sort({
        createdAt: -1, // descending
      })
      .lean();

    const applications = await Application.find({
      student_id: studentId,
    }).select("internship_id");

    const appliedInternshipIds = applications?.map((item) =>
      item.internship_id.toString(),
    );

    const appliedInternshipIdsSet = new Set(appliedInternshipIds);

    let internshipsWithMatchScore = intenshipsBySectors
      ?.map((item) => {
        const { matchScore, matchedSkills, matchColour } = calculateMatchScore(
          item.parsed_required_skills,
          parsedSkills,
        );
        if (!matchScore) return null; //return null for the 0 matchScore

        const isApplied = appliedInternshipIdsSet.has(item._id.toString());

        return { ...item, matchScore, matchedSkills, matchColour, isApplied };
      })
      .filter(Boolean); //removes null values

    if (filter === "matchScore")
      internshipsWithMatchScore.sort((a, b) => b.matchScore - a.matchScore); //sort in descending order

    return internshipsWithMatchScore;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Failed calculating the matched internships. Try again later.",
    };
  }
}
export function calculateMatchScore(requiredSkills, userSkills) {
  const userSkillsSet = new Set(userSkills);
  const matchedSkills = requiredSkills.filter((item) =>
    userSkillsSet.has(item.skill),
  );

  let total = 0;
  let score = 0;

  for (const req of requiredSkills) {
    total += req.weight;
  }

  for (const matched of matchedSkills) {
    score += matched.weight;
  }
  const matchScore = Math.round((score / total) * 100);
  const matchColour = getMatchColour(matchScore);

  return {
    matchScore,
    matchedSkills: matchedSkills.map(
      (item) => item.skill[0].toUpperCase() + item.skill.slice(1),
    ),
    matchColour,
  };
}

export function getMatchColour(matchScore) {
  if (matchScore >= 90) return "#d1fae5";
  if (matchScore >= 60) return "#dbeafe";
  if (matchScore >= 30) return "#fef9c3";
  if (matchScore < 30) return "#e5e7eb";
}
