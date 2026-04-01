import { auth } from "../auth";
import dbConnect from "../dbConnect";
import Application from "../models/application-model";

export default async function getAppliedInternships() {
  try {
    const session = await auth();

    await dbConnect();

    if (session?.user?.role !== "student") {
      return { error: "not logged in!" };
    }
    const studentId = session.user.userId;

    const applications = await Application.find({
      student_id: studentId,
    })
      .populate(
        "internship_id",
        "title company_name company_logo company_location type salary isClosed",
      )
      .sort({
        applied_date: -1, // descending
      });

    console.log("appliacitonsare", applications);
    return applications;
  } catch (error) {
    console.log(error);
  }
}
