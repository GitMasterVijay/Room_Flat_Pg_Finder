 import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { 
    FaWallet, FaUserTie, FaClipboardList, FaMapMarkerAlt, FaHome, 
    FaRupeeSign, FaChartBar, FaChevronRight, FaPlus, FaCheckCircle, FaExclamationCircle, FaDoorOpen, FaUsers, FaTasks
} from "react-icons/fa";
import { ArrowUpRight, CheckSquare, TrendingUp, XSquare } from "lucide-react";


// --- StatBlock Component: Enhanced KPIs ---
const StatBlock = ({ properties }) => {
    const total = properties.length;
    // Assuming 'Unavailable' means occupied for occupancy calculation
    const unavailable = properties.filter(p => p.status === 'Unavailable').length;
    const available = total - unavailable;
    
    // Occupancy logic calculation
    const occupancy = total ? Math.round((unavailable / total) * 100) : 0;
    
    // Total Rent logic
    const totalRent = properties.reduce((sum, p) => {
        // Remove currency symbols, commas, and parse as a number
        const num = Number(String(p.monthlyRent).replace(/[^\d]/g, ""));
        return sum + (isNaN(num) ? 0 : num);
    }, 0);

    const formatCurrency = (amount) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    }

    // New: Calculate potential total rent if fully occupied (assuming all properties have rent defined)
    const potentialRent = properties.reduce((sum, p) => {
        const num = Number(String(p.monthlyRent).replace(/[^\d]/g, ""));
        return sum + (isNaN(num) ? 0 : num);
    }, 0);
    // You might want to calculate the actual collected rent based on tenant data, 
    // but sticking to the provided calculation for consistency.

    const stats = [
        { 
            title: "Total Listings", 
            value: total, 
            color: "text-indigo-600",
            icon: FaHome, 
            bg: "bg-indigo-50" 
        },
        { 
            title: "Units Available", 
            value: available, 
            color: "text-green-600",
            icon: FaDoorOpen, 
            bg: "bg-green-50"
        },
        { 
            title: "Occupancy Rate", 
            value: `${occupancy}%`, 
            color: occupancy > 80 ? "text-cyan-600" : "text-yellow-600",
            icon: TrendingUp, 
            bg: "bg-cyan-50" 
        },
        { 
            title: "Monthly Rent Potential", 
            value: formatCurrency(potentialRent), 
            color: "text-purple-600",
            icon: FaRupeeSign, 
            bg: "bg-purple-50" 
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, index) => (
                <div key={index} className={`relative p-5 sm:p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl border border-gray-100 ${stat.bg}`}>
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                            <p className={`text-2xl sm:text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
                        </div>
                        <div className={`p-2 rounded-full ${stat.color} bg-opacity-30`}>
                             {/* Lucide icons used for cleaner look, falling back to Fa icons if Lucide is not preferred */}
                            {React.createElement(stat.icon, { className: "w-5 h-5" })} 
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- Main Dashboard Component ---
export default function OwnerDashboardV2() {
    // Target values are now visually tracked but not directly displayed in the main StatBlock
    const TARGET_UNITS = 12;
    const TARGET_OCCUPANCY = 95; // Percentage
    const TARGET_COLLECTION = 185000;
    
    // State for animated targets (only used for animation logic, not for data display)
    const [activeUnits, setActiveUnits] = useState(0);
    const [occupancyRate, setOccupancyRate] = useState(0);
    const [rentCollected, setRentCollected] = useState(0);

    const [properties, setProperties] = useState([]);
    const [visits, setVisits] = useState([]);
    const [complaints, setComplaints] = useState([]);
    
    // --- Animation Logic (Unchanged but kept for functionality) ---
    useEffect(() => {
        const duration = 1500;
        const startTime = Date.now();

        const animateCount = (target, setter) => {
            const now = Date.now();
            const timeElapsed = now - startTime;
            const progress = Math.min(1, timeElapsed / duration);
            
            let nextValue = Math.floor(progress * target);
            setter(nextValue);

            if (progress < 1) {
                requestAnimationFrame(() => animateCount(target, setter));
            } else {
                setter(target);
            }
        };

        animateCount(TARGET_UNITS, setActiveUnits);
        animateCount(TARGET_OCCUPANCY, setOccupancyRate);
        animateCount(TARGET_COLLECTION, setRentCollected);
    }, []);

    // --- Data Fetching Logic (Unchanged but kept for functionality) ---
    useEffect(() => {
        const fetchMy = async () => {
            try {
                const res = await API.get("/property/my");
                const raw = res.data.properties || [];
                const list = raw.map((p) => ({
                    id: p._id,
                    name: p.name,
                    location: p.location,
                    // Standardize status: If 'Not Available' in DB, show as 'Unavailable'
                    status: p.status === 'Not Available' ? 'Unavailable' : 'Available',
                    monthlyRent: `₹${Number(p.price || 0).toLocaleString('en-IN')}`,
                    currentStudents: (p.tenants || []).filter(t => t.status === 'admitted').length,
                }));
                setProperties(list);
                
                const v = [];
                raw.forEach((p) => {
                    (p.visits || []).forEach((vt) => {
                        v.push({
                            propertyId: p._id,
                            propertyName: p.name,
                            visitId: vt._id,
                            name: vt.name,
                            phone: vt.phone,
                            time: vt.time,
                            createdAt: vt.createdAt,
                            status: vt.status || 'pending',
                            userId: vt.userId || null,
                        });
                    });
                });
                // Sort by creation date and limit to 10 for the "Upcoming" list
                setVisits(v.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,10));
            } catch {
                // Silently ignore fetch errors
                void 0;
            }
        };
        fetchMy();
    }, []);

    useEffect(() => {
        const loadComplaints = async () => {
            try {
                const res = await API.get('/complaint/owner');
                setComplaints(res.data.complaints || []);
            } catch {
                void 0;
            }
        };
        loadComplaints();
    }, []);

    // --- Utility function for visit time formatting ---
    const formatVisitTime = (timeString) => {
        const date = new Date(timeString);
        // Display day of the week, date, and short time
        return date.toLocaleDateString('en-IN', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <div className="min-h-screen p-4 md:p-8 font-sans bg-gray-50 text-gray-900">
            <div className="max-w-7xl mx-auto">
                
                {/* Dashboard Header */}
                <header className="flex justify-between items-center mb-10 pb-4">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 flex items-center gap-3">
                        <FaChartBar className="text-indigo-600 w-7 h-7" /> Property Owner Dashboard 🏡
                    </h1>
                </header>

                {/* KPI/StatBlock Section */}
                <StatBlock properties={properties} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
                    
                    {/* Recent Property Activity List */}
                    <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl shadow-xl border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3 border-b pb-3">
                            <FaClipboardList className="text-purple-600 w-5 h-5" /> All Property Listings ({properties.length})
                        </h2>
                        <ul className="space-y-4">
                            {properties.length === 0 ? (
                                <div className="text-center p-6 bg-gray-50 rounded-lg">
                                    <FaHome className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-600">No properties listed yet. Start by adding one!</p>
                                </div>
                            ) : (
                                properties.map((p) => (
                                    <li key={p.id} className="group flex justify-between items-center p-4 rounded-xl border border-gray-200 hover:bg-indigo-50 transition duration-150">
                                        <div className="flex-1 min-w-0 pr-3">
                                            <p className="font-bold text-gray-800 truncate group-hover:text-indigo-700">{p.name}</p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                <FaMapMarkerAlt className="w-3 h-3 text-indigo-400"/>
                                                <span className="truncate">{p.location}</span>
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="hidden sm:block text-right">
                                                <span className="text-xs font-semibold text-gray-700 block">Occupied: {p.currentStudents}</span>
                                                <span className="font-bold text-sm text-indigo-600">{p.monthlyRent}</span>
                                            </div>
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${p.status === 'Unavailable' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                {p.status}
                                            </span>
                                            <FaChevronRight className="text-gray-400 w-3 h-3 group-hover:text-indigo-600" />
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    {/* Quick Actions Block */}
                    <div className="lg:col-span-1 space-y-4">
                         <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3 border-b pb-3">
                                <FaPlus className="text-green-600 w-5 h-5" /> Quick Actions
                            </h2>
                            <div className="space-y-3">
                                <a href="/owner/addProperties" className="flex justify-between items-center p-3 rounded-xl border border-gray-200 hover:bg-green-50 transition group">
                                    <p className="font-semibold text-gray-700 group-hover:text-green-700">Add New Property</p>
                                    <ArrowUpRight className="w-4 h-4 text-green-500 group-hover:text-green-700"/>
                                </a>
                                <a href="/owner/my-properties" className="flex justify-between items-center p-3 rounded-xl border border-gray-200 hover:bg-indigo-50 transition group">
                                    <p className="font-semibold text-gray-700 group-hover:text-indigo-700">Manage All Listings</p>
                                    <ArrowUpRight className="w-4 h-4 text-indigo-500 group-hover:text-indigo-700"/>
                                </a>
                                <a href="/owner/ownerNotification" className="flex justify-between items-center p-3 rounded-xl border border-gray-200 hover:bg-cyan-50 transition group">
                                    <p className="font-semibold text-gray-700 group-hover:text-cyan-700">Check Notifications</p>
                                    <ArrowUpRight className="w-4 h-4 text-cyan-500 group-hover:text-cyan-700"/>
                                </a>
                            </div>
                        </div>

                        {/* Animated Target Metrics (Optional: If you want to show the targets) */}
                        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3 border-b pb-3">
                                <FaChartBar className="text-yellow-600 w-5 h-5" /> Monthly Goals
                            </h2>
                            <div className="space-y-3">
                                <p className="flex justify-between items-center text-sm font-semibold">Active Units Goal: <span className="text-indigo-600">{activeUnits} / {TARGET_UNITS}</span></p>
                                <p className="flex justify-between items-center text-sm font-semibold">Occupancy Target: <span className="text-cyan-600">{occupancyRate}% / {TARGET_OCCUPANCY}%</span></p>
                                <p className="flex justify-between items-center text-sm font-semibold">Rent Collection Target: <span className="text-purple-600">₹{rentCollected.toLocaleString('en-IN')} / ₹{TARGET_COLLECTION.toLocaleString('en-IN')}</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visits and Complaints in a two-column grid for medium/large screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    
                    {/* Upcoming Visits Section */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3 border-b pb-3">
                            <FaUsers className="text-blue-600 w-5 h-5" /> Upcoming Visits ({visits.length})
                        </h2>
                        {visits.length === 0 ? (
                            <div className="text-center p-6 bg-gray-50 rounded-lg">
                                <FaMapMarkerAlt className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">No recent visit requests.</p>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {visits.map((v, i) => (
                                    <li key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl border border-gray-200">
                                        <div className="min-w-0 mb-2 sm:mb-0">
                                            <p className="font-semibold text-gray-800 truncate">{v.propertyName}</p>
                                            <p className="text-xs text-gray-600 font-medium mt-0.5">{v.name} • {v.phone}</p>
                                            <p className="text-xs text-indigo-500 font-bold mt-1">{formatVisitTime(v.time)}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 sm:gap-3 items-center ml-auto">
                                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                                v.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                                                v.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                                            </span>
                                            {v.status === 'pending' && (
                                                <>
                                                    <button 
                                                        onClick={async()=>{
                                                            // Logic for confirming visit (unchanged)
                                                            await API.put(`/property/${v.propertyId}/visit/${v.visitId}/confirm`);
                                                            setVisits(prev=>prev.map(x=>x.visitId===v.visitId?{...x,status:'confirmed'}:x));
                                                        }} 
                                                        className="px-3 py-1 rounded-full bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition"
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button 
                                                        onClick={async()=>{
                                                            // Logic for rejecting visit (unchanged)
                                                            await API.put(`/property/${v.propertyId}/visit/${v.visitId}/reject`); 
                                                            setVisits(prev=>prev.map(x=>x.visitId===v.visitId?{...x,status:'rejected'}:x));
                                                        }} 
                                                        className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Complaints Section */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3 border-b pb-3">
                            <FaTasks className="text-red-600 w-5 h-5" /> Open Complaints ({complaints.filter(c => c.status === 'Pending').length})
                        </h2>
                        {complaints.length === 0 ? (
                            <div className="text-center p-6 bg-gray-50 rounded-lg">
                                <FaCheckCircle className="w-8 h-8 mx-auto text-green-400 mb-2" />
                                <p className="text-sm text-gray-600">No open complaints! You're doing great.</p>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {complaints.map((c)=> (
                                    <li key={c._id} className="flex justify-between items-center p-4 rounded-xl border border-gray-200">
                                        <div className="min-w-0 pr-3">
                                            <p className="font-semibold text-gray-800 truncate">{c.userId?.fullName} — {c.type}</p>
                                            <p className="text-xs text-gray-500 font-medium mt-0.5">{c.propertyId?.name}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                                c.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                                {c.status}
                                            </span>
                                            {c.status === 'Pending' && (
                                                <button 
                                                    onClick={async()=>{
                                                        // Logic for resolving complaint (unchanged)
                                                        await API.put(`/complaint/${c._id}/resolve`); 
                                                        setComplaints(prev=>prev.map(x=>x._id===c._id?{...x,status:'Resolved'}:x));
                                                    }} 
                                                    className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition"
                                                >
                                                    Resolve
                                                </button>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}