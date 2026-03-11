import pkg from "mongoose";
const { Schema, model, models } = pkg;

const internshipSchema = new Schema({
  title: { type: String },
  company_id: { type: Schema.Types.ObjectId, ref: "CompanyProfile" },
  company_name: { type: String },
  company_logo: String,
  company_location: { type: String },
  isRemote: { type: Boolean },
  intern_period: String,
  salary: Number,
  sector: { type: [String], index: true },
  required_skills: [String],
  parsed_required_skills: [String],
});

const Internship = models?.Internship || model("Internship", internshipSchema);
export default Internship;
