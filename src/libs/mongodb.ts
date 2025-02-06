import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error("Please set URI");
}

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // connected
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Successful connection to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failure: ", error);
  }
};
