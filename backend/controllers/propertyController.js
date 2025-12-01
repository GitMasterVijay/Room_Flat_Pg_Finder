import Property from "../models/propertyModel.js";
import User from "../models/User.js";

export const addProperty = async (req, res) => {
  try {
    const {
      name,
      type,
      status,
      location,
      price,
      deposit,
      bedrooms,
      bathrooms,
      area,
      floor,
      description,
      amenities,
      gender,
      mapUrl,
    } = req.body;

    if (!name || !type || !location || !price || !deposit || !bedrooms || !bathrooms || !description) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const imagePaths = (req.files || []).map((file) => file.filename);

    const amenitiesArr = Array.isArray(amenities)
      ? amenities
      : amenities
      ? JSON.parse(amenities)
      : [];

    const newProperty = await Property.create({
      name,
      type,
      status,
      location,
      price: Number(price),
      deposit: Number(deposit),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      area,
      floor,
      description,
      amenities: amenitiesArr,
      gender,
      mapUrl,
      images: imagePaths,
      ownerId: req.user.id,
    });

    return res.json({
      success: true,
      message: "Property added successfully!",
      property: newProperty,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const listProperties = async (req, res) => {
  try {
    const { type, location, minPrice, maxPrice } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (location) filter.location = new RegExp(location, "i");
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const properties = await Property.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, properties });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("ownerId", "fullName phone email");
    if (!property) return res.status(404).json({ success: false, message: "Property not found" });
    res.json({ success: true, property });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const listMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, properties });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: "Property not found" });
    if (String(property.ownerId) !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized to update" });
    }

    const update = { ...req.body };
    if (update.amenities && typeof update.amenities === "string") {
      update.amenities = JSON.parse(update.amenities);
    }
    if (update.price !== undefined) update.price = Number(update.price);
    if (update.deposit !== undefined) update.deposit = Number(update.deposit);
    if (update.bedrooms !== undefined) update.bedrooms = Number(update.bedrooms);
    if (update.bathrooms !== undefined) update.bathrooms = Number(update.bathrooms);

    const newFiles = (req.files || []).map((f) => f.filename);
    if (newFiles.length) {
      update.images = [...property.images, ...newFiles];
    }

    const updated = await Property.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, property: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: "Property not found" });
    if (String(property.ownerId) !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized to delete" });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ADD VISIT REQUEST (public)
export const addVisitRequest = async (req, res) => {
  try {
    const { name, phone, time } = req.body;
    if (!name || !phone || !time) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: "Property not found" });
    const userId = req.user?.id || req.body.userId;
    property.visits.push({ name, phone, time, userId, status: "pending" });
    property.markModified("visits");
    await property.save();
    return res.json({ success: true, message: "Visit scheduled", visits: property.visits });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const confirmVisit = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: "Property not found" });
    const v = property.visits.id(req.params.visitId);
    if (!v) return res.status(404).json({ success: false, message: "Visit not found" });
    v.status = "confirmed";
    if (!v.userId) {
      const userMatch = await User.findOne({ phone: v.phone }).select("_id");
      if (userMatch) {
        v.userId = userMatch._id;
      }
    }
    if (v.userId) {
      const exists = property.tenants.find((t) => String(t.userId) === String(v.userId));
      if (!exists) {
        property.tenants.push({ userId: v.userId, status: "admitted" });
        property.markModified("tenants");
      }
    }
    property.markModified("visits");
    await property.save();
    return res.json({ success: true, message: "Visit confirmed", visit: v, tenants: property.tenants });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const rejectVisit = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: "Property not found" });
    const v = property.visits.id(req.params.visitId);
    if (!v) return res.status(404).json({ success: false, message: "Visit not found" });
    v.status = "rejected";
    property.markModified("visits");
    await property.save();
    return res.json({ success: true, message: "Visit rejected", visit: v });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const admitStudent = async (req, res) => {
  try {
    const { userId, visitId } = req.body;
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: "Property not found" });
    if (visitId) {
      const v = property.visits.id(visitId);
      if (v) v.status = "confirmed";
      property.markModified("visits");
    }
    if (!userId) return res.status(400).json({ success: false, message: "Missing userId" });
    const exists = property.tenants.find((t) => String(t.userId) === String(userId));
    if (!exists) {
      property.tenants.push({ userId, status: "admitted" });
      property.markModified("tenants");
    }
    await property.save();
    return res.json({ success: true, message: "Student admitted", tenants: property.tenants });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const listMyAdmissions = async (req, res) => {
  try {
    const me = await User.findById(req.user.id).select("phone");
    const candidates = await Property.find({
      $or: [
        { "tenants.userId": req.user.id },
        { visits: { $elemMatch: { status: "confirmed", $or: [ { userId: req.user.id }, { phone: me?.phone } ] } } },
      ],
    }).select("name location tenants visits");

    const saves = [];
    for (const p of candidates) {
      const hasTenant = p.tenants.some((t) => String(t.userId) === String(req.user.id));
      const hasConfirmedVisit = p.visits.some((v) => v.status === "confirmed" && (String(v.userId) === String(req.user.id) || (me?.phone && v.phone === me.phone)));
      if (hasConfirmedVisit && !hasTenant) {
        p.tenants.push({ userId: req.user.id, status: "admitted" });
        p.markModified("tenants");
        saves.push(p.save());
      }
    }
    if (saves.length) await Promise.all(saves);

    const finalProps = await Property.find({ "tenants.userId": req.user.id }).select("name location tenants");
    return res.json({ success: true, properties: finalProps });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
