import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BoysPgImage from "../assets/Boys_Pg.jpg"
import GirlsPg from "../assets/Girls_pg.jpg"
import Flat from "../assets/Flat.jpg"
import { Users, Home as HomeIcon, Building, Zap } from "lucide-react";
import Hostel from "../assets/Hostel.jpg"
import SharingRoom from "../assets/Sharing_Romm.jpg"


export default function ReviewCard() {

    const categories = [
        {
            name: "PGs for Boys",
            des: "Your perfect Boys PG is just around the corner! Fully furnished rooms, safe environment, and vibrant community",
            image: BoysPgImage
        },
        {
            name: "PGs for Girls",
            des: "Find cozy Girls PGs near you today! Modern rooms, 24/7 security, and all essential amenities included.",
            image: GirlsPg
        },
        {
            name: "Flats",
            des: "Discover the best Flats in your neighborhood! Spacious layouts, stylish interiors, and convenient locations.",
            image: Flat
        },
        {
            name: "Hostels",
            des: "Affordable Hostels waiting for you nearby! Ideal for students, with study areas and a friendly atmosphere.",
            image: Hostel
        },
        {
            name: "Sharing Rooms",
            des: "Comfortable Sharing Rooms available close by! Meet like-minded roommates and enjoy flexible living",
            image: SharingRoom
        },
    ];

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,        // show arrows
        dots: false,
        centerMode: false,    // keep false if you don't want centered partial slides
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h3 className="text-4xl font-semibold text-center mb-10 text-gray-900">
                Popular Categories Near You
            </h3>
            <Slider {...settings}>
                {categories.map((data, index) => {
                    const IconComponent = data.icon; // get icon component
                    return (
                        <div key={index} className="px-3"> {/* Gap between slides */}
                            <div className="bg-white    overflow-hidden  cursor-pointer shadow-md rounded-md ">
                                <div className="flex items-center justify-center h-64 ">
                                    {/* Show image if exists, otherwise show icon */}

                                    <img
                                        src={data.image}

                                        className="w-full h-full object-cover"
                                    />

                                </div>

                                <div className="p-6 text-center ">
                                    <h4 className="text-2xl font-bold text-indigo-700 mb-3 ">{data.name}</h4>
                                    {/* <button className="mt-4 w-full bg-indigo-200 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg">
                                        View Details
                                    </button> */}
                                    <h2 className="text-gray-500 font-medium">{data.des}</h2>
                                </div>
                                {/* <div ref={gsapRef2.current[2]}>
                                <ButtonAnimated text="Get A Quote" isArrowVisible classes={{ beforeSpanClass: "before:bg-black", buttonClass: "bg-white md:h-16 md:w-52 md:justify-center mx-auto mt-4 md:mt-0", textClass: "text-black hover:text-white" }} onClickFun={() => { router.push("/contact") }} />
                            </div> */}
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
