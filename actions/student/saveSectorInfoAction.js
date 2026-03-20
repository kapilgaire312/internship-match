"use server";

import dbConnect from "@/lib/dbConnect";
import Sector from "@/lib/models/sector-model";
import { getStudentFromSession } from "@/lib/utils/getStudentFromSession";
import { revalidatePath } from "next/cache";

export default async function saveSectorInfoAction(values) {
  try {
    dbConnect();

    const student = await getStudentFromSession();
    if (!student) return { error: "user not logged in" };

    const ids = values.map((item) => item._id); //get the ids
    const uniqueIdsSet = new Set(ids); //removes teh duplicated ids
    const uniqueIds = [...uniqueIdsSet]; //convert set back to array

    const validIds = await Sector.find({ _id: { $in: uniqueIds } }).select(
      "_id",
    );

    student.sector = validIds;
    await student.save();
    revalidatePath("/student/profile");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Failed to save sectors." };
  }
}
