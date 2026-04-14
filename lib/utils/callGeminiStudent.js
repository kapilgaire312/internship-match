import CustomError from "@/utils/CustomError";
import callGemini from "./callGemini";

export default async function callGeminiStudent(systemPrompt, prompt) {
  try {
    const result = await callGemini(systemPrompt, prompt);
    if (result?.error) {
      throw new CustomError("Failed calling gemini.");
    }
    return result.skills;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}
