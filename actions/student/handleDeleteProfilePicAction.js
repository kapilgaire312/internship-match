"use server";
import { auth } from "@/lib/auth";
import StudentProfile from "@/lib/models/studentProfile-model";
import { revalidatePath } from "next/cache";

export default async function handleDeleteProfilePicAction() {
  try {
    const session = await auth();

    if (session?.user.role !== "student")
      return { error: "Not logged in as student!" };

    const studentId = session.user.userId;

    const student = await StudentProfile.findOne({ student_id: studentId });

    if (!student) return { error: "Not logged in as student!" };

    student.set("profile_pic", undefined); //same as using unset in update()
    await student.save();
    revalidatePath("/student/profile");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete the profile pic." };
  }
}
