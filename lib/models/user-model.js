import pkg from "mongoose";
const { Schema, model, models } = pkg;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "student",
    enum: ["student", "company", "admin"],
  },
});

const User = models?.User || model("User", userSchema);
export default User;
