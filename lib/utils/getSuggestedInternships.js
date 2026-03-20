import CustomError from "@/utils/CustomError";
import Internship from "../models/internship-model";
import { filterInternshipsBySector } from "./filterInternshipsBySector";
import { getStudentFromSession } from "./getStudentFromSession";
import Sector from "../models/sector-model";
export async function getSuggestedInternships(search) {
  //if student is logged in, then filter based on their sectors

  //else show list of internships.

  try {
    if (search) {
      console.log(search);
      //   const internships = await Internship.find({
      //   title: { $regex: search, $options: "i" },   // here $regex means it should contain that word(search) and $options: "i " makes it case insensitive
      //
      //   // });
      //

      //we need to search across titles, skills and sectors.
      //for this we will build a query and use $or-> only one needs to be true to return that document

      //since the title and skills are in same internship model , it is easy.
      //but for sector we will need to find the matching sectors, extract id and then add them in our quey.

      //find the matching sectors
      const sectors = await Sector.find({
        name: { $regex: search, $options: "i" },
      });

      console.log("sectorsis", sectors);

      //find ids of matchinfg sectors
      const sectorIds = sectors.map((item) => item._id);

      //make query
      const query = {};
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { required_skills: { $regex: search, $options: "i" } }, //mongodb will compare each elements of the array aafai.
        { sector: { $in: sectorIds } },
      ];

      const internships = await Internship.find(query).lean();

      return internships;
    }

    const student = await getStudentFromSession();
    if (!student) {
      throw new CustomError("Student not logged in");
    }

    if (student?.sector.length != 0) {
      const internshipsBySector = await filterInternshipsBySector(
        student.sector,
      );
      return internshipsBySector;
    }
    throw new CustomError("No sectors.");
  } catch (error) {
    if (error instanceof CustomError) {
      const allInternships = await Internship.find({}).lean();
      const availableInternships = allInternships?.filter(
        (item) => !item?.isClosed,
      );
      return availableInternships;
    } else {
      console.log(error);
      return { error: true };
    }
  }
}
