"use server";

import dbConnect from "@/lib/dbConnect";
import { getCompanyFromSession } from "@/lib/utils/company/getCompanyFromSession";
import { basicInfoSchema } from "@/lib/utils/company/profile.validation";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export default async function saveBasicInfoAction(prevState, formData) {
  try {
    await dbConnect();
    console.log(formData);
    const company = await getCompanyFromSession();
    if (!company) return { error: "Login to save the profile data." };

    const rawData = {
      name: formData.get("name").trim(),
      industry: formData.get("industry").trim(),
      website: formData.get("website").trim(),
      companySize: formData.get("companySize").trim(),
      aboutCompany: formData.get("aboutCompany").trim(),
    };

    const data = basicInfoSchema.parse(rawData);

    company.name = data.name;
    company.industry = data.industry;
    company.website = data.website;
    company.company_size = data.companySize;
    company.about_company = data.aboutCompany;
    company.save();

    revalidatePath("/company/profile");
    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorArray = JSON.parse(error.message);
      let errors = [];
      console.log(typeof errorArray);
      errorArray.forEach((element) => {
        if (element.path[0] === "companySize")
          errors.push({
            path: "companySize",
            message: "Select a valid option.",
          });
        else errors.push({ path: element.path[0], message: element.message });
      });
      return { error: "Enter valid inputs.", errors };
    }

    console.log(error);
    return { error: "Failed saving the info. Try again." };
  }
}
