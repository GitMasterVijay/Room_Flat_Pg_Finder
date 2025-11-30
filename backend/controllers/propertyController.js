import Property from "../models/propertyModel.js";

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
    if (imagePaths.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

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
    property.visits.push({ name, phone, time });
    await property.save();
    return res.json({ success: true, message: "Visit scheduled", visits: property.visits });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
