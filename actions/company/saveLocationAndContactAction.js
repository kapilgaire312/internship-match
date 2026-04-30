"use server";

import dbConnect from "@/lib/dbConnect";
import { getCompanyFromSession } from "@/lib/utils/company/getCompanyFromSession";
import { locationContactSchema } from "@/lib/utils/company/profile.validation";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export default async function saveLocationAndContact(prevState, formData) {
  try {
    await dbConnect();
    console.log(formData);
    const company = await getCompanyFromSession();
    if (!company) return { error: "Login to save the profile data." };

    const rawData = {
      streetAddress: formData.get("streetAddress").trim(),
      city: formData.get("city").trim(),
      province: formData.get("province").trim(),
      country: formData.get("country").trim(),
      contactNumber: formData.get("contactNumber").trim(),
      contactEmail: formData.get("contactEmail").trim(),
    };

    const data = locationContactSchema.parse(rawData);

    const locationInfo = {
      street_address: data.streetAddress,
      city: data.city,
      province: data.province,
      country: data.country,
    };

    const contactInfo = {
      number: data.contactNumber,
      email: data.contactEmail,
    };

    company.location = locationInfo;
    company.contact = contactInfo;
    company.save();

    revalidatePath("/company/profile");
    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorArray = JSON.parse(error.message);
      let errors = [];
      console.log(typeof errorArray);
      errorArray.forEach((element) => {
        errors.push({ path: element.path[0], message: element.message });
      });
      return { error: "Enter valid inputs.", errors };
    }

    console.log(error);
    return { error: "Failed saving the info. Try again." };
  }
}
