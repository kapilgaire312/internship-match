const { GetObjectCommand } = require("@aws-sdk/client-s3");
import StudentProfile from "../models/studentProfile-model";
import { s3Client } from "../r2";
import { getGeminiStudentPrompt } from "./getGeminiPrompt";
import parseResumePdf from "./parseResumePdf";
const { default: CustomError } = require("@/utils/CustomError");
const { default: callGemini } = require("./callGemini");

export default async function handleStudentSkillsParse(
  studentProfileId,
  buffer,
  studentSkills,
  fileKey,
) {
  try {
    let byteArray;
    if (!buffer) {
      if (!fileKey) throw new CustomError("file key not found.");
      const command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileKey,
      });
      const response = await s3Client.send(command);

      // Get Uint8Array
      byteArray = await response.Body.transformToByteArray();
    } else {
      byteArray = new Uint8Array(
        buffer.buffer,
        buffer.byteOffset,
        buffer.byteLength,
      );
    }

    const parsedResume = await parseResumePdf(byteArray);

    if (parsedResume?.error)
      throw new CustomError("Failed parsing the resume.");
    const { systemPrompt, prompt } = getGeminiStudentPrompt(
      parsedResume,
      studentSkills,
    );
    const parsedSkills = await callGemini(systemPrompt, prompt);
    console.log(parsedSkills);

    if (parsedSkills.error) throw new CustomError("Failed calling gemini.");

    const student = await StudentProfile.findOneAndUpdate(
      { _id: studentProfileId },
      {
        $set: { parsed_skills: parsedSkills },
        $unset: { "resume_details.parse_status": "" },
      },
    );
    return { success: true, parsedSkills };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}
