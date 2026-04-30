import { z } from "zod";
export const basicInfoSchema = z.object({
  name: z
    .string("Must be a string.")
    .min(2, "Enter a valid name.")
    .max(100, "Enter a valid name."),
  industry: z.string("Must be a string.").min(2, "Enter a valid industry."),
  website: z.string("Must be a string.").optional(),
  companySize: z.enum(["1-10", "10-50", "50-200", "200+"]),
  aboutCompany: z
    .string("Must be a string.")
    .min(150, "Should be atleast 150 chars."),
});

export const locationContactSchema = z.object({
  streetAddress: z
    .string("Must be a string.")
    .min(3, "Enter a valid address.")
    .max(100, "Enter a valid address."),
  city: z
    .string("Must be a string.")
    .min(3, "Enter a valid city.")
    .max(100, "Enter a valid city."),
  province: z
    .string("Must be a string.")
    .min(3, "Enter a valid province.")
    .max(100, "Enter a valid province."),
  country: z
    .string("Must be a string.")
    .min(3, "Enter a valid country.")
    .max(100, "Enter a valid country."),
  contactNumber: z
    .string("Must be a string.")
    .min(10, "Enter a valid number.")
    .max(14, "Enter a valid number."),
  contactEmail: z
    .string("Must be a string.")
    .email("Enter a valid email address."),
});

export const socialLinksSchema = z.object({
  linkedin: z.string().min(4).max(100),
  x: z.string().optional(),
  facebook: z.string().optional(),
});
