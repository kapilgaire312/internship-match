"use server";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import { getStudentFromSession } from "@/lib/utils/getStudentFromSession";
import { z, ZodError } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  address: z.string().min(1).max(200),
  university: z.string().min(1).max(100),
  major: z.string().min(1).max(100),
  batch_year: z.coerce.number().positive(),
});

export default async function saveBasicInfoAction(prevState, formData) {
  try {
    await dbConnect();
    const student = await getStudentFromSession();
    if (!student) {
      return { error: "student not logged in." };
    }
    console.log("formdatais", formData);
    const rawData = {
      name: formData.get("name").trim(),
      address: formData.get("address").trim(),
      university: formData.get("university").trim(),
      major: formData.get("major").trim(),
      batch_year: formData.get("batch_year").trim(),
    };

    if (rawData.batch_year === "") {
      return { error: "Enter all values." };
    }
    const data = schema.parse(rawData);

    student.name = data.name;
    student.address = data.address;
    student.university = data.university;
    student.major = data.major;
    student.batch_year = data.batch_year;

    await student.save();
    revalidatePath("/student/profile"); ///this upates the basicInfo card

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: "Enter valid inputs for all fields." };
    } else {
      console.log(error);
      return { error: "Failed to save data." };
    }
  }
}
