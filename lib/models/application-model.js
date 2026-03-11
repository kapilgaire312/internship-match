import { Schema, model, models } from "mongoose";

const applicationSchema = Schema({
  student_id: { type: Schema.Types.ObjectId, ref: "User" },
  internship_id: { type: Schema.Types.ObjectId, ref: "Internship" },
  match_score: { type: Number },
  status: {
    type: String,
    enum: ["not-applied", "pending", "approved", "rejected"],
    default: "not-applied",
  },
});

const Application =
  models?.Application || model("Application", applicationSchema);
export default Application;
