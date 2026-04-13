import mongoose from "mongoose";
import dotEnv from "dotenv";

dotEnv.config();

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log("Mongo URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI); // no options needed in Mongoose 6+
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDB;
