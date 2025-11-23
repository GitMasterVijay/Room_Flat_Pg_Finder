import React, { useState } from "react";
import { FaBuilding, FaEnvelope, FaPhone, FaUserGraduate, FaEdit, FaSave, FaTimes, FaChartLine, FaRegEye, FaRegWindowMaximize, FaKey, FaBed, FaUserCheck } from "react-icons/fa";
// Ensure this image works well against a light background, maybe a bright, professional photo
import ownerAvatar from "../assets/flat.jpg";

export default function OwnerProfile() {
  const [ownerInfo, setOwnerInfo] = useState({
    name: "Vijay Hiwale",
    email: "hiwalevijay87@gmail.com",
    phone: "+91 8899776655",
    totalProperties: 18,
    avatar: ownerAvatar,
    lastLogin: "2025-11-22 01:48 PM IST",
  });

  const [editMode, setEditMode] = useState(false);
  const [tempOwnerInfo, setTempOwnerInfo] = useState(ownerInfo);

  // 🔥 UPDATED DATA: Focusing only on live, actionable user requests 🔥
  const [requests] = useState([
    { id: 'APP-101', type: "New Tenant Application", status: "Urgent", date: "2025-11-22", unit: "1BHK Flat - Kothrud" },
    { id: 'INQ-045', type: "Booking Inquiry (PG)", status: "New", date: "2025-11-21", unit: "Boys PG - Hinjewadi" },
    { id: 'INQ-044', type: "Viewing Request", status: "Scheduled", date: "2025-11-19", unit: "2BHK Flat - Kharadi" },
    { id: 'INQ-043', type: "Document Submission", status: "Awaiting Review", date: "2025-11-18", unit: "Girls PG - Wakad" },
    { id: 'APP-102', type: "Follow-up Question", status: "New", date: "2025-11-18", unit: "Single Room - Koregaon" },
  ]);

  const handleEdit = () => {
    setTempOwnerInfo(ownerInfo);
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempOwnerInfo({ ...tempOwnerInfo, [name]: value });
  };

  const handleSave = () => {
    setOwnerInfo(tempOwnerInfo);
    setEditMode(false);
    console.log("Saving changes:", tempOwnerInfo);
  };

  // Helper function to render a profile field with light theme styling
  const renderProfileField = (Icon, label, name, value, type = "text") => (
    <div className="relative">
      <label className="text-sm font-light text-gray-500 block mb-1 uppercase tracking-widest">{label}</label>
      {editMode ? (
        <input
          type={type}
          name={name}
          value={tempOwnerInfo[name]}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-100 text-gray-900 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder-gray-500"
          placeholder={`Enter new ${label.toLowerCase()}`}
        />
      ) : (
        <div className="flex items-center gap-3 text-gray-800 text-lg bg-white/70 p-3 rounded-lg border border-gray-200 backdrop-blur-sm shadow-sm transition duration-300 hover:bg-gray-100">
          <Icon className="text-blue-600 w-5 h-5" />
          <p className="font-semibold truncate">{value}</p>
        </div>
      )}
    </div>
  );

  // Helper for status badges (adjusted for New/Urgent focus)
  const getStatusBadge = (status) => {
    let style = "";
    if (status === "Urgent") style = 'bg-red-500 text-white shadow-lg shadow-red-500/30'; // Application needs immediate attention
    else if (status === "New") style = 'bg-green-500 text-white shadow-lg shadow-green-500/30'; // Newly received inquiry
    else if (status === "Awaiting Review") style = 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'; // Documents/Info ready for owner review
    else if (status === "Scheduled") style = 'bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/30'; // Viewing scheduled
    else style = 'bg-gray-400 text-gray-900';

    return (
      <span className={`px-3 py-1 inline-flex text-xs font-extrabold uppercase tracking-widest rounded-full ${style}`}>
        {status}
      </span>
    );
  };

  return (
    // Light Background, using a subtle gradient for depth
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-8 relative overflow-hidden [background-image:linear-gradient(to_bottom,#f4f8ff,#e0e8f3)]">

      {/* Background Gradients/Blobs for Ultra-Modern look (subtle, light-colored) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER SECTION */}
        <div className="mb-12 pt-6">
          <h2 className="text-6xl font-black text-gray-900 tracking-tighter mb-1 flex items-center gap-4">
            <FaChartLine className="text-blue-600 opacity-90" /> ASSET FLUX
          </h2>
          <p className="text-gray-500 text-xl tracking-wider uppercase ml-14">Room Finder Owner Dashboard</p>
          <div className="mt-4 text-sm text-gray-500 ml-14">
            Last System Activity: <span className="text-blue-600 font-mono font-semibold">{ownerInfo.lastLogin}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Profile Card (1/3) - Glassmorphism Effect (Light) */}
          <div className="lg:col-span-1 bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-8 border border-gray-200 h-fit transition duration-700 hover:shadow-indigo-400/50 hover:border-indigo-400/50">

            <div className="flex flex-col items-center border-b border-gray-200 pb-6 mb-6">
              <div className="relative p-1 border-4 border-indigo-500 rounded-full shadow-lg shadow-indigo-500/30">
                <img
                  src={ownerInfo.avatar}
                  alt="Owner Avatar"
                  className="w-40 h-40 rounded-full object-cover"
                />
              </div>
              <h3 className="text-4xl font-extrabold text-gray-900 mt-4 mb-1 tracking-tight">{ownerInfo.name}</h3>
              <p className="text-lg text-indigo-500 font-medium uppercase tracking-widest">Asset Manager</p>
            </div>

            <div className="space-y-6">
              {renderProfileField(FaUserGraduate, "User Handle", "name", ownerInfo.name)}
              {renderProfileField(FaEnvelope, "Secure Email", "email", ownerInfo.email, "email")}
              {renderProfileField(FaPhone, "Direct Line", "phone", ownerInfo.phone)}
            </div>

            {/* Metric Box: Properties - High Contrast */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-blue-500/10 p-6 rounded-2xl border-2 border-blue-400/50 shadow-lg shadow-blue-500/20">
                <label className="text-lg font-bold text-blue-600 block mb-2 uppercase tracking-wider">Active Portfolio</label>
                <div className="flex justify-between items-center">
                  <p className="text-5xl font-black text-gray-900">
                    {ownerInfo.totalProperties}
                  </p>
                  <p className="text-xl font-medium text-gray-600">Total Listings</p>
                  <FaBuilding className="w-10 h-10 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Requests & Actions (2/3) */}
          <div className="lg:col-span-2 space-y-10">

            {/* Action Buttons Row */}
            <div className="flex justify-start space-x-6 pt-4">
              {!editMode ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center bg-indigo-500 text-white px-8 py-4 rounded-xl font-black hover:bg-indigo-600 transition shadow-xl shadow-indigo-500/40 text-xl uppercase tracking-widest border-2 border-transparent"
                >
                  <FaEdit className="mr-3 w-5 h-5" /> RECONFIGURE ACCESS
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center bg-transparent text-gray-600 px-8 py-4 rounded-xl font-bold hover:bg-red-100 transition border border-gray-400 text-xl uppercase tracking-widest"
                  >
                    <FaTimes className="mr-3 w-5 h-5" /> DISCARD
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center bg-indigo-500 text-white px-8 py-4 rounded-xl font-black hover:bg-indigo-600 transition shadow-xl shadow-indigo-500/40 text-xl uppercase tracking-widest border-2 border-transparent"
                  >
                    <FaSave className="mr-3 w-5 h-5" /> COMMIT CHANGES
                  </button>
                </>
              )}
            </div>

            {/* Available Requests Section - High-Tech Dashboard */}
            <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-8 border border-gray-200">
              <h3 className="text-4xl font-black text-gray-900 mb-6 pb-3 border-b-4 border-blue-500/50 flex items-center gap-3">
                <FaUserCheck className="text-indigo-400" /> LIVE TENANT REQUESTS
              </h3>

              {requests.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        {/* 1. Request Identifier */}
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">REQUEST ID</th>
                        {/* 2. Type of User Action */}
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">ACTIVITY TYPE</th>
                        {/* 3. Property Targeted */}
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">PROPERTY UNIT</th>
                        {/* 4. Action Priority/State */}
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">STATUS</th>
                        {/* 5. Link to the Actionable Request */}
                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {requests.map((request) => (
                        <tr key={request.id} className="bg-transparent hover:bg-gray-100 transition duration-300 group">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">{request.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-800">{request.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-500 flex items-center gap-2"><FaBed />{request.unit}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(request.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-blue-500 hover:text-indigo-600 flex items-center justify-end font-bold transition duration-300">
                              <FaRegEye className="mr-2 w-4 h-4" /> VIEW DETAILS
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-10 text-lg font-light">NO LIVE REQUESTS. All listings are currently quiet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}