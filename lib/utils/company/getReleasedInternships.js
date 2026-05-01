import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Internship from "@/lib/models/internship-model";
import mongoose from "mongoose";

export default async function getReleasedInternships() {
  try {
    const session = await auth();
    console.log(session);
    if (session?.user?.role !== "company") {
      return { error: "Not logged in as company." };
    }

    await dbConnect();
    const companyId = session.user.userId;

    // aggregate() method is used to execute MongoDB's aggregation pipeline,
    // which processes documents in sequential stages to perform
    // advanced data transformations, filtering, and analysis
    // the query t aggregate() is a array of stages, each stage takes input form previous one and passes the output
    //
    // pipeline stages:
    // $match -> like find()
    // $lookup -> like join in mysql, dont need to have reference
    //$addFields → includes all existing fields, adds new fields, overwrites existing ones
    ////    $project  → shape the final output
    //

    const internships = await Internship.aggregate([
      { $match: { company_id: new mongoose.Types.ObjectId(companyId) } },
      //after this stage we have list of internships of the company

      {
        $lookup: {
          from: "applications", ////which document to jooin, collectiion name not schema
          localField: "_id", //which field of this document to compare
          foreignField: "internship_id", //which field of other document to compare
          as: "applications", // what will be the name of the joined document
        },
      },
      //after this we have array of  all the appications of this internship stored as applications
      {
        $addFields: {
          totalApplications: { $size: "$applications" },
          acceptedCount: {
            $size: {
              $filter: {
                input: "$applications", //the array
                as: "application", //name of each item in that array
                cond: { $eq: ["$$application.status", "accepted"] }, //here $$ is uesed for the varible in pipeline. as $ denotes field of current document
              },
            },
          },
          rejectedCount: {
            $size: {
              $filter: {
                input: "$applications", //the array
                as: "application", //name of each item in that array
                cond: { $eq: ["$$application.status", "rejected"] }, //here $$ is uesed for the varible in pipeline. as $ denotes field of current document
              },
            },
          },
        },
      },
      //sort by the descending of created at to get latest
      { $sort: { createdAt: -1 } },

      //the values to send
      {
        $project: {
          title: 1,
          type: 1,
          createdAt: 1,
          isClosed: 1,
          required_skills: 1,
          totalApplications: 1,
          acceptedCount: 1,
          rejectedCount: 1,
        },
      },
    ]);

    return internships;
  } catch (error) {
    console.log(error);

    return { error: "Failed to get released internhsips." };
  }
}
