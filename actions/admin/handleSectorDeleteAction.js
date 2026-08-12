"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Sector from "@/lib/models/sector-model";
import { revalidatePath } from "next/cache";

export default async function handleSectorDeleteAction(sectorId) {
  //check user role
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin")
      return { error: "Unauthorized!" };

    await dbConnect();

    const deletedSector = await Sector.findByIdAndDelete(sectorId);

    if (!deletedSector) {
      return { error: "Sector doesn't exist." };
    }
    revalidatePath("/admin/sectors");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Failed to delete the sector." };
  }
}
