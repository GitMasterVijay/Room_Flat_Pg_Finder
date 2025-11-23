import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: "Available" },

  location: { type: String, required: true },
  price: { type: Number, required: true },
  deposit: { type: Number, required: true },

  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: String },
  floor: { type: String },

  description: { type: String, required: true },

  amenities: { type: [String], default: [] },

  images: { type: [String], required: true },

  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Property", propertySchema);
