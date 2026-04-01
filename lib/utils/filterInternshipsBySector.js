import { auth } from "../auth";
import dbConnect from "../dbConnect";
import Application from "../models/application-model";
import Internship from "../models/internship-model";

export async function filterInternshipsBySector(sectorIds) {
  try {
    await dbConnect();

    const session = await auth();
    const studentId = session.user.userId;

    if (!sectorIds || sectorIds.length === 0) {
      return [];
    }

    const internships = await Internship.find({
      sector: { $in: sectorIds },
    })
      .sort({
        createdAt: -1, // descending
      })
      .lean();

    const applications = await Application.find({
      student_id: studentId,
    }).select("internship_id");

    const appliedInternshipIds = applications?.map((item) =>
      item.internship_id.toString(),
    );

    const appliedInternshipIdsSet = new Set(appliedInternshipIds);

    console.log(appliedInternshipIds);

    const finalInternships = internships.map((item) => {
      return {
        ...item,
        isApplied: appliedInternshipIdsSet.has(item._id.toString()),
      };
    });

    return finalInternships;
  } catch (error) {
    throw error;
  }
}
