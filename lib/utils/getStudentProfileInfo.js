import { auth } from "../auth";
import dbConnect from "../dbConnect";
import StudentProfile from "../models/studentProfile-model";
import getAllSectors from "./getAllSectors";
import { getProfilePicUrl } from "./getProfilePicUrl";

export default async function getStudentProfileInfo() {
  try {
    const session = await auth();
    await dbConnect();

    let student;
    if (session?.user?.role === "student") {
      student = await StudentProfile.findOne({
        student_id: session.user.userId,
      })
        .populate("sector")
        .lean();
    }
    if (!student) {
      return null;
    }

    const profilePicLink = await getProfilePicUrl(student.profile_pic);

    const basicInfo = {
      name: student.name,
      profile_pic: profilePicLink,
      email: session?.user?.email,
      university: student.university || "",
      major: student.major || "",
      batch_year: student.batch_year || "",
      address: student.address || "",
    };
    const currentSkills = student.skills;
    const studentSectors = student.sector;
    const studentResumeDetails = student.resume_details;

    const currentSectors = studentSectors.map((item) => ({
      _id: item._id.toString(),
      name: item.name,
    }));

    const allSectors = await getAllSectors();

    return {
      basicInfo,
      currentSectors,
      allSectors,
      currentSkills,
      studentResumeDetails,
    };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}
