import mongoose from "mongoose";
let isConnected = false;
export default function dbConnect() {
  try {
    const DB_URI = "mongodb://localhost:27017/";

    mongoose.connect(DB_URI);
    // mongoose.connect(process.env.DB_URI);
    console.log("connected to DB.");
    isConnected = true;
  } catch (error) {
    console.log("Db connection failed", error.message);
  }
}
