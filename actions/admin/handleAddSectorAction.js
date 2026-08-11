"use server";

import { auth } from "@/lib/auth";
import Sector from "@/lib/models/sector-model";

export default async function handleAddSectorAction(prevState, formData) {
  try {
    //check role
    const session = await auth();

    if (!session || session?.user?.role !== "admin") {
      return "Not allowed!";
    }
    const sector = formData.get("sector").trim().toLowerCase();

    if (!sector || sector.length < 3) {
      return { error: "Sector name must be at least 3 characters long." };
    }

    //check if sector already exists
    const existingSector = await Sector.findOne({ name: sector });
    console.log(existingSector);

    if (existingSector) {
      return { error: "Sector already exists." };
    }

    //create new sector
    const newSector = new Sector({ name: sector });
    await newSector.save();

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred while processing the request" };
  }
}
