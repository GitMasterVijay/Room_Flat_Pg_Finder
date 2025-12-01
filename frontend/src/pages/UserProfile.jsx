 import React, { useEffect, useState } from "react";
import { User, Home, MapPin, Loader2, Frown, MessageSquare, ChevronRight, ClipboardList } from 'lucide-react';
import API from "../api/axios";

// --- Helper Components for Enhanced UX ---

const LoaderState = () => (
  <div className="flex justify-center items-center h-40 bg-white rounded-2xl shadow-lg border border-gray-100">
    <Loader2 size={32} className="animate-spin text-indigo-500 mr-3" />
    <p className="text-lg font-medium text-gray-600">Loading profile data...</p>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="flex flex-col items-center justify-center p-10 bg-red-50 border-2 border-red-200 rounded-2xl shadow-lg">
    <Frown size={40} className="text-red-500 mb-3" />
    <h3 className="text-xl font-semibold text-red-800">Error Loading Data</h3>
    <p className="text-sm text-red-600 mt-1">{message}</p>
  </div>
);

const EmptyAdmissionsState = () => (
  <div className="text-center p-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl">
    <Home size={40} className="text-indigo-600 mx-auto mb-4" />
    <h3 className="text-xl font-bold text-gray-800">No Admissions Found</h3>
    <p className="text-gray-600 mt-2">You are not admitted to any property yet.</p>
  </div>
);

// --- Main Component (Updated Design) ---

export default function UserProfile() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // NOTE: This useEffect is kept exactly as per the original code.
  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/property/my-admissions");
        // We only map to ensure structure; no data manipulation or extra logic added.
        setAdmissions(res.data.properties || []); 
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="flex items-center gap-4 mb-8">
            <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-lg">
                <User size={30} />
            </div>
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900">My Profile</h1>
                <p className="text-md text-gray-500 mt-1">View properties you are currently admitted to.</p>
            </div>
        </header>

        {loading ? (
            <LoaderState />
        ) : error ? (
            <ErrorState message={error} />
        ) : (
          <div className="space-y-8">
            
            {/* Admissions Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
              
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <ClipboardList size={24} className="text-indigo-600" />
                    Admitted Properties
                </h2>
                <span className="text-sm text-gray-500 font-medium px-3 py-1 bg-gray-100 rounded-full border">
                    {admissions.length} Total
                </span>
              </div>

              {admissions.length === 0 ? (
                <EmptyAdmissionsState />
              ) : (
                <ul className="space-y-4">
                  {admissions.map((p) => (
                    <li key={p._id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-200 bg-white">
                      <div className="flex items-start min-w-0 mb-3 md:mb-0">
                          <Home size={24} className="text-indigo-500 mr-4 mt-1 shrink-0" />
                          <div>
                            <p className="font-bold text-lg text-gray-900 truncate">{p.name}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin size={14} className="mr-1 text-gray-400" />
                                <span className="truncate">{p.location}</span>
                            </div>
                          </div>
                      </div>
                      
                      {/* Action Button */}
                      <a 
                          href="/complaints" 
                          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md w-full md:w-auto"
                      >
                          <MessageSquare size={16} /> Go to Complaints
                          <ChevronRight size={16} />
                      </a>
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