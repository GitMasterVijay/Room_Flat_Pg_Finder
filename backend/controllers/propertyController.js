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
      amenities
    } = req.body;

    const imagePaths = req.files.map(file => file.filename);

    const newProperty = await Property.create({
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
      amenities: JSON.parse(amenities),
      images: imagePaths,
    });

    return res.json({
      success: true,
      message: "Property added successfully!",
      property: newProperty
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
