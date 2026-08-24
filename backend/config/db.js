import mongoose from "mongoose";

let isConnecting = false;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  if (isConnecting) return;

  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/room_finder";
  try {
    isConnecting = true;
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
  } finally {
    isConnecting = false;
  }
};

export default connectDB;
