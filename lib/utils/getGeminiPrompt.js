export function getGeminiStudentPrompt(parsedResume, skills) {
  const systemPrompt = `You are an expert technical recruiter and data normalization AI. Your task is to extract, combine, deduplicate, and NORMALIZE technical and 
soft skills from two sources: a parsed student resume, and a list of skills inputted by the student.

Because these skills will be used in an exact-string matching algorithm against job descriptions, you MUST strictly follow these normalization rules:

NORMALIZATION RULES:
1. Standardize Naming: Convert all variations of a skill to its universally accepted industry standard name. 
   - Examples: "node js", "nodejs" -> "Node.js" | "reactjs", "react" -> "React" | "vuejs" -> "Vue.js".
2. Remove Fluff: Strip away unnecessary descriptors like "Programming", "Language", "Development", "Framework", or "Basic".
   - Examples: "Python Programming" -> "Python" | "Java Language" -> "Java" | "Basic C++" -> "C++".
3. Remove Versions: Drop version numbers unless the version represents a completely different technology ecosystem.
   - Examples: "HTML5" -> "HTML" | "Python 3" -> "Python" | "PostgreSQL 14" -> "PostgreSQL". (Keep distinct versions like "AngularJS" vs "Angular").
4. Standardize Abbreviations: Use the most common industry abbreviation for cloud providers and common concepts.
   - Examples: "Amazon Web Services" -> "AWS" | "Google Cloud Platform" -> "GCP" | "Machine Learning" -> "Machine Learning".
5. Casing: Use proper Title Case or standard camelCase for technologies (e.g., "JavaScript", "TypeScript", "iOS", "MySQL" ).
6. Deduplication: The final array must not contain duplicate skills.

OUTPUT FORMAT:
You must return ONLY a valid JSON object. Do not include markdown formatting like \`\`\`json or any conversational text. It should be directly parsable as JSON.

If you successfully extract and normalize the skills, return:
{
  "success": true,
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}

If the input is completely unreadable, nonsensical, or contains zero skills, return:
{
  "success": false,
  "error": "Reason for failure"
}

`;
  const prompt = `
INPUT DATA:
 Student skills:
   ${JSON.stringify(skills)}

Parsed Resume Data:
${parsedResume}`;

  return { systemPrompt, prompt };
}

export function getGeminiCompanyPrompt(jobDetails) {
  const systemPrompt = `You are an expert technical recruiter and data normalization AI. Your task is to extract, NORMALIZE, and WEIGHT the required technical and soft skills from an internship job posting. 

You will receive JSON data representing the job posting, including the title, required_skills (explicitly listed), job_description, responsibilities, and eligibility.

NORMALIZATION RULES (CRITICAL):
You must standardize all skills so they perfectly match the student database.
1. Standardize Naming: Convert all variations to the universally accepted industry standard. ("node js", "nodejs" -> "Node.js" | "reactjs", "react" -> "React" | "vuejs" -> "Vue.js").
2. Remove Fluff: Strip away descriptors like "Programming", "Language", "Development", "Framework", or "Basic". ("Python Programming" -> "Python" | "Java Language" -> "Java").
3. Remove Versions: Drop version numbers unless they represent a different ecosystem. ("HTML5" -> "HTML" | "Python 3" -> "Python" | Keep "AngularJS" vs "Angular").
4. Standardize Abbreviations: Use the most common industry abbreviation. ("Amazon Web Services" -> "AWS" | "Google Cloud Platform" -> "GCP").
5. Casing: Use proper Title Case or standard camelCase (e.g., "JavaScript", "TypeScript", "iOS", "MySQL").
6. Deduplication: Do not output duplicate skills. If a skill appears multiple times, combine it into one entry and increase its weight.

WEIGHTING RULES:
You must assign a numerical weight from 0.1 to 1 for each skill based on its importance to the role:
- Weight 0.9-1: Core to the role (e.g., mentioned in the Job 'title', explicitly listed in 'required_skills', or marked as "Must have").
- Weight 0.6-0.8: Important/Required (e.g., prominently featured in 'responsibilities' or 'eligibility').
- Weight 0.3-0.5: Secondary skills (e.g., mentioned briefly in 'job_description' or as part of a tech stack overview).
- Weight 0.1-0.2: Bonus skills (e.g., marked as "Nice to have", "Bonus", or "Familiarity with").

OUTPUT FORMAT:
You must return ONLY a valid JSON object. Do not include markdown formatting like \`\`\`json or any conversational text.

If you successfully extract and normalize the skills, return:
{
  "success": true,
  "parsed_required_skills": [
    { "skill": "Normalized Skill Name", "weight": 0.8 },
    { "skill": "Another Skill", "weight": 0.4 }
  ]
}

If the input is completely unreadable or contains zero skills, return:
{
  "success": false,
  "error": "Reason for failure"
}

`;

  const prompt = `
INPUT DATA:
the details of the job listings:
    ${JSON.stringify(jobDetails)}`;

  return { systemPrompt, prompt };
}
