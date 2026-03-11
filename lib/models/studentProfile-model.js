import { Schema, model, models } from "mongoose";

const studentProfileSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  university: { type: String },
  profile_pic: { type: String, default: "" },
  cv: { type: String, default: "" },
  sector: { type: [String], index: true },
  skills: [String],
  parsed_skills: { type: [String] },
});

const StudentProfile =
  models?.StudentProfile || model("StudentProfile", studentProfileSchema);
export default StudentProfile;
