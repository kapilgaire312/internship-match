import pkg from "mongoose";
const { Schema, model, models } = pkg;
const companyProfileSchema = new Schema({
  company_id: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  logo: { type: String },
  website: [String],
  industry: String,
});

const CompanyProfile =
  models?.CompanyProfile || model("CompanyProfile", companyProfileSchema);
export default CompanyProfile;
