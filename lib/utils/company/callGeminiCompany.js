import CustomError from "@/utils/CustomError";
import { getGeminiCompanyPrompt } from "../getGeminiPrompt";
import callGemini from "../callGemini";

export default async function callGeminiCompany(jobDetails) {
  try {
    const { systemPrompt, prompt } = getGeminiCompanyPrompt(jobDetails);
    const result = await callGemini(systemPrompt, prompt);
    if (result?.error) {
      throw new CustomError("Failed calling gemini.");
    }
    console.log(result.parsed_required_skills);
    return result.parsed_required_skills;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}
