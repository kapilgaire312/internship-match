import pkg from "mongoose";
const { Schema, model, models } = pkg;

const applicationSchema = Schema({
  student_id: { type: Schema.Types.ObjectId, ref: "User" },
  internship_id: { type: Schema.Types.ObjectId, ref: "Internship" },
  match_score: { type: Number },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const Application =
  models?.Application || model("Application", applicationSchema);
export default Application;
