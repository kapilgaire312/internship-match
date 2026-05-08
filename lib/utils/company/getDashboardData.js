import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Application from "@/lib/models/application-model";
import Internship from "@/lib/models/internship-model";
import mongoose from "mongoose";
import { getProfilePicUrl } from "../getProfilePicUrl";

export default async function getDashboardData(filter) {
  try {
    const filterOptions = new Map([
      ["1m", 1],
      ["3m", 3],
      ["6m", 6],
      ["all", "all"],
    ]);
    let filterValue = 1;
    if (filterOptions.has(filter)) filterValue = filterOptions.get(filter);

    const filterDate = new Date();
    filterDate.setMonth(filterDate.getMonth() - filterValue);

    const session = await auth();
    if (session?.user?.role !== "company") {
      return { error: "Login as company to view your dashboard." };
    }
    const companyId = session.user.userId;

    if (!companyId)
      return { error: "Login as company to view your dashboard." };

    await dbConnect();

    let internshipFacetStage = {
      $facet: {
        internshipStatus: [
          {
            $group: {
              _id: "$isClosed",
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
    };
    if (filterValue !== "all") {
      internshipFacetStage.$facet.internshipData.unshift({
        $match: { createdAt: { $gte: filterDate } },
      });
    }

    let internshipPipeline = [
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
      internshipFacetStage,
    ];
    let data = await Internship.aggregate(internshipPipeline);

    const applicationFacetStage = {
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
              foreignField: "_id",
              as: "internship",
            },
          },

          { $unwind: "$student" },
          { $unwind: "$internship" },

          //return the necessary data
          {
            $project: {
              name: "$student.name",
              university: "$student.university",
              major: "$student.major",

              batch_year: "$student.batch_year",
              matched_skills: 1,
              profile_pic: "$student.profile_pic",
              internshipTitle: "$internship.title",
              internship_id: 1,
            },
          },
        ],
      },
    };

    const applicationMatchStage = {
      $match: {
        company_id: new mongoose.Types.ObjectId(companyId), ///search the appliations of the company
      },
    };

    if (filterValue !== "all") {
      applicationMatchStage.$match.applied_date = {
        $gte: filterDate,
      }; /// get applciations within the filter period
    }

    const applicationPipeline = [applicationMatchStage, applicationFacetStage];

    let applicationData = await Application.aggregate(applicationPipeline);

    data = data[0];
    applicationData = applicationData[0];

    const cleanedData = {
      closedInternshipsCount: 0,
      openInternshipsCount: 0,
      totalInternshipsCount: 0,
      totalApplicationsCount: 0,
      shortlistedCount: 0,
      pendingCount: 0,
      rejectedCount: 0,
      AverageOpenApplicationsCount: 0,
    };

    data.internshipStatus?.map((item) => {
      if (item._id) cleanedData.closedInternshipsCount = item.count;
      if (!item._id) cleanedData.openInternshipsCount = item.count || 0;
    });

    applicationData.applicationStatus?.map((item) => {
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

    //generate profile pic url
    const applicantsInfo = await Promise.all(
      applicationData.applicantInfo.map(async (item) => {
        const profilePicUrl = await getProfilePicUrl(item.profile_pic);

        return {
          ...item,
          profile_pic: profilePicUrl,
          _id: item._id.toString(),
          internship_id: item.internship_id.toString(),
        };
      }),
    );

    cleanedData.applicantsInfo = applicantsInfo;
    cleanedData.totalInternshipsCount =
      cleanedData.openInternshipsCount + cleanedData.closedInternshipsCount;

    let totalApplicationsCount = 0;
    applicationData.applicationStatus?.map((item) => {
      totalApplicationsCount += item.count;
    });

    cleanedData.totalApplicationsCount = totalApplicationsCount;

    return cleanedData;
  } catch (error) {
    console.log(error);
    return { error: "Failed to get dashboard data." };
  }
}
