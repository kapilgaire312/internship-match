import dbConnect from "../dbConnect";
import Internship from "../models/internship-model";

export async function filterInternshipsBySector(sectorIds) {
  try {
    await dbConnect();

    if (!sectorIds || sectorIds.length === 0) {
      return [];
    }

    const internships = await Internship.find({
      sector: { $in: sectorIds },
    }).lean();
    return internships;
  } catch (error) {}
}
