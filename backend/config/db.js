import mongoose from "mongoose";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/roomfinder";
  let attempts = 0;
  while (true) {
    try {
      await mongoose.connect(uri);
      console.log("MongoDB Connected");
      return;
    } catch (error) {
      attempts += 1;
      console.log("DB Error:", error.message);
      console.log("Retrying DB in 5s (attempt " + attempts + ")");
      await sleep(5000);
    }
  }
};

export default connectDB;
