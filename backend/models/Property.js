import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    address: String,
    city: String,
    rent: Number,
    images: [String],
    type: { type: String, enum: ["Flat", "Room", "Hostel", "PG"] },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
