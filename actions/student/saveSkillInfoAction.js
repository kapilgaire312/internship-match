"use server";

import dbConnect from "@/lib/dbConnect";
import { getStudentFromSession } from "@/lib/utils/getStudentFromSession";
import { revalidatePath } from "next/cache";

export default async function saveSkillInfoAction(values) {
  try {
    dbConnect();

    const student = await getStudentFromSession();
    if (!student) return { error: "user not logged in" };
    student.skills = values;

    await student.save();
    revalidatePath("/student/profile");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Failed to save skills." };
  }
}
