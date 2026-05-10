import { auth } from "@/lib/auth";
import User from "@/lib/models/user-model";
import dbConnect from "@/lib/dbConnect";

export default async function getStudents(search) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") return { error: "Access Denied!" };

    await dbConnect();

    const query = {};

    if (search && search.length !== 0)
      query.$or = [
        { email: { $regex: search, $options: "i" } },
        { "student.name": { $regex: search, $options: "i" } },
      ];

    const pipeline = [
      { $match: { role: "student" } },
      {
        $lookup: {
          from: "studentprofiles",
          localField: "_id",
          foreignField: "student_id",
          as: "student",
        },
      },
      { $unwind: "$student" },
    ];

    if (search && search.length !== 0) pipeline.push({ $match: query });
    console.log(pipeline);

    pipeline.push({ $sort: { "student.name": 1 } });

    const projectStage = {
      $project: {
        name: "$student.name",
        email: 1,
        isBlocked: "$student.isBlocked",
      },
    };
    pipeline.push(projectStage);

    const students = await User.aggregate(pipeline);
    console.log("studentsare", students);
    return students;
  } catch (error) {
    console.log(error);
    return { error: "Failed getting student records" };
  }
}
