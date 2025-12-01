import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { 
    FaWallet, FaUserTie, FaClipboardList, FaMapMarkerAlt, FaHome, 
    FaRupeeSign, FaChartBar, FaChevronRight, FaPlus, FaCheckCircle, FaExclamationCircle
} from "react-icons/fa";

const MetricCard = ({ icon, title, value, unit }) => {
  const I = icon;
  return (
    <div className="bg-white p-5 rounded-xl border shadow">
      <div className="flex items-center gap-2 mb-2">
        <I className="text-indigo-600" />
        <span className="text-sm text-gray-500">{title}</span>
      </div>
      <p className="text-2xl font-extrabold text-gray-900">
        {value}{unit ? <span className="text-sm font-semibold text-gray-500">{unit}</span> : null}
      </p>
    </div>
  );
};

 

const StatBlock = ({ properties }) => {
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
    const [complaints, setComplaints] = useState([]);
 

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
                setVisits(v.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,10));
                // Adjust metrics target to real count if desired
                // setActiveUnits(list.length);
            } catch {
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


    return (
        <div className="min-h-screen p-4 md:p-8 font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 [background-image:linear-gradient(to_bottom,#fcfdff,#eef4fa)] dark:[background-image:none]">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-10 border-b border-gray-200 dark:border-gray-800 pb-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 flex items-center gap-3">
                        <FaChartBar className="text-indigo-600" /> Owner Dashboard
                    </h1>
                
                </header>

                {/* --- 1. Top Metrics Section: Performance Overview --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <MetricCard icon={FaHome} title="Active Units" value={activeUnits} unit="/15" />
                    <MetricCard icon={FaUserTie} title="Occupancy Rate" value={occupancyRate} unit="%" />
                    <MetricCard icon={FaRupeeSign} title="Rent Collected (Mo)" value={`₹${rentCollected.toLocaleString('en-IN')}`} />
                </div>

                <StatBlock properties={properties} />

                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                            <FaClipboardList className="text-purple-600" /> Recent Property Activity
                        </h2>
                        <ul className="space-y-3">
                            {properties.map((p) => (
                                <li key={p.id} className="flex justify-between items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-800 dark:text-gray-100 truncate">{p.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><FaMapMarkerAlt className="w-3 h-3 text-indigo-400"/>{p.location}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${p.status === 'Leased' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'}`}>
                                            {p.status}
                                        </span>
                                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Currently Staying: {p.currentStudents} Students</span>
                                        <span className="font-bold text-md text-indigo-600">{p.monthlyRent}</span>
                                        <FaChevronRight className="text-gray-400 dark:text-gray-500 w-3 h-3" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                            Upcoming Visits
                        </h2>
                        {visits.length === 0 ? (
                            <p className="text-sm text-gray-500 dark:text-gray-400">No visit requests yet</p>
                        ) : (
                            <ul className="space-y-3">
                                {visits.map((v, i) => (
                                    <li key={i} className="flex justify-between items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-800 dark:text-gray-100 truncate">{v.propertyName}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(v.time).toLocaleString()}</p>
                                            </div>
                                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                                {v.name} • {v.phone}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs px-2 py-1 rounded bg-gray-100">{v.status}</span>
                                                <button onClick={async()=>{
                                                    const res = await API.put(`/property/${v.propertyId}/visit/${v.visitId}/confirm`);
                                                    setVisits(prev=>prev.map(x=>x.visitId===v.visitId?{...x,status:'confirmed'}:x));
                                                    if (v.userId) {
                                                        setProperties(prev=>prev.map(p=>p.id===v.propertyId?{...p,currentStudents:(res.data.tenants||[]).filter(t=>t.status==='admitted').length}:p));
                                                    }
                                                }} className="px-3 py-1 rounded bg-green-600 text-white text-xs">Confirm</button>
                                                <button onClick={async()=>{await API.put(`/property/${v.propertyId}/visit/${v.visitId}/reject`); setVisits(prev=>prev.map(x=>x.visitId===v.visitId?{...x,status:'rejected'}:x));}} className="px-3 py-1 rounded bg-red-600 text-white text-xs">Reject</button>
                                                
                                            </div>
                                        </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                            Complaints
                        </h2>
                        {complaints.length===0 ? (
                            <p className="text-sm text-gray-500 dark:text-gray-400">No complaints</p>
                        ) : (
                            <ul className="space-y-3">
                                {complaints.map((c)=> (
                                    <li key={c._id} className="flex justify-between items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-800 dark:text-gray-100 truncate">{c.userId?.fullName} — {c.type}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{c.propertyId?.name}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs px-2 py-1 rounded bg-gray-100">{c.status}</span>
                                            {c.status==='Pending' && (
                                                <button onClick={async()=>{await API.put(`/complaint/${c._id}/resolve`); setComplaints(prev=>prev.map(x=>x._id===c._id?{...x,status:'Resolved'}:x));}} className="px-3 py-1 rounded bg-green-600 text-white text-xs">Resolve</button>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a href="/owner/addProperties" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
                            <p className="text-sm text-gray-500">Quick Action</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">Add Property</p>
                        </a>
                        <a href="/owner/my-properties" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
                            <p className="text-sm text-gray-500">Quick Action</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">Manage Listings</p>
                        </a>
                        <a href="/owner/ownerNotification" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
                            <p className="text-sm text-gray-500">Quick Action</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">Notifications</p>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Rename the file to OwnerDashboardV2.jsx or replace the content of your existing file.
