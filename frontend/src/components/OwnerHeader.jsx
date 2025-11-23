import { useState } from "react";
// Switched to lucide-react for consistent icon styling
import { Bell, UserCircle, Menu, X, Home, LayoutDashboard, PlusCircle, Building2, ChevronDown, LogOut, Settings, User } from "lucide-react"; 
import { Link } from "react-router-dom";


export default function OwnerHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Helper to close both menus when navigating
  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    // Switched to white theme with shadow and border
    <header className="bg-white text-gray-900 shadow-lg border-b border-gray-100 sticky top-0 z-50">
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
            to="/owner/addProperties" 
            // Primary action button styling using Indigo theme
            className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-indigo-700 transition"
          >
            <PlusCircle size={18} /> Add Property
          </Link>

          <Link 
            to="/owner/ownerProperties" 
            className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition"
          >
            <Home size={18} /> My Listings
          </Link>
        </nav>

        {/* Right side icons & Mobile button */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Notifications Bell */}
          <button className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition">
              <Link to="/owner/ownerNotification" onClick={closeMenus} ><Bell className="text-xl" /></Link>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
                className="flex items-center gap-1 md:gap-2 text-gray-800 hover:bg-gray-100 p-2 rounded-full transition"
                onClick={() => setProfileOpen(!profileOpen)}
            >
              <UserCircle className="text-2xl text-indigo-600" />
              <span className="hidden sm:inline font-semibold">Owner Name</span>
              <ChevronDown size={18} className={`hidden sm:block transition-transform ${profileOpen ? 'rotate-180' : 'rotate-0'}`}/>
            </button>
            
            {/* Dropdown menu content */}
            {profileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-lg shadow-xl py-2 border border-gray-200 animate-slideDown z-50">
                    <Link to="/owner/ownerProfile" onClick={closeMenus} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700 transition">
                        <User size={18} className="text-indigo-500" /> Profile
                    </Link>
                    <Link to="/owner/ownerSetting" onClick={closeMenus} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700 transition">
                        <Settings size={18} className="text-indigo-500" /> Settings
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link to="/login" onClick={closeMenus} className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 transition">
                        <LogOut size={18} /> Logout
                    </Link>
                </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded text-gray-800 hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        // Mobile menu uses light background with strong indigo accents
        <nav className="md:hidden bg-gray-50 px-4 py-2 flex flex-col gap-1.5 transition-all duration-300 border-t border-gray-200">
          <Link 
            to="/owner/dashboard" 
            onClick={closeMenus}
            className="flex items-center gap-2 px-4 py-2 rounded font-medium text-gray-800 hover:bg-indigo-100 hover:text-indigo-700 transition"
          >
            <LayoutDashboard size={18} className="text-indigo-500"/> Dashboard
          </Link>
          <Link 
            to="/owner/my-properties" 
            onClick={closeMenus}
            className="flex items-center gap-2 px-4 py-2 rounded font-medium text-gray-800 hover:bg-indigo-100 hover:text-indigo-700 transition"
          >
            <Home size={18} className="text-indigo-500"/> My Listings
          </Link>
          <Link 
            to="/owner/addProperties" 
            onClick={closeMenus}
            className="flex items-center gap-2 px-4 py-2 rounded font-medium text-white bg-cyan-600 hover:bg-cyan-500 mt-1 transition"
          >
            <PlusCircle size={18} /> Add Property
          </Link>
        </nav>
      )}
    </header>
  );
}