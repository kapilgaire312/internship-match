import dbConnect from "../dbConnect";
import Internship from "../models/internship-model";

export default async function closeInternship(internshipId) {
  await dbConnect();

  const internship = await Internship.findById(internshipId);
  console.log("internis", internship);

  if (!internship) return;

  if (internship.isClosed) return;

  const applicationDate = new Date(internship.application_date);

  if (applicationDate < Date.now()) {
    console.log("closing");
    internship.isClosed = true;
    await internship.save();
    return;
  }
  return;
}
