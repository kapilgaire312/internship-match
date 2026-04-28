import { z } from "zod";

export const newInternshipSchema = z.object({
  internshipTitle: z
    .string("Title must be a string.")
    .min(5, "Enter a valid title.")
    .max(100, "Enter a valid title."),
  monthlySalary: z.coerce
    .number("Salary must be a number")
    .gte(1, "Salary cannot be negative or zero."),
  level: z.enum(
    ["Beginner", "Medium", "Experienced"],
    "Select a valid experience level.",
  ),
  workModel: z.enum(
    ["remote", "on-site", "hybrid"],
    "Select a valid work model.",
  ),
  location: z
    .string("Location must be a string.")
    .min(3, "Enter a valid location.")
    .max(200, "Enter a valid location."),
  openings: z.coerce
    .number("Opeings must be a number")
    .gte(1, "Openings cannot be negative or zero."),
  applicationDeadline: z.iso.datetime("Date is invalid."),

  jobDescription: z
    .string("Description must be a string.")
    .min(100, "Job description must be atleast 100 charcters")
    .max(2500, "Job description must be less than 2500 charcters"),
  eligibility: z
    .string("Eligibility must be a string.")
    .min(20, "Eligibility must be atleast 20 charcters")
    .max(1000, "Eligibility must be less than 1000 charcters"),
  responsibilities: z
    .string("Eligibility must be a string.")
    .min(20, "This field must be atleast 20 charcters")
    .max(1500, "This field must be less than 1500 charcters"),
  sectorId: z.string("Select a sector.").min(1, "Select a sector."),
  requiredSkills: z
    .array(
      z
        .string("Skills should be a string")
        .min(3, "Enter a valid skill.")
        .max(100, "Enter a valid skill."),
      "",
    )
    .min(1, "Add atleast one required skills."),
});
