import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["Water Problem","Fan Not Working","Light Issue","Room Cleaning","Other"], required: true },
  description: { type: String },
  status: { type: String, enum: ["Pending","Resolved"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);

