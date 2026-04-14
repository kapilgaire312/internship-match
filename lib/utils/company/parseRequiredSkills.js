import dbConnect from "@/lib/dbConnect";
import callGeminiCompany from "./callGeminiCompany";
import Internship from "@/lib/models/internship-model";

export default async function parseRequiredSkills(jobDetails, internshipId) {
  try {
    const res = await callGeminiCompany(jobDetails);
    if (res?.error) {
      throw new Error("Failed calling gemini.");
    }

    await dbConnect();
    const update = { parsed_required_skills: res };
    const internship = await Internship.findByIdAndUpdate(
      internshipId,
      update,
      { returnDocument: "after" },
    );

    if (!internship) {
      throw new Error("Failed updating database.");
    }

    return res;
  } catch (error) {
    console.log(error.message);
    return { error: true };
  }
}
