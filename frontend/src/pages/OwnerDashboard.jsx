import React, { useState, useEffect } from "react";
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

    // Simulated data
    const financialSummary = {
        totalRentDue: "₹2,05,000",
        rentCollectedToday: "₹15,000",
        pendingPayments: 3,
    };

    const properties = [
        { id: 1, name: "City Center Flat", location: "Pune, Viman Nagar", status: "Leased", monthlyRent: "₹18,500" },
        { id: 2, name: "Bachelors PG", location: "Nagpur, Dharampeth", status: "Available", monthlyRent: "₹7,200" },
        { id: 3, name: "Studio Apartment", location: "Bengaluru, Whitefield", status: "Leased", monthlyRent: "₹11,000" },
    ];

    const tasks = [
        { id: 1, description: "Review tenant screening for City Center Flat", urgency: "High" },
        { id: 2, description: "Send rent reminder to Unit 302", urgency: "Medium" },
        { id: 3, description: "Schedule maintenance for water heater", urgency: "Low" },
    ];

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

    // --- Component Definitions ---

    const MetricCard = ({ icon: Icon, title, value, unit, color }) => (
        <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${color} transition hover:shadow-xl hover:scale-[1.01] duration-300`}>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
                    <p className="text-4xl font-extrabold text-gray-900 mt-1">
                        {value}
                        {unit && <span className="text-xl font-semibold text-gray-600 ml-1">{unit}</span>}
                    </p>
                </div>
                <Icon className={`text-3xl ${color.replace('border-', 'text-').replace('500', '600')}`} />
            </div>
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

    return (
        <div className="min-h-screen p-4 md:p-8 font-sans bg-gray-50 text-gray-900 [background-image:linear-gradient(to_bottom,#fcfdff,#eef4fa)]">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-10 border-b pb-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center gap-3">
                        <FaChartBar className="text-indigo-600" /> Owner Dashboard
                    </h1>
                    <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-600/40 text-sm">
                        <FaPlus /> New Unit
                    </button>
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

                {/* --- 2. Main Content: Financial & Operational Split --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT (2/3): Financial and Property Management */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Financial Snapshot Card */}
                        <div className="bg-white p-6 rounded-xl shadow-2xl shadow-blue-100/50 border border-blue-50">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                <FaWallet className="text-blue-600" /> Monthly Financial Snapshot
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <FinancialStat 
                                    title="Total Rent Due" 
                                    value={financialSummary.totalRentDue} 
                                    icon={FaRupeeSign} 
                                    textColor="text-indigo-600"
                                />
                                <FinancialStat 
                                    title="Collected Today" 
                                    value={financialSummary.rentCollectedToday} 
                                    icon={FaRupeeSign} 
                                    textColor="text-green-600"
                                />
                                <FinancialStat 
                                    title="Pending Payments" 
                                    value={`${financialSummary.pendingPayments} tenants`} 
                                    icon={FaExclamationCircle} 
                                    textColor="text-red-600"
                                />
                            </div>
                            <button className="w-full mt-4 text-sm font-semibold text-blue-600 bg-blue-50 py-2 rounded-lg hover:bg-blue-100 transition">
                                View Detailed Ledger <FaChevronRight className="inline ml-1 w-3 h-3" />
                            </button>
                        </div>

                        {/* Property Listings Summary */}
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
                            <button className="w-full mt-4 text-sm font-semibold text-purple-600 bg-purple-50 py-2 rounded-lg hover:bg-purple-100 transition">
                                Manage All Listings
                            </button>
                        </div>
                    </div>

                    {/* RIGHT (1/3): Urgent Tasks and Requests */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-2xl shadow-red-100/50 border border-red-50 h-full">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                <FaExclamationCircle className="text-red-600" /> Urgent Action Center
                            </h2>
                            
                            <ul className="space-y-4">
                                {tasks.map((task) => (
                                    <li key={task.id} className={`p-3 rounded-lg border-l-4 ${task.urgency === 'High' ? 'border-red-500 bg-red-50' : task.urgency === 'Medium' ? 'border-yellow-500 bg-yellow-50' : 'border-blue-500 bg-blue-50'} shadow-sm flex justify-between items-start`}>
                                        <p className="text-sm font-medium text-gray-800 flex-1">{task.description}</p>
                                        <button title="Resolve" className="ml-3 p-1 rounded-full text-gray-500 hover:text-green-600 hover:bg-white transition">
                                            <FaCheckCircle className="w-4 h-4"/>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full mt-6 text-sm font-bold text-red-600 bg-red-50 py-2 rounded-xl border border-red-200 hover:bg-red-100 transition">
                                View All Tasks
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Rename the file to OwnerDashboardV2.jsx or replace the content of your existing file.