
"use server"
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import StudentProfile from "@/lib/models/studentProfile-model";
import { revalidatePath } from "next/cache";


export default async function handleBlockStudentAction(studentId, isBlocked) {
  try {
    //get session and verify the role as student
    const session = await auth();
    if (session.user.role !== "admin") {
      return { error: "Unauthorized" };
    }

    await dbConnect()
    const student = await StudentProfile.findOne({ student_id: studentId });
    if (!student) {
      return { error: "Student not found" };
    }

    student.isBlocked = isBlocked;
    await student.save();

    revalidatePath("/admin/students");

    return { success: true };

  } catch (error) {
    console.log(error);
    return { error: "An error occurred while processing the request" };

  }
}