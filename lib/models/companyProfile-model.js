import pkg from "mongoose";
const { Schema, model, models } = pkg;

const locationSchema = new Schema({
  street_address: String,
  city: String,
  province: String,
  country: String,
});
const contactSchema = new Schema({
  number: String,
  email: { type: String, required: true, unique: true },
});

const socialLinksSchema = new Schema({
  linkedin: String,
  x: String,
  facebook: String,
});
const companyProfileSchema = new Schema({
  company_id: { type: Schema.Types.ObjectId, index: true, ref: "User" },
  name: { type: String, required: true },
  logo: {
    type: String,
    default:
      "https://pub-4e224a60371345f9994eb80b6f5ef710.r2.dev/default_company_logo.jpg",
  },
  website: String,
  industry: String,
  company_size: String,
  about_company: String,
  isPendingApproval: { type: Boolean, default: true },
  location: { type: locationSchema },
  contact: { type: contactSchema },
  social_links: { type: socialLinksSchema },
});

//delete models.CompanyProfile;
const CompanyProfile =
  models?.CompanyProfile || model("CompanyProfile", companyProfileSchema);
export default CompanyProfile;
