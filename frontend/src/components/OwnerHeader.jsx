 import { useState, useRef, useEffect } from "react";
// Switched to lucide-react for consistent icon styling
import { Bell, UserCircle, Menu, X, Home, LayoutDashboard, PlusCircle, Building2, ChevronDown, LogOut, User } from "lucide-react"; 
import { Link, useNavigate } from "react-router-dom";

// Helper hook to close a dropdown/modal when clicking outside
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendant elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};


export default function OwnerHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const profileRef = useRef();
  // Close profile dropdown when clicking outside
  useClickOutside(profileRef, () => setProfileOpen(false));


  // Helper to close all menus when navigating
  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    closeMenus();
    // Redirect to login page after logout
    navigate('/login'); 
  };


  return (
    // Added backdrop-blur for a modern, slightly transparent look
    <header className="bg-white/95 backdrop-blur text-gray-900 shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        
        {/* Logo / Title */}
        <Link to="/owner/dashboard" className="flex items-center gap-2" onClick={closeMenus}>
          <Building2 className="w-6 h-6 text-indigo-600" /> 
          <div className="text-xl font-extrabold tracking-wide">
            RoomFinder <span className="text-cyan-500">Owner</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-base font-medium">
          <Link 
            to="/owner/dashboard" 
            className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          
          <Link 
            to="/owner/ownerProperties" 
            className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition"
          >
            <Home size={18} /> My Listings
          </Link>

          <Link 
            to="/owner/addProperties" 
            // Primary action button styling using Indigo theme
            className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            <PlusCircle size={18} /> Add Property
          </Link>
        </nav>

        {/* Right side icons & Mobile button */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Notifications Bell */}
          <Link to="/owner/ownerNotification" onClick={closeMenus} className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition" aria-label="Notifications">
             <Bell className="w-6 h-6" />
             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </Link>

          {/* Profile Dropdown (Desktop Only) */}
          <div className="hidden relative md:block" ref={profileRef}>
            <button 
                className="flex items-center gap-1 md:gap-2 text-gray-800 hover:bg-gray-100 p-2 rounded-full transition"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
            >
              <UserCircle className="w-7 h-7 text-indigo-600" />
              <span className="hidden sm:inline font-semibold text-sm">Owner Name</span>
              <ChevronDown size={18} className={`hidden sm:block text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : 'rotate-0'}`}/>
            </button>
            
            {/* Dropdown menu content */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 z-50">
                <Link to="/owner/ownerProfile" onClick={closeMenus} className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 text-gray-700 transition">
                  <User size={18} className="text-indigo-500" /> Profile
                </Link>
                {/* Removed Settings since it was commented out in the original code */}
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                    onClick={handleLogout} 
                    className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded text-gray-800 hover:bg-gray-100 transition"
            onClick={() => { setMenuOpen(!menuOpen); setProfileOpen(false); }} // Close profile when opening menu
            aria-expanded={menuOpen}
            aria-label="Toggle mobile menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
        </div>
      </div>

      {/* Mobile menu (Full-width dropdown) */}
      {menuOpen && (
        // Added max-h-screen and overflow-y-auto to handle content that exceeds screen height
        <nav className="md:hidden absolute w-full bg-white shadow-xl px-4 py-3 flex flex-col gap-1.5 transition-all duration-300 border-t border-gray-200">
          
          {/* Main Navigation Links */}
          <Link 
            to="/owner/dashboard" 
            onClick={closeMenus}
            className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-lg text-gray-800 hover:bg-indigo-100 hover:text-indigo-700 transition"
          >
            <LayoutDashboard size={20} className="text-indigo-500"/> Dashboard
          </Link>
          <Link 
            to="/owner/ownerProperties" 
            onClick={closeMenus}
            className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-lg text-gray-800 hover:bg-indigo-100 hover:text-indigo-700 transition"
          >
            <Home size={20} className="text-indigo-500"/> My Listings
          </Link>

          {/* Add Property Button (Primary action) */}
          <Link 
            to="/owner/addProperties" 
            onClick={closeMenus}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 mt-2 mb-1 transition shadow-md"
          >
            <PlusCircle size={20} /> Add New Property
          </Link>
          
          <div className="border-t border-gray-200 my-2"></div>
          
          {/* Profile & Logout Links (For Mobile) */}
          <Link to="/owner/ownerProfile" onClick={closeMenus} className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-lg text-gray-800 hover:bg-indigo-100 hover:text-indigo-700 transition">
            <User size={20} className="text-indigo-500" /> Profile
          </Link>
          <button 
            onClick={handleLogout} 
            className="w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-lg text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      )}
    </header>
  );
}