import Property from "../models/Property.js";

export const addProperty = async (req, res) => {
  try {
    const body = req.body;

    const newProperty = await Property.create({
      ...body,
      owner: req.user._id,
    });

    res.json({ message: "Property Added", property: newProperty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProperties = async (req, res) => {
  const props = await Property.find().populate("owner", "name email");
  res.json(props);
};

export const getPropertyById = async (req, res) => {
  const p = await Property.findById(req.params.id).populate("owner", "name email");
  res.json(p);
};

export const deleteProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: "Property Deleted" });
};
