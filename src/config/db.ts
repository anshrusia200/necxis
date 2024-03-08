import mongoose from "mongoose";

export const connect = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("No uri provided");
    await mongoose.connect(uri);
    console.log("Mongo connection success");
  } catch (error) {
    throw new Error("Error in connecting to database");
  }
};
