import React, { useState, useMemo } from "react";

// --- START: Lucide Icon Placeholders (For self-contained file) ---
// In a real project, these would be imported from 'lucide-react'
const MapPin = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
const DollarSign = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
const Home = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
const Building = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4" /><path d="M15 22v-4" /><path d="M9 18h6" /><path d="M9 10h6" /><path d="M9 6h6" /></svg>;
const Users = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 5.74" /></svg>;
const Bed = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" /><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" /><path d="M12 4v6" /><path d="M2 18h20" /><path d="M18 10h4" /><path d="M2 10h4" /></svg>;
const Wifi = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01" /><path d="M2 8.82a15 15 0 0 1 20 0" /><path d="M5 12.86a10 10 0 0 1 14 0" /><path d="M8.5 16.29a5 5 0 0 1 7 0" /></svg>;
const AirVent = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M20 12h2" /><path d="M2 12h2" /><path d="M18 16h-3" /><path d="M9 16H6" /></svg>;
const Utensils = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><line x1="7" x2="7" y1="2" y2="22" /><path d="M20 2v7c0 1.1-.9 2-2 2h-4a2 2 0 0 1-2-2V2" /><line x1="16" x2="16" y1="2" y2="22" /></svg>;
const Sparkles = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-.6 0-1.2.3-1.6.8L6.4 12l4 6.8c.4.7 1.2 1.2 2 1.2h0c.8 0 1.6-.5 2-1.2l4-6.8-4-6.8C13.2 2.3 12.6 2 12 2zM19 12l2.2-2.2" /><path d="M2 12h2.2" /><path d="M12 2v2.2" /><path d="M12 19.8v2.2" /></svg>;
const ShieldCheck = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>;
// --- END: Lucide Icon Placeholders ---


const ALL_LISTINGS = [
    // Added 'gender' property to all listings
    { id: 101, type: 'Room', title: 'Single Occupancy Room near University', location: 'Pune - Kothrud', rent: 12000, amenities: ['Wi-Fi', 'Attached Bath', 'Security', 'AC'], imageUrl: 'https://placehold.co/600x400/3730A3/FFFFFF?text=Modern+Room', gender: 'Female' },
    { id: 102, type: 'Flat', title: 'Luxury 2BHK Apartment with Pool View', location: 'Pune - Viman Nagar', rent: 35000, amenities: ['Parking', 'Gym Access', 'Modular Kitchen', 'Serviced'], imageUrl: 'https://placehold.co/600x400/047857/FFFFFF?text=Pool+View+2BHK', gender: 'Mixed' },
    { id: 103, type: 'PG', title: 'Executive PG for Girls (All Meals Included)', location: 'Pune - Shivaji Nagar', rent: 18000, amenities: ['Food', 'Laundry', 'AC', 'Housekeeping'], imageUrl: 'https://placehold.co/600x400/9333EA/FFFFFF?text=Girls+PG', gender: 'Female' },
    { id: 104, type: 'Hostel', title: 'Co-living Hostel - Digital Nomad Ready', location: 'Pune - Hinjewadi', rent: 9500, amenities: ['Workspace', 'Fast Wi-Fi', 'Security'], imageUrl: 'https://placehold.co/600x400/D97706/FFFFFF?text=Co-living', gender: 'Mixed' },
    { id: 105, type: 'Room', title: 'Designer Semi-Furnished Private Room', location: 'Pune - Baner', rent: 14500, amenities: ['Balcony', 'Power Backup'], imageUrl: 'https://placehold.co/600x400/1D4ED8/FFFFFF?text=Designer+Room', gender: 'Male' },
    { id: 106, type: 'Flat', title: 'Spacious 1 BHK with large terrace', location: 'Pune - Koregaon Park', rent: 22000, amenities: ['Parking', 'Security'], imageUrl: 'https://placehold.co/600x400/C2410C/FFFFFF?text=Terrace+Flat', gender: 'Mixed' },
    { id: 107, type: 'PG', title: 'Boys PG near IT Hub', location: 'Pune - Hinjewadi', rent: 15000, amenities: ['Food', 'Wi-Fi', 'Security'], imageUrl: 'https://placehold.co/600x400/BE123C/FFFFFF?text=Boys+PG', gender: 'Male' },
];

const LISTING_TYPES = [
    { key: "Room", label: "Private Room", icon: Bed, color: "text-indigo-600 bg-indigo-100" },
    { key: "Flat", label: "Apartment/Flat", icon: Building, color: "text-green-600 bg-green-100" },
    { key: "PG", label: "PG/Co-living", icon: Users, color: "text-purple-600 bg-purple-100" },
    { key: "Hostel", label: "Hostel", icon: Sparkles, color: "text-yellow-600 bg-yellow-100" },
];

const GENDER_TYPES = [
    { key: "Male", label: "Male Only", icon: Users, color: "text-blue-600 bg-blue-100" },
    { key: "Female", label: "Female Only", icon: Users, color: "text-pink-600 bg-pink-100" },
    { key: "Mixed", label: "Mixed Gender", icon: Users, color: "text-gray-600 bg-gray-100" },
];

const getAmenityIcon = (amenity) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wi-fi') || lower.includes('fast')) return <Wifi size={14} />;
    if (lower.includes('ac')) return <AirVent size={14} />;
    if (lower.includes('food') || lower.includes('meals')) return <Utensils size={14} />;
    if (lower.includes('security')) return <ShieldCheck size={14} />;
    return <Sparkles size={14} />;
};


export default function App() {
    const [search, setSearch] = useState("");
    // Initial state set to empty arrays so no filters are actively selected, 
    // showing all listings by default based on the filter logic below.
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);
    const [maxRent, setMaxRent] = useState(50000);

    const handleTypeToggle = (typeKey) => {
        if (selectedTypes.includes(typeKey)) {
            setSelectedTypes(selectedTypes.filter(t => t !== typeKey));
        } else {
            setSelectedTypes([...selectedTypes, typeKey]);
        }
    };

    const handleGenderToggle = (genderKey) => {
        if (selectedGenders.includes(genderKey)) {
            setSelectedGenders(selectedGenders.filter(g => g !== genderKey));
        } else {
            setSelectedGenders([...selectedGenders, genderKey]);
        }
    };

    const filteredListings = useMemo(() => {
        return ALL_LISTINGS.filter((item) => {
            const matchesSearch =
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.location.toLowerCase().includes(search.toLowerCase());

            // Filter logic: if selectedTypes is empty, always match (true)
            const matchesType = selectedTypes.length === 0
                ? true
                : selectedTypes.includes(item.type);

            // Filter logic: if selectedGenders is empty, always match (true)
            const matchesGender = selectedGenders.length === 0
                ? true
                : selectedGenders.includes(item.gender);

            const matchesRent = item.rent <= maxRent;

            // Combine all filters
            return matchesSearch && matchesType && matchesGender && matchesRent;
        });
    }, [search, selectedTypes, selectedGenders, maxRent]); // Updated dependency array

    // Custom class for the slider track color
    const sliderTrackStyle = {
        background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${((maxRent - 5000) / 45000) * 100}%, #E5E7EB ${((maxRent - 5000) / 45000) * 100}%, #E5E7EB 100%)`
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter pt-10    ">
           

            <div className="max-w-7xl mx-auto px-6 pb-12  ">

                {/* ------------ Filters Panel (Visually Prominent) ------------- */}
                <div className=" p-4 sm:p-6 mb-10 bg-white border border-gray-200 rounded-3xl shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                        <Home className="w-6 h-6 mr-2 text-indigo-600" />
                        Filter Your Search
                    </h2>

                    {/* Filter Grid Layout: 2 rows of filters on large screens */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                        {/* 1. Search Bar */}
                        <div className="lg:col-span-2">
                            <label htmlFor="search" className="text-sm font-medium text-gray-700 block mb-1">
                                Location or Title
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="search"
                                    type="text"
                                    placeholder="e.g. Viman Nagar, 2BHK..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>
                        </div>

                        {/* 2. Rent Slider */}
                        <div className="lg:col-span-2">
                            <label htmlFor="rent" className="text-sm font-medium text-gray-700 block mb-1">
                                Max Rent: <span className="font-semibold text-indigo-600">₹{maxRent.toLocaleString('en-IN')}</span>
                            </label>
                            <input
                                id="rent"
                                type="range"
                                min="5000"
                                max="50000"
                                step="1000"
                                value={maxRent}
                                onChange={(e) => setMaxRent(parseInt(e.target.value))}
                                style={sliderTrackStyle}
                                className="w-full h-2 rounded-full appearance-none cursor-pointer range-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 accent-indigo-600"
                            />
                        </div>

                        {/* 3. Type Selection Badges */}
                        <div className="lg:col-span-2">
                            <label className="text-sm font-medium text-gray-700 block mb-1">
                                Property Types ({selectedTypes.length > 0 ? selectedTypes.length : 'All'} selected)
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {LISTING_TYPES.map(typeMeta => {
                                    const isSelected = selectedTypes.includes(typeMeta.key);
                                    const ButtonIcon = typeMeta.icon;
                                    return (
                                        <button
                                            key={typeMeta.key}
                                            onClick={() => handleTypeToggle(typeMeta.key)}
                                            className={`flex items-center text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 
                                                ${isSelected
                                                    ? `${typeMeta.color} border-2 border-current shadow-md`
                                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border-2 border-transparent'
                                                }`}
                                        >
                                            <ButtonIcon size={16} className="mr-2" />
                                            {typeMeta.key}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 4. Gender Selection Badges */}
                        <div className="lg:col-span-2">
                            <label className="text-sm font-medium text-gray-700 block mb-1">
                                Gender Preference ({selectedGenders.length > 0 ? selectedGenders.length : 'All'} selected)
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {GENDER_TYPES.map(genderMeta => {
                                    const isSelected = selectedGenders.includes(genderMeta.key);
                                    const ButtonIcon = genderMeta.icon;
                                    return (
                                        <button
                                            key={genderMeta.key}
                                            onClick={() => handleGenderToggle(genderMeta.key)}
                                            className={`flex items-center text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 
                                                ${isSelected
                                                    ? `${genderMeta.color} border-2 border-current shadow-md`
                                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border-2 border-transparent'
                                                }`}
                                        >
                                            <ButtonIcon size={16} className="mr-2" />
                                            {genderMeta.key}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------- Listings Grid ---------- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                    {filteredListings.map((item) => {
                        const typeMeta = LISTING_TYPES.find(t => t.key === item.type);
                        const CardIcon = typeMeta.icon;
                        const cardColorClass = typeMeta.color;

                        return (
                            <div key={item.id}
                                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden 
                                    hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 transform hover:-translate-y-1
                                    flex flex-col h-full"> {/* Ensures uniform card height */}

                                {/* Image and Type Tag */}
                                <div className="relative">
                                    <img src={item.imageUrl}
                                        onError={(e) => e.target.src = 'https://placehold.co/600x400/CCCCCC/666666?text=Image+Missing'}
                                        className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-90" alt={item.title} />
                                    <div className={`absolute top-4 left-4 flex items-center px-4 py-2 text-sm font-bold rounded-full ${cardColorClass}`}>
                                        <CardIcon size={16} className="mr-1.5" />
                                        {item.type}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow"> {/* Allows content to expand and push button down */}

                                    {/* Title and Location */}
                                    <h2 className="text-xl font-extrabold text-gray-800 truncate mb-1" title={item.title}>
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 flex items-center mb-4">
                                        <MapPin size={16} className="mr-1.5 text-indigo-400" />
                                        {item.location}
                                    </p>

                                    {/* Rent Price */}
                                    <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg mb-4">
                                        <span className="text-sm text-indigo-700 font-medium">Monthly Rent</span>
                                        <span className="text-2xl font-black text-indigo-600 flex items-center">
                                            <DollarSign size={20} className="mr-1" />
                                            {item.rent.toLocaleString('en-IN')}
                                        </span>
                                    </div>

                                    {/* Amenities */}
                                    <div className="border-t border-gray-100 pt-4 mb-4">
                                        <p className="text-xs font-semibold uppercase text-gray-500 mb-2">Key Amenities</p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.amenities.slice(0, 4).map((a, i) => (
                                                <span key={i}
                                                    className="text-xs font-medium flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
                                                    {getAmenityIcon(a)}
                                                    <span className="ml-1">{a}</span>
                                                </span>
                                            ))}
                                            {item.amenities.length > 4 && (
                                                <span className="text-xs font-medium px-2.5 py-1 text-indigo-500">
                                                    +{item.amenities.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Explore Space Button (Forced to bottom) */}
                                    <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold 
                                        shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition duration-200 transform hover:scale-[1.01] mt-auto">
                                        Explore Space
                                    </button>

                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* If no results */}
                {filteredListings.length === 0 && (
                    <div className="mt-16 text-center p-10 border-2 border-dashed border-gray-300 rounded-2xl bg-white">
                        <p className="text-4xl mb-4">😔</p>
                        <h3 className="text-xl font-semibold text-gray-700">No Premium Listings Found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting the rent range or broadening your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}