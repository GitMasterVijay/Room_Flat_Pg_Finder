import React from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import {
  Wifi,
  Dumbbell,
  Car,
  Droplets,
  ShieldCheck,
  MapPinned,
  Phone,
  Mail,
  Calendar,
  Home,
  BedDouble,
  Info,
  Share2,
  Heart,
  Ruler,
  Tag,
  Maximize2, // New icon for 'View All Photos'
  X, // Icon for closing modal
} from "lucide-react";

const iconMap = {
  Wifi,
  Dumbbell,
  Car,
  Droplets,
  ShieldCheck,
  BedDouble,
};

// ---------------------------------------------------------
// DATA (Used the provided data)
// ---------------------------------------------------------
const DATA = {
  title: "Premium Boys PG – Fully Furnished | AC + WiFi + Food",
  type: "PG / Hostel",
  address: "Near MIT Square, Pune, Maharashtra, 411041",
  price: "₹7,500 / month",
  deposit: "₹5,000",
  area: "1200 sq.ft",
  beds: 3,

  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080&q=80&fm=jpg&crop=entropy", 
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080&q=80&fm=jpg&crop=entropy", 
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080&q=80&fm=jpg&crop=entropy", 
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080&q=80&fm=jpg&crop=entropy", 
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080&q=80&fm=jpg&crop=entropy", 
   
  ],

  features: [
    { icon: "Wifi", name: "High Speed WiFi" },
    { icon: "Dumbbell", name: "Gym Access" },
    { icon: "Car", name: "Reserved Parking" },
    { icon: "Droplets", name: "24x7 Water Supply" },
    { icon: "ShieldCheck", name: "CCTV Security" },
    { icon: "BedDouble", name: "Single/Double Sharing" },
  ],

  description:
    "A fully furnished premium PG located near MIT College Pune. Includes high-speed WiFi, RO water, CCTV cameras, housekeeping, laundry support, and a peaceful study environment. Perfect for students and working professionals. Enjoy a comfortable and secure stay with all modern conveniences.",

  owner: {
    name: "Rajesh Kumar",
    phone: "9876543210",
    email: "owner@example.com",
    role: "Property Manager",
  },

  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15132.894314488582!2d73.8055609425475!3d18.519082005481747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf49b4566f1b%3A0xc3f95889758a0a9c!2sMIT%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1700050962384!5m2!1sen!2sin",
};

// ---------------------------------------------------------
// FULL IMAGE MODAL COMPONENT (NEW)
// ---------------------------------------------------------
const FullImageModal = ({ images, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-[101]">
        <button
          onClick={onClose}
          className="p-3 bg-white/20 text-white rounded-full hover:bg-white/40 transition"
          aria-label="Close photo gallery"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-4">All {images.length} Photos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src={img}
                alt={`Gallery view ${i + 1}`}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                // Added onClick to make sure the tap interaction is handled, though it currently just closes the modal
                onClick={onClose} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// IMAGE GALLERY – PREMIUM STYLE (UPDATED with View All Button)
// ---------------------------------------------------------
const Gallery = ({ images, openModal }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 relative">
    {/* Main Image (Increased prominence, better transition) */}
    <div className="md:col-span-2 h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl">
      <img
        src={images[0]}
        alt="Main property view"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
      />
    </div>

    {/* Side Images */}
    <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
      {images.slice(1, 3).map((img, i) => (
        <div key={i} className="h-32 md:h-46 rounded-2xl overflow-hidden">
          <img
            src={img}
            alt={`Property detail ${i + 1}`}
            className="rounded-2xl w-full h-full object-cover shadow-lg transition-opacity duration-300 hover:opacity-80"
          />
        </div>
      ))}
      {/* View All Photos Button */}
      <button 
        onClick={openModal}
        className="h-32 md:h-46 rounded-2xl bg-gray-200 shadow-lg flex flex-col items-center justify-center text-sm font-bold text-indigo-700 border border-gray-300 transition-colors hover:bg-indigo-100/70"
      >
        <Maximize2 className="w-6 h-6 mb-1" />
        View All ({images.length}) Photos
      </button>
    </div>
  </div>
);

// ---------------------------------------------------------
// AMENITIES – PREMIUM GRID BOXES
// ---------------------------------------------------------
const FeatureGrid = ({ features }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
    {features.map((f, i) => {
      const Icon = iconMap[f.icon];
      return (
        <div
          key={i}
          className="flex flex-col items-center justify-center text-center gap-2 bg-indigo-50 rounded-xl p-4 shadow-sm border border-indigo-100 transition-all duration-300 hover:bg-indigo-100 hover:shadow-lg"
        >
          <Icon className="w-7 h-7 text-indigo-600" />
          <span className="text-sm font-semibold text-gray-800">{f.name}</span>
        </div>
      );
    })}
  </div>
);

// ---------------------------------------------------------
// RIGHT SIDEBAR (Price + CTA + Owner Contact) - UPDATED
// ---------------------------------------------------------
const BookingSidebar = ({ price, deposit, owner, onOpenVisit }) => (
  <div className="hidden lg:block lg:sticky top-6 p-6 bg-white rounded-2xl shadow-xl border border-indigo-200/50">
    <div className="pb-4 border-b">
      <p className="text-sm font-semibold text-gray-600">Monthly Rent</p>
      <h2 className="text-4xl font-extrabold text-indigo-700 mt-1">{price}</h2>
      <p className="text-sm text-gray-500 mt-1">
        Security Deposit: <span className="font-semibold text-gray-700">{deposit}</span>
      </p>
    </div>

    <div className="mt-6 space-y-4">
      {/* Schedule Visit CTA */}
      <button onClick={onOpenVisit} className="w-full bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
        <Calendar className="w-5 h-5" />
        Schedule a Visit
      </button>
      
      {/* Contact Manager Details (Moved here) */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-base font-bold text-gray-800 mb-2">Contact Manager</h3>
        <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-700 flex-shrink-0">
                {owner.name[0]}
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-800">{owner.name}</p>
                <p className="text-xs text-gray-500">{owner.role}</p>
            </div>
        </div>
        <a href={`tel:${owner.phone}`} className="flex items-center gap-2 text-indigo-600 font-medium hover:underline text-sm py-1">
            <Phone className="w-4 h-4" /> {owner.phone}
        </a>
        <a href={`mailto:${owner.email}`} className="flex items-center gap-2 text-indigo-600 font-medium hover:underline text-sm py-1">
            <Mail className="w-4 h-4" /> {owner.email}
        </a>
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------
// MOBILE FIXED FOOTER CTA (UPDATED with Contact Info)
// ---------------------------------------------------------
const MobileFooterCTA = ({ price, owner, onOpenVisit }) => (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-2xl z-50">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500">Starting From</p>
                <p className="text-xl font-extrabold text-indigo-700">{price}</p>
            </div>
            <div className="flex gap-2">
                <a href={`tel:${owner.phone}`} className="p-3 rounded-xl bg-gray-100 text-indigo-600 border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition">
                    <Phone className="w-5 h-5" />
                </a>
                <button onClick={onOpenVisit} className="bg-indigo-600 text-white font-bold px-5 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Visit
                </button>
            </div>
        </div>
    </div>
);


// ---------------------------------------------------------
// MAIN PAGE COMPONENT
// ---------------------------------------------------------
export default function ViewPropertiesDetails() {
  const { id } = useParams();
  const [p, setP] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [visitOpen, setVisitOpen] = React.useState(false);
  const [visitForm, setVisitForm] = React.useState({ name: "", phone: "", time: "" });
  const [visitStatus, setVisitStatus] = React.useState("");
  

  React.useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/property/${id}`);
        const prop = res.data.property || {};
        const imgs = (prop.images || []).map((f) => `http://localhost:5000/uploads/${f}`);
        const features = (prop.amenities || []).slice(0, 12).map((a) => {
          const lower = String(a).toLowerCase();
          let icon = "ShieldCheck";
          if (lower.includes("wifi")) icon = "Wifi";
          else if (lower.includes("gym")) icon = "Dumbbell";
          else if (lower.includes("parking")) icon = "Car";
          else if (lower.includes("water")) icon = "Droplets";
          else if (lower.includes("bed")) icon = "BedDouble";
          return { icon, name: a };
        });
        const owner = prop.ownerId ? {
          name: prop.ownerId.fullName || "Owner",
          phone: prop.ownerId.phone || "",
          email: prop.ownerId.email || "",
          role: "Owner",
        } : { name: "Owner", phone: "", email: "", role: "Owner" };

        const buildEmbed = (raw, address) => {
          const s = String(raw || "").trim();
          if (!s) return `https://maps.google.com/maps?q=${encodeURIComponent(address || "")}\u0026z=15\u0026output=embed`;
          if (s.includes("/embed") || s.includes("output=embed")) return s;
          if (s.includes("maps.app.goo.gl") || s.includes("goo.gl/maps")) {
            return `https://maps.google.com/maps?q=${encodeURIComponent(address || "")}\u0026z=15\u0026output=embed`;
          }
          let m = s.match(/@(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
          if (!m) m = s.match(/q=([-?\d.]+),([-?\d.]+)/);
          if (m) {
            const lat = m[1];
            const lng = m[2];
            return `https://maps.google.com/maps?q=${lat},${lng}\u0026z=15\u0026output=embed`;
          }
          return `https://maps.google.com/maps?q=${encodeURIComponent(address || s)}\u0026z=15\u0026output=embed`;
        };

        const embed = buildEmbed(prop.mapUrl, prop.location);

        setP({
          title: prop.name || "",
          type: prop.type || "",
          status: prop.status || "",
          address: prop.location || "",
          price: `₹${Number(prop.price || 0).toLocaleString('en-IN')} / month`,
          deposit: `₹${Number(prop.deposit || 0).toLocaleString('en-IN')}`,
          area: `${prop.area || 0} sq.ft`,
          beds: Number(prop.bedrooms || 0),
          baths: Number(prop.bathrooms || 0),
          floor: String(prop.floor || ''),
          description: prop.description || "",
          images: imgs.length ? imgs : ["https://placehold.co/1200x800/CCCCCC/666666?text=No+Image"],
          features,
          owner,
          mapEmbed: embed,
        });
      } catch {
        setError("Failed to load property");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  React.useEffect(() => {
    const loadMe = async () => {
      try {
        const res = await API.get("/auth/me");
        setVisitForm((prev)=> ({...prev, name: res.data.user.fullName || prev.name, phone: res.data.user.phone || prev.phone }));
      } catch {}
    };
    loadMe();
  }, []);

  // Quick Specs Bar Component
  const QuickSpecsBar = () => (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-4 p-4 mt-6 border-y border-gray-200 bg-gray-50/70">
        {[{ icon: Home, label: p.type }, { icon: Ruler, label: p.area }, { icon: BedDouble, label: `${p.beds} Beds` }, { icon: Tag, label: p.deposit }].slice(0, 3).map((item, i) => (
            <div key={i} className="flex flex-col items-center">
                <item.icon className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-semibold text-gray-800 mt-1">{item.label}</span>
                <span className="text-xs text-gray-500">{['Type', 'Area', 'Capacity'][i]}</span>
            </div>
        ))}
    </div>
  );


  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50">
        <div className="p-6 bg-indigo-50 border border-indigo-200 rounded-2xl text-indigo-700 font-bold">Loading property...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50">
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 font-bold">{error}</div>
      </div>
    );
  }

  if (!p) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 pb-20 lg:pb-8 bg-gray-50">
      
      {/* HEADER SECTION (Title, Address, Actions) */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{p.title}</h1>
            <p className="text-lg text-gray-600 flex items-center gap-2 mt-2">
              <MapPinned className="w-6 h-6 text-red-500" /> {p.address}
            </p>
          </div>

          <div className="flex gap-3">
            <button className="p-3 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full border border-red-300 text-red-600 hover:bg-red-50 transition-colors">
              <Heart className="w-5 h-5 fill-red-600" />
            </button>
          </div>
        </div>
      </div>
      
      <Gallery images={p.images} openModal={() => setIsModalOpen(true)} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        
        {/* LEFT COLUMN (Details) */}
        <div className="lg:col-span-2 space-y-10">

            {/* Quick Specs Bar */}
            <QuickSpecsBar />

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b pb-3">Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
                        <span className="text-sm text-gray-500">Type</span>
                        <span className="font-semibold text-gray-800">{p.type}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
                        <span className="text-sm text-gray-500">Status</span>
                        <span className="font-semibold text-gray-800">{p.status}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
                        <span className="text-sm text-gray-500">Bedrooms</span>
                        <span className="font-semibold text-gray-800">{p.beds}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
                        <span className="text-sm text-gray-500">Bathrooms</span>
                        <span className="font-semibold text-gray-800">{p.baths}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
                        <span className="text-sm text-gray-500">Area</span>
                        <span className="font-semibold text-gray-800">{p.area}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
                        <span className="text-sm text-gray-500">Floor</span>
                        <span className="font-semibold text-gray-800">{p.floor}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
                        <span className="text-sm text-gray-500">Deposit</span>
                        <span className="font-semibold text-gray-800">{p.deposit}</span>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b pb-3">Amenities & Facilities</h2>
                <FeatureGrid features={p.features} />
            </div>
            
            {/* Description */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b pb-3">Property Overview</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{p.description}</p>
            </div>

            {/* Map */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b pb-3">Locate on Map</h2>

                <div className="rounded-xl overflow-hidden shadow-lg border h-80">
                    <iframe
                        title="Property Location"
                        src={p.mapEmbed}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>

            {/* NOTE: Former 'Owner Details' section is now removed from the main column */}
        </div>

        {/* RIGHT COLUMN (Sticky Sidebar: Price, Visit CTA, Contact Details) */}
        <div className="lg:col-span-1">
            <BookingSidebar price={p.price} deposit={p.deposit} owner={p.owner} onOpenVisit={() => setVisitOpen(true)} />
        </div>
      </div>

      {/* Mobile Fixed CTA */}
      <MobileFooterCTA price={p.price} owner={p.owner} onOpenVisit={() => setVisitOpen(true)} />

      {/* Full Image Modal */}
      <FullImageModal 
        images={p.images} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {visitOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 border">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Schedule a Visit</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setVisitStatus("");
                const token = localStorage.getItem("token");
                if (!token) {
                  setVisitStatus("Please sign in to schedule a visit");
                  return;
                }
                try {
                  const res = await API.post(`/property/${id}/visit`, visitForm);
                  if (res.data.success) {
                    setVisitStatus("Visit request sent to owner");
                    setVisitForm({ name: "", phone: "", time: "" });
                    setTimeout(() => setVisitOpen(false), 1200);
                  } else {
                    setVisitStatus("Failed to schedule visit");
                  }
                } catch {
                  setVisitStatus("Failed to schedule visit");
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={visitForm.name}
                  onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  value={visitForm.phone}
                  onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Preferred Time</label>
                <input
                  type="datetime-local"
                  value={visitForm.time}
                  onChange={(e) => setVisitForm({ ...visitForm, time: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              {visitStatus && <p className="text-sm text-indigo-600">{visitStatus}</p>}
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setVisitOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
