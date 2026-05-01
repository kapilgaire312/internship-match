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
    let query = [];
    let matchQuery = {};
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
      const searchQuery = await getQuery(search);
      matchQuery = searchQuery;
    }

    const student = await getStudentFromSession();
    if (student && student?.sector.length != 0) {
      matchQuery = { ...matchQuery, sector: { $in: student.sector } };
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
