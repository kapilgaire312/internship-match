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
      {
        $lookup: {
          from: "companyprofiles",
          localField: "internship.company_id",
          foreignField: "company_id",
          as: "company",
        },
      },
      { $unwind: "$company" },
      {
        $addFields: {
          "internship.company_logo": "$company.logo",
          "internship.company_location": "$company.location.city",

          "internship.company_name": "$company.name",
        },
      },
      { $unset: "company" },
      { $sort: { applied_date: -1 } },
    ];

    if (search) {
      const searchQuery = await getQuery(search);
      query.push({ $match: searchQuery });
    }

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
    { "internship.title": { $regex: search, $options: "i" } },
    { "internship.required_skills": { $regex: search, $options: "i" } }, //mongodb will compare each elements of the array aafai.
    { "internship.sector": { $in: sectorIds } },
  ];
  return query;
}
