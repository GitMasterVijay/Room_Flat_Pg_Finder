import React, { useEffect, useState } from "react";
import API from "../api/axios";

const TYPES = [
  "Water Problem",
  "Fan Not Working",
  "Light Issue",
  "Room Cleaning",
  "Other",
];

export default function Complaints() {
  const [admissions, setAdmissions] = useState([]);
  const [form, setForm] = useState({ propertyId: "", type: TYPES[0], description: "" });
  const [status, setStatus] = useState("");
  const [myComplaints, setMyComplaints] = useState([]);
  const [retry, setRetry] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const a = await API.get("/property/my-admissions");
        setAdmissions(a.data.properties || []);
        const c = await API.get("/complaint/my");
        setMyComplaints(c.data.complaints || []);
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
        } catch {}
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [loading, admissions.length, retry]);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      const res = await API.post("/complaint", form);
      if (res.data.success) {
        setStatus("Complaint submitted");
        setForm({ propertyId: "", type: TYPES[0], description: "" });
        setMyComplaints((prev) => [res.data.complaint, ...prev]);
      } else {
        setStatus("Submission failed");
      }
    } catch {
      setStatus("Submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow border">
          <h1 className="text-2xl font-bold mb-4">Raise a Complaint</h1>
          {loading ? (
            <p className="text-sm text-gray-600">Loading...</p>
          ) : admissions.length === 0 ? (
            <p className="text-sm text-gray-600">You need to be admitted to a property to raise complaints.</p>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Property</label>
                <select value={form.propertyId} onChange={(e)=>setForm({...form, propertyId: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                  <option value="">Select Property</option>
                  {admissions.map((p)=> (
                    <option key={p._id} value={p._id}>{p.name} — {p.location}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <select value={form.type} onChange={(e)=>setForm({...form, type: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                  {TYPES.map((t)=> (<option key={t} value={t}>{t}</option>))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} rows={3} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              {status && <p className="text-sm text-indigo-600">{status}</p>}
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Submit</button>
              </div>
            </form>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border mt-6">
          <h2 className="text-xl font-bold mb-4">My Complaints</h2>
          {myComplaints.length===0 ? (
            <p className="text-sm text-gray-600">No complaints yet</p>
          ) : (
            <ul className="space-y-3">
              {myComplaints.map((c)=> (
                <li key={c._id} className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <p className="font-semibold">{c.type}</p>
                    <p className="text-xs text-gray-600">{new Date(c.createdAt).toLocaleString()}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">{c.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
