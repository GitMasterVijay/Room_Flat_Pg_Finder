import React, { useEffect, useState } from "react";
import { Wrench, Zap, Lightbulb, Droplet, Clock, MessageSquare, Plus, Home, AlertTriangle, Loader2, CheckCircle, X, History, Filter, ChevronDown } from 'lucide-react';
import API from "../api/axios";

const TYPES = [
  "Water Problem",
  "Fan Not Working",
  "Light Issue",
  "Room Cleaning",
  "Other",
];

// --- Helper Components for UX (Copied for completeness) ---
const getTypeIcon = (type) => {
    switch (type) {
        case 'Water Problem': return <Droplet size={18} className="text-blue-500" />;
        case 'Fan Not Working': return <Zap size={18} className="text-yellow-600" />;
        case 'Light Issue': return <Lightbulb size={18} className="text-orange-500" />;
        case 'Room Cleaning': return <Home size={18} className="text-green-500" />;
        default: return <Wrench size={18} className="text-gray-500" />;
    }
};

const getStatusClasses = (status) => {
    switch (status) {
        case 'Resolved': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
        case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'Open': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
        default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
};

const LoaderState = () => (
    <div className="flex justify-center items-center h-40 bg-white rounded-2xl shadow-lg border border-gray-100">
        <Loader2 size={32} className="animate-spin text-indigo-500 mr-3" />
        <p className="text-lg font-medium text-gray-600">Loading admissions and complaints...</p>
    </div>
);

const NoAdmissionState = () => (
    <div className="text-center p-12 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-xl">
        <AlertTriangle size={40} className="text-indigo-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800">No Property Admission Found</h3>
        <p className="text-gray-600 mt-2">You need to be admitted to a property to raise a complaint.</p>
    </div>
);


// --- Main Component ---

export default function Complaints() {
  const [admissions, setAdmissions] = useState([]);
  const [form, setForm] = useState({ propertyId: "", type: TYPES[0], description: "" });
  const [status, setStatus] = useState("");
  const [myComplaints, setMyComplaints] = useState([]);
  const [retry, setRetry] = useState(0);
  const [loading, setLoading] = useState(true);

  // --- LOGIC (KEPT EXACTLY AS YOU PROVIDED) ---
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const a = await API.get("/property/my-admissions");
        setAdmissions(a.data.properties || []);
        const c = await API.get("/complaint/my");
        setMyComplaints(c.data.complaints || []);
        // Set default property ID if admissions are available
        if (a.data.properties && a.data.properties.length > 0) {
            setForm(prev => ({ ...prev, propertyId: a.data.properties[0]._id }));
        }
      } catch {
        setStatus("Failed to load");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!loading && admissions.length === 0 && retry < 3) {
      const t = setTimeout(async () => {
        setRetry((r) => r + 1);
        try {
          const a = await API.get("/property/my-admissions");
          setAdmissions(a.data.properties || []);
          // Also set default property ID on successful retry
          if (a.data.properties && a.data.properties.length > 0) {
            setForm(prev => ({ ...prev, propertyId: a.data.properties[0]._id }));
          }
        } catch {}
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [loading, admissions.length, retry]);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("");
    // Basic validation check (since the original code didn't handle it)
    if (!form.propertyId || !form.description.trim()) {
        setStatus("Please select a property and provide a description.");
        return;
    }
    
    try {
      const res = await API.post("/complaint", form);
      if (res.data.success) {
        setStatus("Complaint submitted successfully! 🎉");
        setForm({ propertyId: admissions[0]._id, type: TYPES[0], description: "" }); // Reset form
        setMyComplaints((prev) => [res.data.complaint, ...prev]);
      } else {
        setStatus("Submission failed. Please try again.");
      }
    } catch {
      setStatus("Submission failed due to server error.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  // --- END LOGIC ---


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Main Header */}
        <header className="mb-8 flex items-center gap-4">
            <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-lg">
                <Wrench size={30} />
            </div>
            <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Maintenance Hub</h1>
                <p className="text-md text-gray-500 mt-1">Quickly report issues and track their resolution status.</p>
            </div>
        </header>
        
        {loading ? (
            <LoaderState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 1. Raise Complaint Form */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-100 h-fit">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-3">
                <Plus size={24} className="text-indigo-600" />
                Raise a New Request
              </h2>

              {admissions.length === 0 ? (
                <NoAdmissionState />
              ) : (
                <form onSubmit={submit} className="space-y-6">
                  {/* Property Select (Improved Responsiveness) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Property</label>
                    <div className="relative">
                        {/* Icon for visual context */}
                        <Home size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        {/* Custom Chevron Indicator */}
                        <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <select 
                            name="propertyId"
                            value={form.propertyId} 
                            onChange={handleFormChange} 
                            // Removed `appearance-none` to let native dropdown still function fully on mobile
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white transition text-base"
                            required
                        >
                            <option value="">Choose your property...</option>
                            {admissions.map((p)=> (
                                <option key={p._id} value={p._id}>{p.name} — {p.location}</option>
                            ))}
                        </select>
                    </div>
                  </div>
                  
                  {/* Complaint Type (Improved Responsiveness) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
                    <div className="relative">
                        {/* Icon for visual context */}
                        <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        {/* Custom Chevron Indicator */}
                        <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <select 
                            name="type"
                            value={form.type} 
                            onChange={handleFormChange} 
                            // Removed `appearance-none` to let native dropdown still function fully on mobile
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white transition text-base"
                            required
                        >
                            {TYPES.map((t)=> (<option key={t} value={t}>{t}</option>))}
                        </select>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
                    <textarea 
                        name="description"
                        value={form.description} 
                        onChange={handleFormChange} 
                        rows={4} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" 
                        placeholder="Explain the problem clearly (e.g., The fan in the main bedroom is making a loud noise)."
                        required
                    />
                  </div>
                  
                  {/* Submission Status */}
                  {status && (
                    <p className={`text-sm font-medium p-3 rounded-lg border ${status.includes("success") ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`}>
                        {status.includes("success") ? <CheckCircle size={16} className="inline mr-2" /> : <X size={16} className="inline mr-2" />}
                        {status}
                    </p>
                  )}
                  
                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button 
                        type="submit" 
                        className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-300 disabled:opacity-50"
                        disabled={!form.propertyId}
                    >
                        <MessageSquare size={20} /> Submit Complaint
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* 2. My Complaints History */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-3">
                <History size={24} className="text-indigo-600" />
                My Request History
              </h2>
              
              {myComplaints.length === 0 ? (
                <div className="text-center p-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl">
                    <Clock size={32} className="text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">No maintenance requests submitted yet.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {myComplaints.map((c)=> (
                    <li key={c._id} className="flex justify-between items-center p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition duration-200">
                      
                      {/* Complaint Details */}
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="mt-1">{getTypeIcon(c.type)}</div>
                        <div className="min-w-0">
                          <p className="font-semibold text-lg text-gray-900 truncate">{c.type}</p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{c.description || 'No detailed description.'}</p>
                          <p className="text-xs text-gray-400 mt-1">Submitted: {new Date(c.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                      
                      {/* Status Pill */}
                      <div className="flex-shrink-0 ml-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusClasses(c.status)}`}>
                            {c.status || 'Open'}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}