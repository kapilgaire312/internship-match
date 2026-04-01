import CustomError from "@/utils/CustomError";
import Internship from "../models/internship-model";
import { filterInternshipsBySector } from "./filterInternshipsBySector";
import { getStudentFromSession } from "./getStudentFromSession";
import Sector from "../models/sector-model";
import getQuery from "./getQuery";
export async function getSuggestedInternships(search) {
  //if student is logged in, then filter based on their sectors

  //else show list of internships.

  try {
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
      const query = await getQuery(search);
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
