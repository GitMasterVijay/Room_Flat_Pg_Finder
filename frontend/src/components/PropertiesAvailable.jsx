import React from 'react';
import { MapPin, ArrowRight } from "lucide-react";

const properties = [
    { title: "2BHK in Pune", location: "Hinjewadi Phase 1", price: "₹12,000/month", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80", type: "Flat" },
    { title: "Fully Furnished PG", location: "Dharampeth, Nagpur", price: "₹6,500/month", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80", type: "PG" },
    { title: "1RK for Students", location: "Rajapeth, Amravati", price: "₹4,800/month", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80", type: "Room" },
];

function PropertiesAvailable() {
  return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2 text-center">
            Prime Picks
          </h2>
          <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Featured Properties of the Week
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-indigo-500/30 transition duration-300 cursor-pointer border border-gray-100"
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

                  <button className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg">
                    View Details
                  </button>
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
  )
}

export default PropertiesAvailable;
