import React, { useEffect, useState } from 'react';
import { Search, Edit, Trash2, Eye, ShieldCheck, DollarSign, Home, TrendingUp, Filter, SortAsc, AlertTriangle, X, Upload, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from "../api/axios";

export default function OwnerMyProperties() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMy = async () => {
      setLoading(true);
      try {
        const res = await API.get("/property/my");
        const list = (res.data.properties || []).map((p) => ({
          id: p._id,
          title: p.name,
          location: p.location,
          price: Number(p.price || 0),
          type: p.type,
          status: p.status === 'Not Available' ? 'Pending' : 'Active',
          views: 0,
          bookings: 0,
          image: p.images && p.images.length > 0 ? `http://localhost:5000/uploads/${p.images[0]}` : "https://placehold.co/600x400/CCCCCC/666666?text=No+Image",
          verified: true,
          description: p.description || '',
          amenities: p.amenities || [],
        }));
        setProperties(list);
      } catch (e) {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMy();
  }, []);

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-50 text-green-800 border-green-200';
      case 'Rented': return 'bg-red-50 text-red-800 border-red-200';
      case 'Pending': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property listing? This action cannot be undone.')) return;
    try {
      await API.delete(`/property/${id}`);
      setProperties(prev => prev.filter(p => p.id !== id));
      if (editingPropertyId === id) {
        setEditingPropertyId(null);
        setEditFormData({});
      }
      alert('Property deleted successfully');
    } catch (e) {
      alert('Failed to delete property');
    }
  };

  const handleEditClick = (property) => {
    setEditingPropertyId(property.id);
    setEditFormData({ ...property });
    // scroll to top of form on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAmenityChange = (amenity) => {
    setEditFormData(prev => ({
      ...prev,
      amenities: prev.amenities && prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...(prev.amenities || []), amenity]
    }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    const mapStatus = (s) => (s === 'Active' ? 'Available' : 'Not Available');
    const payload = {
      name: editFormData.title,
      type: editFormData.type,
      location: editFormData.location,
      price: Number(editFormData.price || 0),
      description: editFormData.description,
      amenities: editFormData.amenities || [],
      status: mapStatus(editFormData.status || 'Active'),
    };
    try {
      const res = await API.put(`/property/${editingPropertyId}`, payload);
      const updated = res.data.property;
      setProperties(prev => prev.map(p => p.id === editingPropertyId ? {
        ...p,
        title: updated.name,
        location: updated.location,
        price: Number(updated.price || 0),
        type: updated.type,
        status: updated.status === 'Not Available' ? 'Pending' : 'Active',
        description: updated.description || '',
        amenities: updated.amenities || [],
      } : p));
      setEditingPropertyId(null);
      setEditFormData({});
      alert('Property updated successfully!');
    } catch (err) {
      alert('Failed to update property');
    }
  };

  const filteredAndSortedProperties = properties
    .filter(p => {
      const q = searchTerm.trim().toLowerCase();
      if (!q && filterStatus === 'all') return true;
      const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
      const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return b.price - a.price;
        case 'views': return b.views - a.views;
        case 'date': return String(b.id).localeCompare(String(a.id));
        default: return 0;
      }
    });

  // Small helper components inside file for clarity
  const EmptyState = () => (
    <div className="text-center p-12 bg-white rounded-xl shadow-sm border border-gray-200">
      <AlertTriangle size={40} className="text-indigo-500 mx-auto mb-4" />
      <h3 className="text-2xl font-semibold text-gray-800">No properties found</h3>
      <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
     
    </div>
  );

  const LoaderCard = () => (
    <div className="animate-pulse bg-white rounded-xl shadow border border-gray-100 p-4">
      <div className="h-44 bg-gray-100 rounded-md mb-4" />
      <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-1/2 mb-2" />
      <div className="h-8 bg-gray-100 rounded w-full mt-4" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 text-white rounded-lg p-3 shadow-md">
              <Home size={28} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">My Property Listings</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your properties, view metrics and edit details quickly.</p>
            </div>
          </div>

           
        </div>

        {/* Controls - responsive grid */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-6  ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search title or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition"
              />
            </div>

            <div className="flex items-center gap-3">
              <Filter size={18} className="text-indigo-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full py-3 px-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition appearance-none"
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Rented">Rented</option>
                <option value="Pending">Pending Review</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <SortAsc size={18} className="text-indigo-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-3 px-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition appearance-none"
              >
                <option value="date">Sort by Recent</option>
                <option value="price">Sort by Price (High)</option>
                <option value="views">Sort by Views (High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Edit form (modal-like on desktop, stacked on mobile) */}
        {editingPropertyId && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 mb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Edit size={28} className="text-indigo-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Edit Property</h2>
                  <p className="text-sm text-gray-500">Update property details and save changes.</p>
                </div>
              </div>
              <button onClick={() => setEditingPropertyId(null)} className="p-2 rounded-full hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditFormSubmit} className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input name="title" value={editFormData.title || ''} onChange={handleEditFormChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select name="type" value={editFormData.type || ''} onChange={handleEditFormChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg" required>
                      <option value="">Select Type</option>
                      <option value="Flat">Flat</option>
                      <option value="PG">PG</option>
                      <option value="Room">Room</option>
                      <option value="Hostel">Hostel</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input name="location" value={editFormData.location || ''} onChange={handleEditFormChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Price (₹)</label>
                    <input name="price" type="number" value={editFormData.price || ''} onChange={handleEditFormChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea name="description" value={editFormData.description || ''} onChange={handleEditFormChange} rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {["AC", "WiFi", "Parking", "Gym", "Meals", "Laundry", "24/7 Security", "Study Area", "Attached Bathroom", "Balcony"].map(a => (
                      <button key={a} type="button" onClick={() => handleAmenityChange(a)} className={`px-3 py-1 rounded-full border ${editFormData.amenities && editFormData.amenities.includes(a) ? 'bg-cyan-50 border-cyan-400 text-cyan-800' : 'bg-gray-50 border-gray-200'}`}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <img src={editFormData.image} alt="current" className="w-full h-40 object-cover rounded-lg border" />
                  <label className="mt-3 inline-flex items-center gap-2 px-3 py-2 bg-white border rounded-full cursor-pointer">
                    <Upload size={16} /> Change Image
                    <input type="file" className="hidden" onChange={(e) => { console.log(e.target.files?.[0]); alert('Image upload not implemented in demo.'); }} />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select name="status" value={editFormData.status || ''} onChange={handleEditFormChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                    <option value="Active">Active</option>
                    <option value="Pending">Pending Review</option>
                    <option value="Rented">Rented</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input name="verified" type="checkbox" checked={editFormData.verified || false} onChange={handleEditFormChange} className="h-5 w-5" />
                  <label className="text-sm text-gray-700">Property Verified</label>
                </div>

                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setEditingPropertyId(null)} className="px-4 py-2 rounded-full border">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-full bg-indigo-600 text-white flex items-center gap-2"> <CheckCircle size={16} /> Save</button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Properties grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <LoaderCard key={i} />)
          ) : (
            filteredAndSortedProperties.length > 0 ? (
              filteredAndSortedProperties.map(property => (
                <article key={property.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
                  <div className="relative h-48 sm:h-44 md:h-40 lg:h-44">
                    <img src={property.image} alt={property.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute left-3 top-3 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusClasses(property.status)}">
                      {/* status pill moved below */}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{property.title}</h3>
                        <p className="text-sm text-gray-500">{property.type} • {property.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-extrabold text-cyan-600">₹{property.price.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">/mo</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusClasses(property.status)}`}>{property.status}</span>
                      {property.verified && <span className="flex items-center gap-1 text-green-600"><ShieldCheck size={14} /> Verified</span>}
                    </div>

                    <p className="text-sm text-gray-600 mt-3 line-clamp-3 flex-1">{property.description || 'No description provided.'}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-500 flex items-center gap-3">
                        <div className="flex items-center gap-1"><TrendingUp size={14} /> {property.views}</div>
                        <div className="flex items-center gap-1"><Eye size={14} /> {property.bookings} requests</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEditClick(property)} title="Edit" className="p-2 rounded-full hover:bg-indigo-50 text-indigo-600">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(property.id)} title="Delete" className="p-2 rounded-full hover:bg-red-50 text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="sm:col-span-2 lg:col-span-3">
                <EmptyState />
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
}
