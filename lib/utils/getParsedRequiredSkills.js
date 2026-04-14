import parseRequiredSkills from "./company/parseRequiredSkills";

export default async function getParsedRequiredSkills(item) {
  let parsedRequiredSkills = item.parsed_required_skills || [];

  if (!parsedRequiredSkills || parsedRequiredSkills?.length === 0) {
    const internshipDetails = {
      title: item.title,
      required_skills: item.required_skills,
      job_description: item.jobDescription,
      eligibility: item.eligibility,
      responsibilities: item.responsibilities,
      level: item.level,
    };
    const res = await parseRequiredSkills(internshipDetails, item._id);
    if (!res.error) {
      parsedRequiredSkills = res;
    }
  }
  return parsedRequiredSkills;
}
