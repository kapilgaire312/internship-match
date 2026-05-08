import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Application from "@/lib/models/application-model";
import Internship from "@/lib/models/internship-model";
import mongoose from "mongoose";

export default async function getDashboardData(filter) {
  try {
    const filterOptions = new Map([
      ["3m", 3],
      ["6m", 6],
      ["all", ""],
    ]);
    let filterValue = 1;
    if (filterOptions.has(filter)) filterValue = filterOptions.get(filter);

    const filterDate = new Date();
    filterDate.setMonth(filterDate.getMonth() - filterValue);
    console.log(filterDate);

    const session = await auth();
    if (session?.user?.role !== "company") {
      return { error: "Login as company to view your dashboard." };
    }
    const companyId = session.user.userId;

    if (!companyId)
      return { error: "Login as company to view your dashboard." };

    await dbConnect();

    let data = await Internship.aggregate([
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
            { $match: { "applications.applied_date": { $gte: filterDate } } },

            {
              $group: {
                _id: "$applications.status",
                count: { $count: {} },
              },
            },
          ],
          totalApplicationsforOpen: [
            { $match: { isClosed: false } },
            {
              $project: {
                total_applications_count: 1,
              },
            },
          ],
          internshipData: [
            {
              $match: {
                createdAt: { $gte: filterDate },
              },
            },
            {
              $sort: {
                total_applications_count: -1,
              },
            },

            { $limit: 5 },
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $project: {
                _id: 0,
                title: 1,
                total_applications_count: 1,
              },
            },
          ],
        },
      },
    ]);

    const applicationData = await Application.aggregate([
      {
        $match: {
          company_id: new mongoose.Types.ObjectId(companyId), ///search the appliations of the company
          // applied_date: { $gte: filterDate }, // get applciations within the filter period
        },
      },

      {
        $facet: {
          applicationStatus: [
            {
              $group: {
                // group and get count of applications based on status: pending, accepted, rejecte
                _id: "$status",
                count: { $count: {} },
              },
            },
          ],

          applicantInfo: [
            // here we will get the top 5 latest applications
            {
              $sort: {
                //sort by descending in applied date
                applied_date: -1,
              },
            },

            { $limit: 5 }, //get the top 5

            //join with student profile to get the student info

            {
              $lookup: {
                from: "studentprofiles",
                localField: "student_id",
                foreignField: "student_id",
                as: "student",
              },
            },
            //join internship to get internship name

            {
              $lookup: {
                from: "internships",
                localField: "internship_id",
                foreignField: "internship_id",
                as: "internship",
              },
            },

            //return the necessary data
            {
              $project: {
                name: "$student.name",
              },
            },
          ],
        },
      },
    ]);

    console.log("appdata", JSON.stringify(applicationData, null, 2));

    data = data[0];

    const cleanedData = {
      closedInternshipsCount: 0,
      openInternshipsCount: 0,
      shortlistedCount: 0,
      pendingCount: 0,
      rejectedCount: 0,
      AverageOpenApplicationsCount: 0,
    };

    data.internshipStatus?.map((item) => {
      if (item._id) cleanedData.closedInternshipsCount = item.count;
      if (!item._id) cleanedData.openInternshipsCount = item.count || 0;
    });

    data.applicationStatus?.map((item) => {
      if (item._id === "accepted") cleanedData.shortlistedCount = item.count;
      if (item._id === "pending") cleanedData.pendingCount = item.count;
      if (item._id === "rejected") cleanedData.rejectedCount = item.count;
    });

    let totalOpenApplications = 0;
    data.totalApplicationsforOpen.map((item) => {
      totalOpenApplications += item.total_applications_count;
    });

    if (cleanedData.openInternshipsCount !== 0)
      cleanedData.AverageOpenApplicationsCount = Math.round(
        totalOpenApplications / cleanedData.openInternshipsCount,
      );
    cleanedData.internshipData = data.internshipData;

    console.log("yoho");
    console.log("datais", cleanedData);
    return cleanedData;
  } catch (error) {
    console.log(error);
  }
}
