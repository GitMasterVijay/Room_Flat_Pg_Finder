import React, { useState } from "react";
import { FaUpload, FaTrash, FaCheckCircle, FaRupeeSign, FaBed, FaToilet, FaRulerCombined, FaLayerGroup, FaPlus, FaExclamationCircle, FaClipboardCheck, FaCar, FaWifi, FaIceCream, FaCoffee, FaConciergeBell, FaShower, FaHome } from "react-icons/fa";

// List of common amenities
const AMENITY_OPTIONS = [
    { name: "WiFi", icon: FaWifi, color: "text-blue-500" },
    { name: "AC", icon: FaIceCream, color: "text-sky-500" },
    { name: "Gym", icon: FaHome, color: "text-green-500" },
    { name: "Parking", icon: FaCar, color: "text-yellow-600" },
    { name: "Laundry", icon: FaShower, color: "text-purple-500" },
    { name: "Meals", icon: FaCoffee, color: "text-orange-500" },
    { name: "Security", icon: FaConciergeBell, color: "text-red-500" },
];

export default function AddProperty() {
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        type: "Flat",
        status: "Available",
        location: "",
        price: "",
        deposit: "",
        bedrooms: 1,
        bathrooms: 1,
        area: "",
        floor: "Ground",
        description: "",
    });
    // NEW STATE: Amenities array
    const [amenities, setAmenities] = useState([]);
    // State to hold validation errors
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear the error for this field immediately when the user starts typing
        setFormErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleAmenityToggle = (amenityName) => {
        setAmenities(prev =>
            prev.includes(amenityName)
                ? prev.filter(a => a !== amenityName) // Remove
                : [...prev, amenityName] // Add
        );
    };

    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files).slice(0, 5 - images.length);
        setImages((prev) => [...prev, ...newFiles]);
    };

    const handleDeleteImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        // 1. Required Text/Select Fields
        if (!formData.name.trim()) { errors.name = "Property name is required."; isValid = false; }
        if (!formData.location.trim()) { errors.location = "Location is required."; isValid = false; }
        if (!formData.description.trim()) { errors.description = "Description is required."; isValid = false; }

        // 2. Price/Deposit (Must be a positive number)
        if (parseFloat(formData.price) <= 0 || !formData.price) { errors.price = "Price must be a positive amount."; isValid = false; }
        if (parseFloat(formData.deposit) < 0 || !formData.deposit) { errors.deposit = "Deposit amount is required (0 if none)."; isValid = false; }

        // 3. Minimum Unit Counts
        if (parseInt(formData.bedrooms) < 1) { errors.bedrooms = "Must have at least 1 bedroom/unit."; isValid = false; }
        if (parseInt(formData.bathrooms) < 1) { errors.bathrooms = "Must have at least 1 bathroom."; isValid = false; }

        // 4. Image Validation
        if (images.length === 0) { errors.images = "At least one image is required for the listing."; isValid = false; }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // If validation passes, proceed with submission
            console.log("Submitting Property:", { ...formData, amenities }); // Include amenities in submission
            console.log("Images:", images);
            alert("Property Listing Submitted Successfully!");
            // Reset form here if submission was successful
        } else {
            console.log("Validation failed.");
            alert("Please fix the validation errors before submitting.");
        }
    };

    // Helper component to display errors
    const ErrorMessage = ({ message }) => (
        <p className="flex items-center mt-1 text-sm font-medium text-red-600">
            <FaExclamationCircle className="w-4 h-4 mr-1" /> {message}
        </p>
    );

    return (
        <div className="p-4 md:p-8 min-h-screen bg-gray-50 text-gray-900 sm:p-8 relative overflow-hidden [background-image:linear-gradient(to_bottom,#f4f8ff,#e0e8f3)]">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-indigo-400/50 pb-2 flex items-center gap-3">
                    <FaPlus className="text-indigo-600 w-6 h-6" /> Deploy New Listing
                </h2>

                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-xl p-6 md:p-10 space-y-8 border border-gray-100">

                    {/* 1. CORE PROPERTY DETAILS */}
                    <section>
                        <h3 className="text-2xl font-bold text-indigo-700 mb-4 border-l-4 border-indigo-400 pl-3">Property Identity</h3>
                        <div className="space-y-4">

                            {/* Property Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Listing Title / Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., Spacious 2BHK near Tech Park"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                />
                                {formErrors.name && <ErrorMessage message={formErrors.name} />}
                            </div>

                            {/* Type, Status, Location */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition"
                                    >
                                        <option value="Flat">Flat</option>
                                        <option value="PG">PG (Paying Guest)</option>
                                        <option value="Room">Single Room</option>
                                        <option value="Hostel">Hostel</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Availability Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Not Available">Not Available</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location (City, Area) *</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g., Pune, Hinjewadi"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${formErrors.location ? 'border-red-500' : 'border-gray-300'}`}
                                        required
                                    />
                                    {formErrors.location && <ErrorMessage message={formErrors.location} />}
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* 2. PRICE & LEASE DETAILS */}
                    <section>
                        <h3 className="text-2xl font-bold text-indigo-700 mb-4 border-l-4 border-indigo-400 pl-3">Financials *</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Rent Price (per month) *</label>
                                <div className="relative">
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3 text-indigo-600">
                                        <FaRupeeSign />
                                    </span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="e.g., 15000"
                                        className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${formErrors.price ? 'border-red-500' : 'border-gray-300'}`}
                                        required
                                    />
                                </div>
                                {formErrors.price && <ErrorMessage message={formErrors.price} />}
                            </div>

                            {/* Security Deposit */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Security Deposit *</label>
                                <div className="relative">
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3 text-indigo-600">
                                        <FaRupeeSign />
                                    </span>
                                    <input
                                        type="number"
                                        name="deposit"
                                        value={formData.deposit}
                                        onChange={handleChange}
                                        placeholder="e.g., 30000"
                                        className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${formErrors.deposit ? 'border-red-500' : 'border-gray-300'}`}
                                        required
                                    />
                                </div>
                                {formErrors.deposit && <ErrorMessage message={formErrors.deposit} />}
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* 3. PHYSICAL DETAILS (Beds, Baths, Area) */}
                    <section>
                        <h3 className="text-2xl font-bold text-indigo-700 mb-4 border-l-4 border-indigo-400 pl-3">Unit Specifications *</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                            {/* Bedrooms */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"><FaBed /> Bedrooms *</label>
                                <input
                                    type="number"
                                    name="bedrooms"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                    min="1"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${formErrors.bedrooms ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                />
                                {formErrors.bedrooms && <ErrorMessage message={formErrors.bedrooms} />}
                            </div>

                            {/* Bathrooms */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"><FaToilet /> Bathrooms *</label>
                                <input
                                    type="number"
                                    name="bathrooms"
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                    min="1"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${formErrors.bathrooms ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                />
                                {formErrors.bathrooms && <ErrorMessage message={formErrors.bathrooms} />}
                            </div>

                            {/* Area Size */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"><FaRulerCombined /> Area (sq ft)</label>
                                <input
                                    type="number"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    placeholder="e.g., 900"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>

                            {/* Floor */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"><FaLayerGroup /> Floor</label>
                                <select
                                    name="floor"
                                    value={formData.floor}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition"
                                >
                                    <option value="Ground">Ground</option>
                                    <option value="1">1st Floor</option>
                                    <option value="2">2nd Floor</option>
                                    <option value="3+">3rd & Above</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* NEW SECTION: AMENITIES */}
                    <section>
                        <h3 className="text-2xl font-bold text-indigo-700 mb-4 border-l-4 border-indigo-400 pl-3 flex items-center gap-2">
                            <FaClipboardCheck /> Key Amenities
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">Click to select all relevant amenities available in your property.</p>
                        <div className="flex flex-wrap gap-3">
                            {AMENITY_OPTIONS.map((amenity) => {
                                const isSelected = amenities.includes(amenity.name);
                                return (
                                    <button
                                        key={amenity.name}
                                        type="button"
                                        onClick={() => handleAmenityToggle(amenity.name)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition duration-200 ${isSelected
                                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                                : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                                            }`}
                                    >
                                        <amenity.icon className={`${isSelected ? 'text-white' : amenity.color}`} />
                                        <span className="font-semibold">{amenity.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* 4. DESCRIPTION */}
                    <section>
                        <h3 className="text-2xl font-bold text-indigo-700 mb-4 border-l-4 border-indigo-400 pl-3">Detailed Description *</h3>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the property's key features, nearby landmarks, security, and what's included (furnishing, utilities, etc.)."
                            rows={6}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition ${formErrors.description ? 'border-red-500' : 'border-gray-300'}`}
                        ></textarea>
                        {formErrors.description && <ErrorMessage message={formErrors.description} />}
                    </section>

                    <hr className="border-gray-200" />

                    {/* 5. IMAGE UPLOAD (Enhanced UX & Validation) */}
                    <section>
                        <h3 className="text-2xl font-bold text-indigo-700 mb-4 border-l-4 border-indigo-400 pl-3">Property Media (Max 5 Images) *</h3>

                        {/* Styled File Input Area */}
                        <label className="block w-full p-8 border-2 border-dashed border-indigo-300 rounded-xl bg-indigo-50/50 cursor-pointer hover:bg-indigo-100 transition duration-300">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                disabled={images.length >= 5} // Disable if max reached
                            />
                            <div className="text-center text-gray-600">
                                <FaUpload className="mx-auto text-4xl text-indigo-500 mb-2" />
                                {images.length < 5 ? (
                                    <p className="font-semibold">Click to upload or drag images here.</p>
                                ) : (
                                    <p className="font-semibold text-green-600 flex items-center justify-center gap-2"><FaCheckCircle /> Max images reached!</p>
                                )}
                                <p className="text-sm mt-1">JPEG, PNG, GIF (Max 5 files)</p>
                            </div>
                        </label>

                        {/* Image Validation Error */}
                        {formErrors.images && <ErrorMessage message={formErrors.images} />}

                        {/* Image Previews with Delete Button */}
                        <div className="flex gap-4 mt-6 flex-wrap">
                            {images.map((img, index) => (
                                <div key={index} className="relative w-32 h-32 rounded-lg shadow-md overflow-hidden border-2 border-gray-200">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`Preview ${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-lg"
                                    >
                                        <FaTrash className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* 6. SUBMIT BUTTONS */}
                    <div className="flex gap-4 justify-end pt-4">
                        <button
                            type="reset"
                            onClick={() => {
                                setFormErrors({});
                                setAmenities([]); // Clear amenities on reset
                                setImages([]); // Clear images on reset
                                setFormData({
                                    name: "",
                                    type: "Flat",
                                    status: "Available",
                                    location: "",
                                    price: "",
                                    deposit: "",
                                    bedrooms: 1,
                                    bathrooms: 1,
                                    area: "",
                                    floor: "Ground",
                                    description: "",
                                })
                            }}
                            className="px-6 py-3 font-semibold border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                        >
                            Reset Form
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/30"
                        >
                            Add Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}