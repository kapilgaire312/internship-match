import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import StudentProfile from "@/lib/models/studentProfile-model";
import CustomError from "@/utils/CustomError";

export async function getStudentFromSession() {
  //if student is logged in, then filter based on their sectors

  //else show list of internships.

  try {
    const session = await auth();

    await dbConnect();

    if (session?.user?.role === "student") {
      const student = await StudentProfile.findOne({
        student_id: session.user.userId,
      });
      return student;
    }
    return null;
  } catch (error) {
    throw error;
  }
}
