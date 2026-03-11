import dbConnect from "../dbConnect";
import Internship from "../models/internship-model";

export async function filterInternshipsBySector(sectors) {
  try {
    dbConnect();
    const internships = await Internship.find({ sector: { $in: sectors } }); //finding by the index

    console.log("internshipsSector", internships);
    console.log(typeof internships);
    return internships;
  } catch (error) {}
}
