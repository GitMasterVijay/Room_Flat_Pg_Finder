import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  description: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ["PG", "Flat", "Hostel", "Room"], required: true },
  propertyName: { type: String },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
