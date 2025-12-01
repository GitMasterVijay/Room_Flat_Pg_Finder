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

  gender: { type: String, enum: ["Male", "Female", "Mixed"], default: "Mixed" },
  mapUrl: { type: String },

  images: { type: [String], default: [] },

  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  visits: [{
    name: { type: String, required: true },
    phone: { type: String, required: true },
    time: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "confirmed", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
  }],

  tenants: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["admitted"], default: "admitted" },
    admittedAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

export default mongoose.model("Property", propertySchema);
