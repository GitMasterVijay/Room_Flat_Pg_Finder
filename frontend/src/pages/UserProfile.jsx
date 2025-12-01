import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function UserProfile() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/property/my-admissions");
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">My Profile</h1>
        {loading ? (
          <p className="text-sm text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow border">
              <h2 className="text-xl font-bold mb-3">Admitted Properties</h2>
              {admissions.length === 0 ? (
                <p className="text-sm text-gray-600">You are not admitted to any property yet.</p>
              ) : (
                <ul className="space-y-3">
                  {admissions.map((p)=> (
                    <li key={p._id} className="flex justify-between items-center p-3 rounded-lg border">
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.location}</p>
                      </div>
                      <a className="px-3 py-1 rounded bg-indigo-600 text-white text-xs" href="/complaints">Go to Complaints</a>
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
