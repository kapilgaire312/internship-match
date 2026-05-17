"use server"

import { auth } from "@/lib/auth"
import dbConnect from "@/lib/dbConnect"
import Application from "@/lib/models/application-model"
import Internship from "@/lib/models/internship-model"
import { revalidatePath } from "next/cache"

export default async function handleDeleteInternshipAction(internshipId) {
  try {
    //check session and admin role
    const session = await auth()
    if (!session || session.user.role !== "admin") {
      return { error: "Unauthorized" }
    }

    //delete internship
    await dbConnect()
    const internship = await Internship.findById(internshipId)
    if (!internship) {
      return { error: "Internship not found" }
    }
    //delete applications of this internship
    const deletedApplications = await Application.deleteMany({ internship_id: internshipId })
    if (deletedApplications.error) {
      return { error: "Failed to delete internship" }
    }
    await internship.deleteOne()

    //send email to company about deletion (for later)


    revalidatePath("/admin/internships")
    return { success: true }

  } catch (error) {
    console.error("Error deleting internship:", error)
    return { error: "Failed to delete internship" }
  }
}