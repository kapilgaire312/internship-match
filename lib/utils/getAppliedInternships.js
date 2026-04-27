import mongoose from "mongoose";
import { auth } from "../auth";
import dbConnect from "../dbConnect";
import Application from "../models/application-model";
import Sector from "../models/sector-model";

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
          as: "internship_id",
        },
      },
      { $unwind: "$internship_id" },
      { $match: searchQuery },
    ];

    const applications = await Application.aggregate(query);
    if (!applications || applications.length === 0)
      return { error: "No applied internships found." };
    return applications;
  } catch (error) {
    console.log(error);
    return { error: "Failed getting applied internships." };
  }
}

async function getQuery(search) {
  //find the matching sectors
  const sectors = await Sector.find({
    name: { $regex: search, $options: "i" },
  });

  //find ids of matchinfg sectors
  const sectorIds = sectors.map((item) => item._id);

  //make query
  const query = {};
  query.$or = [
    { "internship_id.title": { $regex: search, $options: "i" } },
    { "internship_id.required_skills": { $regex: search, $options: "i" } }, //mongodb will compare each elements of the array aafai.
    { "internship_id.sector": { $in: sectorIds } },
  ];
  return query;
}
