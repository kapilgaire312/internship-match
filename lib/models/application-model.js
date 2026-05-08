import pkg from "mongoose";
const { Schema, model, models } = pkg;

const applicationSchema = Schema({
  student_id: { type: Schema.Types.ObjectId, ref: "User" },
  internship_id: { type: Schema.Types.ObjectId, ref: "Internship" },
  company_id: { type: Schema.Types.ObjectId, ref: "User" },

  match_score: { type: Number },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  applied_date: {
    type: Date,
    default: Date.now,
  },
  matched_skills: [String],
});

applicationSchema.index(
  { student_id: 1, internship_id: 1, company_id: 1 },
  { unique: true },
); ///prevents duplicate values
//delete models.Application;
const Application =
  models?.Application || model("Application", applicationSchema);
export default Application;
