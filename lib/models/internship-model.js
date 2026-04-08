import pkg from "mongoose";
const { Schema, model, models } = pkg;

const parsed_skills = new Schema({
  skill: String,
  weight: Number,
});
const internshipSchema = new Schema({
  title: { type: String },
  company_id: { type: Schema.Types.ObjectId, ref: "User" },
  company_name: { type: String },
  company_logo: String,
  company_location: { type: String },
  type: {
    type: String,
    default: "remote",
    enum: ["remote", "on-site", "hybrid"],
  },

  salary: Number,
  sector: [{ type: Schema.Types.ObjectId, ref: "Sector" }],
  required_skills: [String],
  parsed_required_skills: [parsed_skills],
  job_description: String,
  eligibility: String,
  responsibilities: String, //what students wull be doing
  openings: Number,
  level: {
    type: String,
    default: "Beginner",
    enum: ["Beginner", "Medium", "Experienced"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isClosed: Boolean,
  application_date: Date, //when the application closes
});
//delete models.internshipSchema;
internshipSchema.index({ company_id: 1 });

const Internship = models?.Internship || model("Internship", internshipSchema);
export default Internship;
