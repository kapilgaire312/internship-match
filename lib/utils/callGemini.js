import { error } from "node:console";
import { getGeminiStudentPrompt } from "./getGeminiPrompt";
import { GoogleGenAI } from "@google/genai";
import CustomError from "@/utils/CustomError";

export default async function callGemini(parsedResume, skills) {
  const { systemPrompt, prompt } = getGeminiStudentPrompt(parsedResume, skills);
  console.log(prompt);

  try {
    const ai = new GoogleGenAI({});
    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
        },
      });
      console.log(response.text);
      return response.text;
    }
    const res = await main();

    const result = await JSON.parse(res);
    if (result?.error) {
      throw new CustomError(result.message);
    }
    return result.skills;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}
