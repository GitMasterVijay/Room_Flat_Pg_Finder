import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TfiQuoteRight } from "react-icons/tfi";

// The brand color, using a deep teal/green that complements the existing border-[#015D53]
const BRAND_COLOR = "#015D53"; 

export default function ReviewCard() {

    const reviewData = [
        // ... (reviewData remains the same) ...
        {
            title: "What Our Client Say About Nouviex",
            desc: "I’ve used several property portals in the past, but none of them were as reliable as RoomFinder. The website is clean, fast, and easy to navigate. I especially liked the recent requests and owner dashboards, which made it simple to find updated listings and track responses. Customer support was fantastic, providing a great experience for both property seekers and owners.",
            name: "Vijay Hiwale",
            post: "MCA Student, Pune"
        },
        {
            title: "What Our Client Say About Nouviex",
            desc: "Moving to a new city can be overwhelming, but RoomFinder made it manageable. The listings are comprehensive, showing every detail about the property, from amenities to nearby facilities. The platform also helped me find a roommate quickly. I'd highly recommend it to anyone looking for accommodation, and everyone I know has had a great experience.",
            name: "Indrajit Pawar",
            post: "ADYPU Pune"
        },
        {
            title: "What Our Client Say About Nouviex",
            desc: "Managing properties used to be tedious, but RoomFinder’s owner dashboard has changed that. I can add multiple listings, track inquiries, and even get notifications about pending requests. The interface is intuitive, allowing me to manage everything without stress. This platform is perfect for anyone who owns multiple properties.",
            name: "Prabhu Firnge",
            post: "Student, D Y Patil School Of MCA"
        },
        {
            title: "What Our Client Say About Nouviex",
            desc: "I was skeptical at first, but RoomFinder has exceeded all my expectations. The platform provides verified listings and detailed information about each property. The filtering options are excellent, allowing me to search by b s, and I felt confident throughout the process. This platform is a must-use for anyone searching for rooms or apartments.",
            name: "Aftab",
            post: "Student, PCCOE"
        },
        {
            title: "What Our Client Say About Nouviex",
            desc: "Nice layout and I was skeptical at first, but RoomFinder has exceeded all my expectations. The platform provides verified listings and detailed information about each property. The filtering options are superb, and I felt confident throughout the process. This platform is a must-use for anyone searching for rooms.",
            name: "Ram Nagare",
            post: "Student, G H Raisoni College Pune"
        },
        {
            title: "What Our Client Say About Nouviex",
            desc: "Managing my listings is easy with the owner dashboard. The platform provides verified listings and options are excellent, allowing me to search by budget, location, and amenities. I even discovered properties I hadn’t considered before. Love the notifications feature for new requests.",
            name: "Adity Dahiwal",
            post: "Student, COEP"
        },
        {
            title: "What Our Client Say About Nouviex",
            desc: "Nice layout and easy navigation. I was skeptical at first, but RoomFinder has exceeded all my expectations. The platform provides verified listings and detailed information. I felt confident throughout the process. This platform is a must-use for anyone searching for rooms. I would love to see more local area reviews integrated into listings.",
            name: "Rutwik Bhosale",
            post: "Student, COEP"
        },
    ]

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
            
            <Slider {...settings}>
                {
                    reviewData.map((data, index) => (
                        <div key={index} className="px-3"> 
                            
                            {/* Card Container: Fixed height applied here. */}
                            <div className={`
                                relative flex flex-col items-start bg-white p-8 sm:p-10 rounded-xl shadow-lg 
                                hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent 
                                hover:border-b-4 hover:border-b-[#015D53] 
                                h-[480px] // *** FIXED HEIGHT ***
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
                    ))
                }
            </Slider>

        </div>
    );
}