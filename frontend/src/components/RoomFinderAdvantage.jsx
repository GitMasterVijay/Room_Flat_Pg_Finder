import React from 'react';
import { MapPin, CheckCircle, DollarSign, Shield } from "lucide-react";

function RoomFinderAdvantage() {
    const features = [
        { icon: Shield, title: "Verified Listings", desc: "All properties are physically verified for safety and quality." },
        { icon: DollarSign, title: "Zero Brokerage", desc: "Connect directly with trusted property owners—no middleman fees!" },
        { icon: CheckCircle, title: "Instant Booking", desc: "Quick and secure booking process with instant confirmation." },
        { icon: MapPin, title: "Prime Locations", desc: "Find rooms near major tech parks, colleges, and transport hubs." },
    ];

    return (
        <div>  
            <h3 className="text-4xl font-semibold text-center mb-8 text-gray-900 mt-10">
            The RoomFinder Advantage
        </h3>
            <div className="pb-14 py-7 grid grid-cols-1 gap-6 md:grid-cols-4 max-w-7xl mx-auto">

                {features.map((data, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-3 items-center justify-start bg-indigo-50 p-5 py-10 md:px-6 hover:-translate-y-3 transition ease-linear duration-200 rounded-[5px] hover:shadow-md shadow-gray-200 "
                    >
                        <div className="w-[30%] md:w-[32%] flex justify-center">
                            <data.icon className="w-14 h-14 text-[#BA8E64]" />
                        </div>

                        <h2 className="text-xl text-[#333333] text-center font-bold">
                            {data.title}
                        </h2>

                        <p className="text-center text-[#7A7A7A]">
                            {data.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoomFinderAdvantage;
