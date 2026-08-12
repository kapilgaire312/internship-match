"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Sector from "@/lib/models/sector-model";

export default async function handdleSectorDeleteAction(sectorId) {
  //check user role
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin")
      return { error: "Unauthorized!" };

    await dbConnect();

    const deletedSector = Sector.findByIdAndDelete(sectorId);

    if (!deletedSector) {
      return { error: "Secor doesn't exist." };
    }
    revalidatePath("/admin/sectors");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Failed to delete the sector." };
  }
}
