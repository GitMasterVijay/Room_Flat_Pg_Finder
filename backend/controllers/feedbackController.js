import Feedback from "../models/Feedback.js";
import User from "../models/User.js";

export const addFeedback = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "user") {
      return res.status(403).json({ success: false, message: "Only users can submit feedback" });
    }
    const { description, propertyId } = req.body;
    if (!description || !propertyId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const me = await User.findById(req.user.id).select("fullName");
    const property = await (await import("../models/propertyModel.js")).default.findById(propertyId).select("name type location tenants");
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }
    const admitted = (property.tenants || []).some((t) => String(t.userId) === String(req.user.id) && t.status === "admitted");
    if (!admitted) {
      return res.status(403).json({ success: false, message: "Only admitted users can submit feedback for this property" });
    }

    const item = await Feedback.create({
      description,
      name: me?.fullName || "User",
      location: property.location,
      type: property.type,
      propertyName: property.name,
      propertyId: property._id,
    });
    return res.json({ success: true, feedback: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const listFeedback = async (_req, res) => {
  try {
    const items = await Feedback.find().sort({ createdAt: -1 }).limit(100);
    return res.json({ success: true, feedback: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
