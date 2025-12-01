import Complaint from "../models/Complaint.js";
import Property from "../models/propertyModel.js";

export const addComplaint = async (req, res) => {
  try {
    const { propertyId, type, description } = req.body;
    if (!propertyId || !type) return res.status(400).json({ success: false, message: "Missing required fields" });
    const prop = await Property.findById(propertyId).select("ownerId tenants");
    if (!prop) return res.status(404).json({ success: false, message: "Property not found" });
    const admitted = prop.tenants.some(t => String(t.userId) === String(req.user.id) && t.status === "admitted");
    if (!admitted) return res.status(403).json({ success: false, message: "Not admitted for this property" });
    const c = await Complaint.create({ propertyId, userId: req.user.id, type, description });
    return res.json({ success: true, complaint: c });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const listMyComplaints = async (req, res) => {
  try {
    const items = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.json({ success: true, complaints: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const listOwnerComplaints = async (req, res) => {
  try {
    const props = await Property.find({ ownerId: req.user.id }).select("_id");
    const ids = props.map(p => p._id);
    const items = await Complaint.find({ propertyId: { $in: ids } }).sort({ createdAt: -1 }).populate("userId", "fullName email phone").populate("propertyId", "name location");
    return res.json({ success: true, complaints: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const resolveComplaint = async (req, res) => {
  try {
    const c = await Complaint.findById(req.params.id);
    if (!c) return res.status(404).json({ success: false, message: "Complaint not found" });
    const prop = await Property.findById(c.propertyId).select("ownerId");
    if (!prop || String(prop.ownerId) !== String(req.user.id)) return res.status(403).json({ success: false, message: "Not authorized" });
    c.status = "Resolved";
    await c.save();
    return res.json({ success: true, complaint: c });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

