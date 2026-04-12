"use server";

import {
  detailedInfoSchema,
  summaryInfoSchema,
} from "@/lib/utils/newInternship.validation";
import { ZodError } from "zod";

export default async function handlePostNewInternshipAction(
  prevState,
  formData,
) {
  console.log(formData);

  let rawData = {
    internshipTitle: formData.get("internshipTitle").trim(),
    monthlySalary: formData.get("monthlySalary"),
    level: formData.get("level"),
    workModel: formData.get("workModel"),
    location: formData.get("location").trim(),
    openings: formData.get("openings"),
    applicationDeadline: formData.get("applicationDeadline"),
    jobDescription: formData.get("jobDescription").trim(),
    eligibility: formData.get("eligibility").trim(),
    responsibilities: formData.get("responsibilities").trim(),
    sectorId: formData.get("sectorId"),
  };
  rawData.requiredSkills = JSON.parse(formData.get("requiredSkills"));

  try {
    //validate summary information
    summaryInfoSchema.parse(rawData);
    const applicationDeadline = new Date(rawData.applicationDeadline);
    if (Date.now > applicationDeadline)
      return {
        error: true,
        errorType: "summaryInfo",
        messageArray: [
          {
            field: "applicationDeadline",
            message: "Deadline dates must be in future.",
          },
        ],
        rawData,
      };
  } catch (error) {
    if (error instanceof ZodError) {
      const messageArray = error.issues.map((item) => {
        return { field: item.path[0], message: item.message };
      });
      return { error: true, errorType: "summaryInfo", messageArray, rawData };
    }
    console.log(error);

    return {
      error: true,
      message: "Failed posting the internship. Try again later.",
    };
  }
  try {
    //validate deatiled information
    detailedInfoSchema.parse(rawData);
  } catch (error) {
    if (error instanceof ZodError) {
      const messageArray = error.issues.map((item) => {
        return { field: item.path[0], message: item.message };
      });
      return { error: true, messageArray };
    }
    console.log(error);

    return {
      error: true,
      message: "Failed posting the internship. Try again later.",
      rawData,
    };
  }
}
