import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Building2, Globe } from "lucide-react"; // Import necessary icons

export default function Footer() {
  
  const currentYear = new Date().getFullYear();

  // Social media links data
  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-600 text-gray-600" },
    { icon: Instagram, href: "#", color: "hover:text-pink-600 text-gray-600" },
    { icon: Twitter, href: "#", color: "hover:text-cyan-500 text-gray-600" },
    { icon: Globe, href: "#", color: "hover:text-indigo-600 text-gray-600" },
  ];

  // Utility function for link styling
  const LinkItem = ({ to, children }) => (
    <li>
      <Link 
        to={to} 
        // Changed text color for contrast on white background
        className="text-gray-600 hover:text-indigo-600 transition duration-200 text-base"
      >
        {children}
      </Link>
    </li>
  );

  return (
    // Updated background to white and border to gray
    <footer className="bg-white text-gray-700 pt-16 pb-8 border-t border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

        {/* 1. Logo + Branding + Socials (Spans 2 columns on large screens) */}
        <div className="col-span-2">
          <Link to="/user/home" className="flex items-center gap-2 mb-4">
            <Building2 className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-wide">
              Room<span className="text-cyan-500">Finder</span>
            </h2>
          </Link>
          <p className="text-gray-600 text-base leading-relaxed max-w-xs mb-6">
            Connecting seekers directly with verified property owners across the city. Simple, secure, and zero brokerage.
          </p>
          
          {/* Social Media Icons */}
          <div className="flex gap-4">
            {socialLinks.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                className={`transition duration-300 ${item.color}`} // Using dynamic colors
                aria-label={item.icon.name}
              >
                <item.icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* 2. Quick Links */}
        <div>
          {/* Changed header text color */}
          <h3 className="text-gray-900 font-bold text-xl mb-4 border-b-2 border-indigo-600 inline-block pb-1">Navigation</h3>
          <ul className="space-y-3">
            <LinkItem to="/user/home">Home</LinkItem>
            <LinkItem to="/listingPage">Properties</LinkItem>
            <LinkItem to="/about">About Us</LinkItem>
          </ul>
        </div>

        {/* 3. Support & Legal removed */}

        {/* 4. Contact */}
        <div>
          {/* Changed header text color */}
          <h3 className="text-gray-900 font-bold text-xl mb-4 border-b-2 border-indigo-600 inline-block pb-1">Get In Touch</h3>
          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-2 text-gray-600">
              <Mail size={18} className="text-cyan-500"/>
              <a href="mailto:support@roomfinder.com" className="hover:text-indigo-600 transition">support@roomfinder.com</a>
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <Phone size={18} className="text-cyan-500"/>
              <a href="tel:+919876543210" className="hover:text-indigo-600 transition">+91 98765 43210</a>
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <MapPin size={18} className="text-cyan-500"/>
              <p>Pune, Maharashtra, India</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom (Copyright and Separator) */}
      <div className="text-center text-gray-500 text-sm mt-12 border-t border-gray-200 pt-6">
        <p>
            © {currentYear} RoomFinder. All rights reserved. Designed and Developed for seamless property search.
        </p>
      </div>
    </footer>
  );
}
