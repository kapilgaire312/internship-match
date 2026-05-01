import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import CustomError from "@/utils/CustomError";

export default async function callGemini(systemPrompt, prompt) {
  try {
    const ai = new GoogleGenAI({});
    async function main() {
      const response = await ai.models.generateContent({
        model: "gemma-4-26b-a4b-it",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.MINIMAL,
          },
        },
      });
      return response.text;
    }
    const res = await main();

    const result = await JSON.parse(res);
    if (result?.error) {
      return (result.parsed_required_skills = ["error"]); ///fake listing
    }
    return result;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}
