import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { 
    FaWallet, FaUserTie, FaClipboardList, FaMapMarkerAlt, FaHome, 
    FaRupeeSign, FaChartBar, FaChevronRight, FaPlus, FaCheckCircle, FaExclamationCircle
} from "react-icons/fa";

export default function OwnerDashboardV2() {
    // Target values
    const TARGET_UNITS = 12;
    const TARGET_OCCUPANCY = 95; // Percentage
    const TARGET_COLLECTION = 185000;
    
    const [activeUnits, setActiveUnits] = useState(0);
    const [occupancyRate, setOccupancyRate] = useState(0);
    const [rentCollected, setRentCollected] = useState(0);

  

    const [properties, setProperties] = useState([]);
    const [visits, setVisits] = useState([]);
 

    useEffect(() => {
        // Animation logic
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

    useEffect(() => {
        const fetchMy = async () => {
            try {
                const res = await API.get("/property/my");
                const raw = res.data.properties || [];
                const list = raw.map((p) => ({
                    id: p._id,
                    name: p.name,
                    location: p.location,
                    status: p.status === 'Not Available' ? 'Unavailable' : 'Available',
                    monthlyRent: `₹${Number(p.price || 0).toLocaleString('en-IN')}`,
                }));
                setProperties(list);
                const v = [];
                raw.forEach((p) => {
                    (p.visits || []).forEach((vt) => {
                        v.push({
                            propertyId: p._id,
                            propertyName: p.name,
                            name: vt.name,
                            phone: vt.phone,
                            time: vt.time,
                            createdAt: vt.createdAt,
                        });
                    });
                });
                setVisits(v.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,10));
                // Adjust metrics target to real count if desired
                // setActiveUnits(list.length);
            } catch (e) {
                // Keep properties empty on error
            }
        };
        fetchMy();
    }, []);

    // --- Component Definitions ---

    const MetricCard = ({ icon: Icon, title, value, unit, color }) => (
       <div>
            
       </div>
    );

    const FinancialStat = ({ title, value, icon: Icon, textColor }) => (
        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-2 text-gray-700">
                <Icon className={`w-4 h-4 ${textColor}`} />
                <span className="font-medium text-sm">{title}</span>
            </div>
            <span className={`font-bold ${textColor}`}>{value}</span>
        </div>
    );

    const StatBlock = () => {
        const total = properties.length;
        const available = properties.filter(p => p.status === 'Available').length;
        const unavailable = total - available;
        const occupancy = total ? Math.round((unavailable / total) * 100) : 0;
        const totalRent = properties.reduce((sum, p) => {
            const num = Number(String(p.monthlyRent).replace(/[^\d]/g, ""));
            return sum + (isNaN(num) ? 0 : num);
        }, 0);
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-5 rounded-xl border shadow">
                    <p className="text-sm text-gray-500">Total Listings</p>
                    <p className="text-2xl font-extrabold text-gray-900">{total}</p>
                </div>
                <div className="bg-white p-5 rounded-xl border shadow">
                    <p className="text-sm text-gray-500">Available</p>
                    <p className="text-2xl font-extrabold text-green-600">{available}</p>
                </div>
                <div className="bg-white p-5 rounded-xl border shadow">
                    <p className="text-sm text-gray-500">Occupancy</p>
                    <p className="text-2xl font-extrabold text-indigo-600">{occupancy}%</p>
                </div>
                <div className="bg-white p-5 rounded-xl border shadow">
                    <p className="text-sm text-gray-500">Monthly Rent (sum)</p>
                    <p className="text-2xl font-extrabold text-cyan-600">₹{totalRent.toLocaleString('en-IN')}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen p-4 md:p-8 font-sans bg-gray-50 text-gray-900 [background-image:linear-gradient(to_bottom,#fcfdff,#eef4fa)]">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-10 border-b pb-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center gap-3">
                        <FaChartBar className="text-indigo-600" /> Owner Dashboard
                    </h1>
                
                </header>

                {/* --- 1. Top Metrics Section: Performance Overview --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <MetricCard 
                        icon={FaHome} 
                        title="Active Units" 
                        value={activeUnits} 
                        unit="/15"
                        color="border-indigo-500"
                    />
                    <MetricCard 
                        icon={FaUserTie} 
                        title="Occupancy Rate" 
                        value={occupancyRate} 
                        unit="%"
                        color="border-green-500"
                    />
                    <MetricCard 
                        icon={FaRupeeSign} 
                        title="Rent Collected (Mo)" 
                        value={`₹${rentCollected.toLocaleString('en-IN')}`} 
                        color="border-yellow-500"
                    />
                </div>

                <StatBlock />

                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                            <FaClipboardList className="text-purple-600" /> Recent Property Activity
                        </h2>
                        <ul className="space-y-3">
                            {properties.map((p) => (
                                <li key={p.id} className="flex justify-between items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-800 truncate">{p.name}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1"><FaMapMarkerAlt className="w-3 h-3 text-indigo-400"/>{p.location}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${p.status === 'Leased' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {p.status}
                                        </span>
                                        <span className="font-bold text-md text-indigo-600">{p.monthlyRent}</span>
                                        <FaChevronRight className="text-gray-400 w-3 h-3" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                            Upcoming Visits
                        </h2>
                        {visits.length === 0 ? (
                            <p className="text-sm text-gray-500">No visit requests yet</p>
                        ) : (
                            <ul className="space-y-3">
                                {visits.map((v, i) => (
                                    <li key={i} className="flex justify-between items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-800 truncate">{v.propertyName}</p>
                                            <p className="text-xs text-gray-500">{new Date(v.time).toLocaleString()}</p>
                                        </div>
                                        <div className="text-sm text-gray-700">
                                            {v.name} • {v.phone}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a href="/owner/addProperties" className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition">
                            <p className="text-sm text-gray-500">Quick Action</p>
                            <p className="text-xl font-bold text-gray-900">Add Property</p>
                        </a>
                        <a href="/owner/my-properties" className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition">
                            <p className="text-sm text-gray-500">Quick Action</p>
                            <p className="text-xl font-bold text-gray-900">Manage Listings</p>
                        </a>
                        <a href="/owner/ownerNotification" className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition">
                            <p className="text-sm text-gray-500">Quick Action</p>
                            <p className="text-xl font-bold text-gray-900">Notifications</p>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Rename the file to OwnerDashboardV2.jsx or replace the content of your existing file.
