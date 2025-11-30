import Feedback from "../models/Feedback.js";

export const addFeedback = async (req, res) => {
  try {
    const { description, name, location, type, propertyName } = req.body;
    if (!description || !name || !location || !type) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const item = await Feedback.create({ description, name, location, type, propertyName });
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
