import mongoose from "mongoose";
let isConnected = false;
export default function dbConnect() {
  try {
    mongoose.connect(process.env.db_atlas_uri);
    console.log("connected to DB.");
    isConnected = true;
  } catch (error) {
    console.log("Db connection failed", error.message);
  }
}
