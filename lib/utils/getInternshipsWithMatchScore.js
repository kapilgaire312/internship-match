import CustomError from "@/utils/CustomError";
import { filterInternshipsBySector } from "./filterInternshipsBySector";
import { getStudentFromSession } from "./getStudentFromSession";

export async function getInternshipsWithMatchScore() {
  try {
    const student = await getStudentFromSession();

    if (!student) {
      throw new CustomError("Student not logged in");
    }
    if (
      student?.sector?.length === 0 ||
      student?.skills?.length === 0 ||
      student?.parsed_skills?.length === 0
    ) {
      throw new CustomError("Complete your profile.");
    }

    const intenshipsBySectors = await filterInternshipsBySector(
      student?.sector,
    );

    const internshipsWithMatchScore = intenshipsBySectors
      ?.map((item) => {
        const { matchScore, matchedSkills, matchColour } = calculateMatchScore(
          item.parsed_required_skills,
          student.parsed_skills,
        );
        if (!matchScore) return null; //return null for the 0 matchScore

        return { ...item, matchScore, matchedSkills, matchColour };
      })
      .filter(Boolean) //removes null values
      .sort((a, b) => b.matchScore - a.matchScore); //sort in descending order
    return internshipsWithMatchScore;
  } catch (error) {
    if (error instanceof CustomError) {
      return [];
    } else {
      return { error: true };
    }
  }
}

export function calculateMatchScore(requiredSkills, userSkills) {
  const userSkillsSet = new Set(userSkills);
  console.log(requiredSkills);
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

function getMatchColour(matchScore) {
  if (matchScore >= 90) return "#d1fae5";
  if (matchScore >= 60) return "#dbeafe";
  if (matchScore >= 30) return "#fef9c3";
  if (matchScore < 30) return "#e5e7eb";
}
