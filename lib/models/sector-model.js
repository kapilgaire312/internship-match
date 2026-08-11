import pkg from "mongoose";
const { Schema, model, models } = pkg;

const sectorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
});

const Sector = models?.Sector || model("Sector", sectorSchema);

export default Sector;
