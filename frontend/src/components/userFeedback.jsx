import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TfiQuoteRight } from "react-icons/tfi";
import API from "../api/axios";
import React from "react";


// The brand color, using a deep teal/green that complements the existing border-[#015D53]
const BRAND_COLOR = "#015D53"; 

export default function ReviewCard() {

    const staticData = []

    const [dynamic, setDynamic] = React.useState([]);
    React.useEffect(() => {
        let active = true;
        const load = async () => {
            try {
                const res = await API.get("/feedback");
                const items = (res.data.feedback || []).map((f) => ({
                    title: "User Feedback",
                    desc: f.description,
                    name: f.name,
                    post: `${f.location} • ${f.type}${f.propertyName ? ` • ${f.propertyName}` : ''}`
                }));
                if (active) setDynamic(items.reverse());
            } catch (_) {
                if (active) setDynamic([]);
            }
        };
        load();
        const t = setInterval(load, 10000);
        return () => { active = false; clearInterval(t); };
    }, []);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, 
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 1200, 
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 1,
                    dots: true, 
                },
            },
        ],
    };

    return (
        <div className="max-w-7xl mx-auto py-12 sm:py-20 px-4">
            
            {/* --- IMPROVED HEADING START --- */}
            <h3 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-gray-900 tracking-tight">
                🏡 The Search Ends Here. <span className="text-[#015D53] font-black">(They Said It, Not Us!)</span>
            </h3>
            {/* --- IMPROVED HEADING END --- */}
            
            {dynamic.length === 0 ? (
                <div className="text-center text-gray-600">No feedback yet</div>
            ) : (
                <Slider {...settings}>
                {dynamic.map((data, index) => (
                        <div key={index} className="px-3"> 
                            
                            {/* Card Container: Fixed height applied here. */}
                            <div className={`
                                relative flex flex-col items-start bg-white p-8 sm:p-10 rounded-xl shadow-lg 
                                hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent 
                                hover:border-b-4 hover:border-b-[#015D53] 
                                h-[480px]
                            `}>

                                {/* Quote Icon */}
                                <TfiQuoteRight size={36} style={{ color: BRAND_COLOR }} className="mb-4" />

                                {/* Review Text: Added overflow-hidden to ensure fixed height is maintained */}
                                <div className="text-base text-gray-700 font-normal italic leading-relaxed flex-grow overflow-hidden">
                                    <p className="line-clamp-[12]"> {/* Requires @tailwindcss/line-clamp plugin */}
                                        {data.desc}
                                    </p>
                                </div>


                                {/* Separator */}
                                <hr className="w-16 h-1 bg-gray-200 mt-6 mb-4" />

                                {/* Reviewer Details */}
                                <h2 className="text-xl font-bold text-[#333333] mb-1">
                                    {data.name}
                                </h2>
                                
                                {/* Reviewer Post/Title */}
                                <p className="text-sm font-medium text-gray-500">
                                    {data.post}
                                </p>

                            </div>
                        </div>
                    ))}
                </Slider>
            )}

        </div>
    );
}
