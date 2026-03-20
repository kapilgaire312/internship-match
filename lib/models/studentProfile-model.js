import pkg from "mongoose";
const { Schema, model, models } = pkg;

const resumeDetailsSchema = new Schema(
  {
    file_name: String,
    file_size: Number, //bytes
    file_key: String,
  },
  { _id: false },
);

const studentProfileSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  university: { type: String },
  address: String,
  major: String,
  batch_year: Number,
  profile_pic: { type: String, default: "" },
  sector: [{ type: Schema.Types.ObjectId, ref: "Sector" }],
  skills: [String],
  parsed_skills: { type: [String] },
  resume_details: { type: resumeDetailsSchema },
});

const StudentProfile =
  models?.StudentProfile || model("StudentProfile", studentProfileSchema);
export default StudentProfile;
