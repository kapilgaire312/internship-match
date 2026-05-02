import Internship from "../models/internship-model";
import getQuery from "./getQuery";
import dbConnect from "../dbConnect";
import { auth } from "../auth";
import Application from "../models/application-model";
import StudentProfile from "../models/studentProfile-model";
import getCompanyLogoUrl from "./getCompanyLogoUrl";
export async function getSuggestedInternships(search) {
  //if student is logged in, then filter based on their sectors

  //else show list of internships.

  try {
    await dbConnect();
    let query = [];

    //At first we dont want to show closed internships
    let matchQuery = { isClosed: { $ne: true } };
    if (search && search?.length != 0) {
      //   const internships = await Internship.find({
      //   title: { $regex: search, $options: "i" },   // here $regex means it should contain that word(search) and $options: "i " makes it case insensitive
      //
      //   // });
      //

      //we need to search across titles, skills and sectors.
      //for this we will build a query and use $or-> only one needs to be true to return that document

      //since the title and skills are in same internship model , it is easy.
      //but for sector we will need to find the matching sectors, extract id and then add them in our quey.
      //

      const searchQuery = await getQuery(search);

      //if there is search, the closed internships should be shown, so replace original match query
      matchQuery = searchQuery;
    }
    let sectorFilter = null;

    const session = await auth();
    let student = null;
    let studentId = null;

    if (session?.user?.role === "student") {
      studentId = session.user.userId;
      student = await StudentProfile.findOne({
        student_id: studentId,
      }).lean();
    }

    if (student && student?.sector.length != 0) {
      const count = Internship.countDocuments({
        ...matchQuery,
        sector: { $in: student.sector },
      });

      //if there are internships of the students sectors, then only add the sector filter.

      if (count > 0) sectorFilter = student.sector;
    }

    if (sectorFilter) {
      matchQuery.sector = { $in: sectorFilter };
    }

    //get internships with thf filters
    const internships = await Internship.aggregate([
      { $match: matchQuery },

      //now joing companyProfile to get company info
      {
        $lookup: {
          from: "companyprofiles",
          localField: "company_id",
          foreignField: "company_id",
          as: "company",
        },
      },
      { $unwind: "$company" },

      //add the company data to internsips
      {
        $addFields: {
          company_name: "$company.name",
          company_logo: "$company.logo",
          company_location: "$company.location.city",
        },
      },

      //remove the company
      { $unset: "company" },
      { $sort: { createdAt: -1 } },
    ]);

    //add the isApplied filter if the student is looged in.
    if (student) {
      //get ids of all internships
      const internshipIds = internships.map((internship) => internship._id);

      //
      const applications = await Application.find({
        student_id: studentId,
        internship_id: { $in: internshipIds },
      }).select("internship_id");

      //make a set containing internship ids of applied internships
      const appliedInternships = new Set(
        applications.map((application) => application.internship_id.toString()),
      );

      const internshipsWithAPlliedInfo = internships.map((internship) => {
        const company_logo = getCompanyLogoUrl(internship.company_logo);
        return {
          ...internship,
          isApplied: appliedInternships.has(internship._id.toString()),
          company_logo,
        };
      });
      return internshipsWithAPlliedInfo;
    }
    return internships.map((i) => {
      const company_logo = getCompanyLogoUrl(i.company_logo);
      return { ...i, company_logo };
    });
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}
