import pkg from "mongoose";
const { Schema, model, models } = pkg;

const resumeDetailsSchema = new Schema(
  {
    file_name: String,
    file_size: Number, //bytes
    file_key: String,
    parse_status: String,
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
  profile_pic: {
    type: String,
    default:
      "https://pub-4e224a60371345f9994eb80b6f5ef710.r2.dev/profile-pics_default_profile_pic.jpg",
  },
  sector: [{ type: Schema.Types.ObjectId, ref: "Sector" }],
  skills: [String],
  parsed_skills: [String],
  resume_details: { type: resumeDetailsSchema },
});

studentProfileSchema.index({ student_id: 1 });

// delete models.StudentProfile;
const StudentProfile =
  models?.StudentProfile || model("StudentProfile", studentProfileSchema);
export default StudentProfile;
