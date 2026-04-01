import { getStudentFromSession } from "./getStudentFromSession";
import getQuery from "./getQuery";
import Internship from "../models/internship-model";
import Application from "../models/application-model";
import { auth } from "../auth";

export async function getInternshipsWithMatchScore(search, filter) {
  try {
    const session = await auth();

    const student = await getStudentFromSession();

    if (!student) {
      return { error: true, message: "student not logged in." };
    }
    if (
      student?.sector?.length === 0 ||
      student?.skills?.length === 0 ||
      student?.parsed_skills?.length === 0
    ) {
      return { error: true, message: "Complete your profile." };
    }
    const studentId = session.user.userId;

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
          student.parsed_skills,
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
    return { error: true };
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
