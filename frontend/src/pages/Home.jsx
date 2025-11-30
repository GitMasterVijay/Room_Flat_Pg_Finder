import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { Search, Home as HomeIcon, MapPin, CheckCircle, ArrowRight, TrendingUp, DollarSign, Users, Shield, Zap, Building } from "lucide-react";
import UserFeedback from "../components/userFeedback"
import RoomFinderAdvantage from "../components/RoomFinderAdvantage";
import ThreeSimpleStep from "../components/ThreeSimpleStep";
import PopularCategoriesNearYou from "../components/PopularCategoriesNearYou"
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await API.get("/property/list");
        const list = (res.data.properties || []).slice(0, 6).map((p) => ({
          id: p._id,
          title: p.name,
          location: p.location,
          price: `₹${Number(p.price || 0).toLocaleString('en-IN')}/month`,
          image: p.images && p.images.length > 0 ? `http://localhost:5000/uploads/${p.images[0]}` : "https://placehold.co/600x400/CCCCCC/666666?text=No+Image",
          type: p.type,
        }));
        setFeatured(list);
      } catch (e) {
        setError("Failed to load featured properties");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);


  return (
    <div className="w-full font-sans ">

      <section className="relative w-full min-h-[500px] text-white bg-gray-900">
        <Slider
          autoplay
          autoplaySpeed={4000}
          infinite
          arrows={false}
          dots
          className="h-[85vh]"
        >
          {[
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&fm=jpg&crop=entropy",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80&fm=jpg&crop=entropy",
            "https://images.unsplash.com/photo-1502005229762-cf1b0a7c60a3?w=1600&q=80&fm=jpg&crop=entropy",
          ].map((src, idx) => (
            <div key={idx} className="relative w-full h-[85vh]">
              <img src={src} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <p className="text-cyan-400 text-lg font-semibold mb-3 flex items-center justify-center gap-2">
                  <TrendingUp size={20} /> Over 12,000 Verified Listings!
                </p>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
                  Find Your Next Perfect Stay
                </h1>
                <p className="text-xl md:text-2xl mb-8 font-light text-gray-200">
                  Rooms, PGs, and Flats—Directly from Owners. Zero Brokerage.
                </p>
                <div className="max-w-2xl mx-auto flex bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                  <input
                    type="text"
                    placeholder="Enter City, Locality, or Property Type (e.g., Pune, PG for Girls)..."
                    className="flex-1 px-6 py-4 text-lg text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 rounded-l-xl"
                  />
                  <button className="bg-indigo-600 px-8 py-4 text-lg font-bold flex items-center gap-2 hover:bg-indigo-700 transition">
                    <Search size={22} /> Search
                  </button>
                </div>
                <div className="flex justify-center gap-4 mt-6">
                  {['PG', 'Flat', 'Room'].map((type) => (
                    <button
                      key={type}
                      className="px-6 py-2 rounded-full border border-cyan-400 text-sm font-medium bg-cyan-500 text-gray-900 hover:bg-cyan-600 transition"
                    >
                      Find {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* --- */}

      



      <PopularCategoriesNearYou />


      {/* --- */}

      {/* ================= 3. FEATURED PROPERTIES (Modern Cards) ================= */}
      <section className="py-16 px-4 bg-gray-50"> {/* Added light gray background for visual separation */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2 text-center">
            Prime Picks
          </h2>
          <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Featured Properties of the Week
          </h3>

          {loading && (
            <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-700 font-semibold">Loading featured properties...</div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-semibold">{error}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((property) => (
              <div
                key={property.id}
                className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-indigo-500/20 transition duration-300 cursor-pointer border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {property.type}
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">{property.title}</h4>
                  <p className="text-gray-600 mb-2 flex items-center gap-1">
                    <MapPin size={16} className="text-indigo-500" /> {property.location}
                  </p>
                  <p className="font-extrabold text-2xl text-cyan-500 mt-3">{property.price}</p>

                  <Link to={`/property/${property.id}`} className="mt-4 block text-center w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="text-indigo-600 font-semibold text-lg flex items-center gap-2 mx-auto hover:gap-3 transition-all">
              See All Listings <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* --- */}

      {/* ================= 4. HOW IT WORKS (New Easy Steps Section) ================= */}
      <ThreeSimpleStep />




      <RoomFinderAdvantage />




      <div className=" bg-gray-50 py-2">
        <UserFeedback />
      </div>

    </div>
  );
}
