"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import CompanyProfile from "@/lib/models/companyProfile-model";
import Internship from "@/lib/models/internship-model";
import parseRequiredSkills from "@/lib/utils/company/parseRequiredSkills";
import { newInternshipSchema } from "@/lib/utils/newInternship.validation";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export default async function handlePostNewInternshipAction(
  prevState,
  formData,
) {
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
  try {
    rawData.requiredSkills = JSON.parse(formData.get("requiredSkills"));

    //validate summary information
    newInternshipSchema.parse(rawData);
    const applicationDeadline = new Date(rawData.applicationDeadline);
    if (Date.now > applicationDeadline)
      return {
        error: true,
        messageArray: [
          {
            field: "applicationDeadline",
            message: "Deadline dates must be in future.",
          },
        ],
        message: "Enter valid values in above fields.",
        rawData,
      };

    //connect to DB
    await dbConnect();
    const session = await auth();

    //check if company is logged in
    if (session?.user?.role !== "company")
      return {
        error: true,
        message: "Not logged in as a company.",
      };

    const companyId = session.user.userId;

    //check if the company Id is correct
    const company = await CompanyProfile.findOne({
      company_id: companyId,
    }).lean();
    if (!company) {
      return {
        error: true,
        message: "Not logged in as a company.",
      };
    }
    const newInternship = await Internship.create({
      title: rawData.internshipTitle,
      company_id: companyId,
      company_name: company.name,
      company_logo: company.logo,
      company_location: rawData.location,
      type: rawData.workModel,

      salary: rawData.monthlySalary,
      sector: rawData.sectorId,
      required_skills: rawData.requiredSkills,
      // parsed_required_skills: ,
      job_description: rawData.jobDescription,
      eligibility: rawData.eligibility,
      responsibilities: rawData.responsibilities,
      openings: rawData.openings,
      level: rawData.level,

      isClosed: false,
      application_date: new Date(rawData.applicationDeadline),
    });

    if (!newInternship) throw new Error("Failed saving the internship");
    console.log(newInternship);
    console.log("done");

    /// send request to parse the required skills
    const jobDetails = {
      title: rawData.internshipTitle,
      required_skills: rawData.requiredSkills,
      job_description: rawData.jobDescription,
      eligibility: rawData.eligibility,
      responsibilities: rawData.responsibilities,
      level: rawData.level,
    };

    parseRequiredSkills(jobDetails, newInternship._id);

    revalidatePath("/company/internships");

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      const messageArray = error.issues.map((item) => {
        return { field: item.path[0], message: item.message };
      });
      return {
        error: true,
        messageArray,
        rawData,
        message: "Enter valid values in above fields.",
      };
    }
    console.log(error);

    return {
      error: true,
      message: "Failed posting the internship. Try again later.",
      rawData,
    };
  }
}
