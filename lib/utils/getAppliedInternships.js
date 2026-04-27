import mongoose from "mongoose";
import { auth } from "../auth";
import dbConnect from "../dbConnect";
import Application from "../models/application-model";
import getQuery from "./getQuery";

export default async function getAppliedInternships(search) {
  try {
    const session = await auth();

    await dbConnect();

    if (session?.user?.role !== "student") {
      return { error: "Not logged in!" };
    }
    const studentId = session.user.userId;

    if (!search) {
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

      return applications;
    }

    const searchQuery = await getQuery(search);
    const query = [
      { $match: { student_id: new mongoose.Types.ObjectId(studentId) } },
      {
        $lookup: {
          from: "internships",
          localField: "internship_id",
          foreignField: "_id",
          as: "internship",
        },
      },
      { $unwind: "$internship" },
      { $match: searchQuery },
    ];

    const application = await Application
  } catch (error) {
    console.log(error);
    return { error: "Failed getting applied internships." };
  }
}
