import React, { useState } from 'react';
import { Search, Edit, Trash2, Eye, ShieldCheck, DollarSign, Home, TrendingUp, Filter, SortAsc, AlertTriangle, X, Upload, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample Property Data
const initialProperties = [
    {
        id: 1,
        title: "Luxury 2BHK Flat - Near IT Park",
        location: "Hinjewadi Phase 3, Pune",
        price: 15000,
        type: "Flat",
        status: "Active", // Active, Pending, Rented
        bookings: 3,
        views: 1250,
        image: "https://images.unsplash.com/photo-1560518883-205a2e52b2c5?auto=format&fit=crop&w=300&q=80",
        verified: true,
        description: "Spacious 2BHK apartment with modern amenities, ideal for families. Close to major IT companies and schools. Features include a modular kitchen, balcony, and covered parking. Excellent connectivity to public transport.",
        amenities: ["AC", "WiFi", "Parking", "Gym", "Power Backup"],
    },
    {
        id: 2,
        title: "Girls PG - Fully Furnished",
        location: "Dharampeth, Nagpur",
        price: 7500,
        type: "PG",
        status: "Rented",
        bookings: 10,
        views: 4500,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=300&q=80",
        verified: true,
        description: "Comfortable and safe PG for girls with all necessary facilities. Includes meals, laundry, and 24/7 security. Located in a prime area with easy access to colleges and markets.",
        amenities: ["Meals", "Laundry", "WiFi", "24/7 Security", "Study Area"],
    },
    {
        id: 3,
        title: "Budget 1RK for Students",
        location: "Rajapeth, Amravati",
        price: 4800,
        type: "Room",
        status: "Pending",
        bookings: 0,
        views: 320,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80",
        verified: false,
        description: "Affordable 1RK room suitable for students. Basic amenities provided. Quiet neighborhood close to university campus.",
        amenities: ["Bed", "Table", "Fan", "Attached Bathroom"],
    },
];

export default function OwnerMyProperties() {
    const [properties, setProperties] = useState(initialProperties);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('date'); // views, price, date
    const [editingPropertyId, setEditingPropertyId] = useState(null); // State for which property is being edited
    const [editFormData, setEditFormData] = useState({}); // State for form data

    // --- Utility Functions ---

    const getStatusClasses = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700 border-green-300';
            case 'Rented': return 'bg-red-100 text-red-700 border-red-300';
            case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this property listing? This action cannot be undone.')) {
            setProperties(properties.filter(p => p.id !== id));
            // If the deleted property was being edited, close the form
            if (editingPropertyId === id) {
                setEditingPropertyId(null);
                setEditFormData({});
            }
        }
    };

    const handleEditClick = (property) => {
        setEditingPropertyId(property.id);
        setEditFormData({ ...property }); // Pre-fill form with existing data
    };

    const handleEditFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAmenityChange = (amenity) => {
        setEditFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        setProperties(properties.map(p =>
            p.id === editingPropertyId ? { ...editFormData, price: parseFloat(editFormData.price) } : p
        ));
        setEditingPropertyId(null); // Close the form
        setEditFormData({}); // Clear form data
        alert('Property updated successfully!');
    };

    // --- Filtering and Sorting Logic ---

    const filteredAndSortedProperties = properties
        .filter(p => {
            // Filter by search term
            const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.location.toLowerCase().includes(searchTerm.toLowerCase());

            // Filter by status
            const matchesStatus = filterStatus === 'all' || p.status === filterStatus;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price': return b.price - a.price; // Highest price first
                case 'views': return b.views - a.views; // Highest views first
                case 'date': return b.id - a.id; // Most recent first (using ID as proxy)
                default: return 0;
            }
        });

    // --- Component JSX ---

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
                        <Home size={36} className="text-indigo-600" /> My Property Listings
                    </h1>
                    {/* Removed 'Add New Property' button */}
                </div>

                {/* Filters and Search Bar */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Search Input */}
                    <div className="relative">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by title or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative flex items-center gap-3">
                        <Filter size={20} className="text-indigo-500" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition appearance-none pr-8"
                        >
                            <option value="all">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Rented">Rented</option>
                            <option value="Pending">Pending Review</option>
                        </select>
                    </div>

                    {/* Sort By */}
                    <div className="relative flex items-center gap-3">
                        <SortAsc size={20} className="text-indigo-500" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition appearance-none pr-8"
                        >
                            <option value="date">Sort by Recent</option>
                            <option value="price">Sort by Price (High)</option>
                            <option value="views">Sort by Views (High)</option>
                        </select>
                    </div>
                </div>

                {/* Conditional Edit Property Form */}
                {editingPropertyId && (
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-indigo-200 mb-8 relative">
                        <button
                            onClick={() => setEditingPropertyId(null)}
                            className="absolute top-4 right-4 p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-red-500 transition"
                            title="Close Form"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3 flex items-center gap-2">
                            <Edit size={28} className="text-indigo-600" /> Edit Property: <span className="text-cyan-600">{editFormData.title}</span>
                        </h2>

                        <form onSubmit={handleEditFormSubmit} className="space-y-6">
                            {/* Title & Type */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={editFormData.title || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={editFormData.type || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Flat">Flat</option>
                                        <option value="PG">PG</option>
                                        <option value="Room">Room</option>
                                        <option value="Hostel">Hostel</option>
                                    </select>
                                </div>
                            </div>

                            {/* Location & Price */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={editFormData.location || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Monthly Price (₹)</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={editFormData.price || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={editFormData.description || ''}
                                    onChange={handleEditFormChange}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    required
                                ></textarea>
                            </div>

                            {/* Image Upload (Simplified) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Property Image</label>
                                <div className="flex items-center gap-4">
                                    <img src={editFormData.image} alt="Current Property" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                                    <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                                        <Upload size={20} /> Change Image
                                        <input type="file" className="hidden" onChange={(e) => { /* Handle image upload logic */ console.log(e.target.files[0].name); alert('Image upload feature not fully implemented in demo.'); }} />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">For demo, image path is not updated. Actual upload would replace the image.</p>
                            </div>

                            {/* Amenities (Checkbox-like) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                                <div className="flex flex-wrap gap-3">
                                    {["AC", "WiFi", "Parking", "Gym", "Meals", "Laundry", "24/7 Security", "Study Area", "Attached Bathroom", "Balcony"].map(amenity => (
                                        <button
                                            key={amenity}
                                            type="button"
                                            onClick={() => handleAmenityChange(amenity)}
                                            className={`px-4 py-2 rounded-full border transition ${editFormData.amenities && editFormData.amenities.includes(amenity)
                                                    ? 'bg-cyan-100 border-cyan-500 text-cyan-800'
                                                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {amenity}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Status & Verified Toggle */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Property Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={editFormData.status || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        required
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Pending">Pending Review</option>
                                        <option value="Rented">Rented</option>
                                    </select>
                                </div>
                                <div className="flex items-center mt-6">
                                    <input
                                        type="checkbox"
                                        id="verified"
                                        name="verified"
                                        checked={editFormData.verified || false}
                                        onChange={handleEditFormChange}
                                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="verified" className="ml-2 block text-sm font-medium text-gray-700">Property Verified (Admin Only)</label>
                                </div>
                            </div>


                            {/* Actions */}
                            <div className="flex justify-end gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setEditingPropertyId(null)}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30"
                                >
                                    <CheckCircle size={20} /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Property List */}
                <div className="space-y-6">
                    {filteredAndSortedProperties.length > 0 ? (
                        filteredAndSortedProperties.map((property) => (
                            <div
                                key={property.id}
                                className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row overflow-hidden transition duration-300 hover:shadow-xl"
                            >
                                {/* Image */}
                                <div className="md:w-1/4 h-48 md:h-auto flex-shrink-0">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="p-6 md:w-2/4 flex flex-col justify-center">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{property.title}</h2>
                                    <p className="text-gray-600 mb-3 flex items-center gap-1">
                                        <Home size={16} className="text-indigo-500" /> {property.type} in {property.location}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm mt-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusClasses(property.status)}`}>
                                            {property.status}
                                        </span>
                                        {property.verified && (
                                            <span className="flex items-center gap-1 text-green-600 font-semibold">
                                                <ShieldCheck size={16} /> Verified
                                            </span>
                                        )}
                                        {!property.verified && property.status !== 'Active' && (
                                            <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                                                <AlertTriangle size={16} /> Verification Pending
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Metrics and Actions */}
                                <div className="p-6 md:w-1/4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100">
                                    <div className="space-y-2 mb-4">
                                        <p className="text-xl font-extrabold text-cyan-600 flex items-center gap-1">
                                            <DollarSign size={20} /> ₹{property.price.toLocaleString()}/mo
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <TrendingUp size={16} className="text-green-500" /> {property.views.toLocaleString()} Views
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <Eye size={16} className="text-indigo-500" /> {property.bookings} Booking Requests
                                        </p>
                                    </div>

                                    <div className="flex gap-3 justify-end">
                                        <Link
                                            to={`/property/${property.id}`}
                                            title="View Live Listing"
                                            className="p-3 rounded-full text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition"
                                        >
                                            <Eye size={20} />
                                        </Link>
                                        <button
                                            onClick={() => handleEditClick(property)}
                                            title="Edit Property"
                                            className="p-3 rounded-full text-indigo-600 hover:bg-indigo-50 transition"
                                        >
                                            <Edit size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(property.id)}
                                            title="Delete Property"
                                            className="p-3 rounded-full text-red-500 hover:bg-red-50 transition"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-16 bg-white rounded-xl shadow-lg border border-gray-200">
                            <AlertTriangle size={32} className="text-indigo-500 mx-auto mb-4" />
                            <p className="text-xl font-medium text-gray-700">No properties found.</p>
                            <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}