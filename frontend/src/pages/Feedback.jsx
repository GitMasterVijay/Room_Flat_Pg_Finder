import React, { useState } from "react";
import API from "../api/axios";

export default function Feedback() {
  const [form, setForm] = useState({ description: "", propertyId: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [admissions, setAdmissions] = useState([]);
  const [loadingAdmissions, setLoadingAdmissions] = useState(true);

  React.useEffect(() => {
    const loadAdmissions = async () => {
      try {
        const res = await API.get("/property/my-admissions");
        const list = res.data.properties || [];
        setAdmissions(list);
        if (list.length === 1) {
          setForm((prev) => ({ ...prev, propertyId: list[0]._id }));
        }
      } catch (_) {
        setAdmissions([]);
      } finally {
        setLoadingAdmissions(false);
      }
    };
    if (token && role === "user") loadAdmissions();
    else setLoadingAdmissions(false);
  }, [token, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setStatus("Please sign in to submit feedback");
        setLoading(false);
        return;
      }
      if (role !== "user") {
        setStatus("Only user accounts can submit feedback");
        setLoading(false);
        return;
      }
      if (!form.propertyId) {
        setStatus("Please select a property you are admitted to");
        setLoading(false);
        return;
      }
      const payload = { description: form.description.trim(), propertyId: form.propertyId };
      const res = await API.post("/feedback", payload);
      if (res.data.success) {
        setStatus("Thank you! Your feedback has been submitted.");
        setForm({ description: "", propertyId: admissions.length === 1 ? admissions[0]._id : "" });
      } else {
        setStatus(res.data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      setStatus(err.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Send Feedback</h2>
      <p className="text-gray-600 mb-6">Share your experience or suggestions to help us improve.</p>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {!token && (
          <div className="p-3 rounded border border-amber-300 bg-amber-50 text-amber-700">
            Please sign in to submit feedback.
          </div>
        )}
        {token && role !== "user" && (
          <div className="p-3 rounded border border-amber-300 bg-amber-50 text-amber-700">
            Only user accounts can submit feedback.
          </div>
        )}
        {token && role === "user" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Property *</label>
            {loadingAdmissions ? (
              <div className="text-sm text-gray-500">Loading your admissions...</div>
            ) : admissions.length === 0 ? (
              <div className="p-3 rounded border border-amber-300 bg-amber-50 text-amber-700">
                Only admitted users can submit feedback.
              </div>
            ) : (
              <select
                name="propertyId"
                value={form.propertyId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                required
              >
                <option value="">Select a property</option>
                {admissions.map((p) => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            )}
          </div>
        )}
        

        

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Feedback *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !token || role !== "user"}
          className="px-6 py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Send Feedback"}
        </button>
      </form>

      {status && (
        <div className="mt-4 text-sm text-gray-700">{status}</div>
      )}
    </div>
  );
}
