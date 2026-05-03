import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Internship from "@/lib/models/internship-model";
import mongoose from "mongoose";

export default async function getDashboardData() {
  try {
    const session = await auth();
    if (session?.user?.role !== "company") {
      return { error: "Login as company to view your dashboard." };
    }
    const companyId = session.user.userId;

    if (!companyId)
      return { error: "Login as company to view your dashboard." };

    await dbConnect();

    const data = await Internship.aggregate([
      { $match: { company_id: new mongoose.Types.ObjectId(companyId) } },

      //join applications
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "internship_id",
          as: "applications",
        },
      },
      {
        $addFields: {
          total_applications_count: { $size: "$applications" },
        },
      },

      //  { $unwind: "$applications" },
      {
        $facet: {
          internshipStatus: [
            {
              $group: {
                _id: "$isClosed",
                count: { $count: {} },
              },
            },
          ],
          applicationStatus: [
            { $unwind: "$applications" },

            {
              $group: {
                _id: "$applications.status",
                count: { $count: {} },
              },
            },
          ],
          totalApplicationsforOpen: [{ $match: { isClosed: false } }],
          project: [
            {
              $project: {
                total_applications_count: 1,
                internshipStatus: 1,
              },
            },
          ],
        },
      },

      // {
      //   $project: {
      //     closed_internships_count: 1,
      //     total_applications_count: 1,
      //     internshipStatus: 1,
      //   },
      // },
    ]);

    console.log("datais", JSON.stringify(data, null, 2));
  } catch (error) {}
}
