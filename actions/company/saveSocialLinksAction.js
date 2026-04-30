"use server";

import dbConnect from "@/lib/dbConnect";
import { getCompanyFromSession } from "@/lib/utils/company/getCompanyFromSession";
import {
  basicInfoSchema,
  socialLinksSchema,
} from "@/lib/utils/company/profile.validation";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export default async function saveSocialLinksAction(prevState, formData) {
  try {
    await dbConnect();
    console.log(formData);
    const company = await getCompanyFromSession();
    if (!company) return { error: "Login to save the profile data." };

    const rawData = {
      linkedin: formData.get("linkedin").trim(),
      x: formData.get("x").trim(),
      facebook: formData.get("facebook").trim(),
    };

    const data = socialLinksSchema.parse(rawData);

    const socialLinks = {
      linkedin: data.linkedin,
      x: data.x,
      facebook: data.facebook,
    };

    company.social_links = socialLinks;
    company.save();

    revalidatePath("/company/profile");
    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorArray = JSON.parse(error.message);
      let errors = [];
      console.log(typeof errorArray);
      errorArray.forEach((element) => {
        errors.push({
          path: element.path[0],
          message: "Enter a valid profile link.",
        });
      });
      return { error: "Enter a valid profile link.", errors };
    }

    console.log(error);
    return { error: "Failed saving the info. Try again." };
  }
}
