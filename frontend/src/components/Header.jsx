import { Menu, X, LogIn, Building2, UserCircle, ChevronDown, MessageSquare } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

// Helper hook to close a dropdown/modal when clicking outside
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
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

// --- Feedback Modal Component (for better separation and UX) ---
// (No changes to the modal itself, keeping it here for completeness)
const FeedbackModal = ({ feedbackOpen, setFeedbackOpen, me, feedback, setFeedback, feedbackMsg, setFeedbackMsg }) => {
  const modalRef = useRef();
  useClickOutside(modalRef, () => setFeedbackOpen(false));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMsg("");
    try {
      const res = await API.post("/feedback", feedback);
      if (res.data.success) {
        setFeedbackMsg("Thanks! Your feedback was submitted successfully.");
        setFeedback({ description: "", name: me ? me.fullName : "", location: "", type: "PG", propertyName: "" });
        setTimeout(() => setFeedbackOpen(false), 1500);
      } else {
        setFeedbackMsg("Submission failed. Please try again.");
      }
    } catch {
      setFeedbackMsg("An error occurred during submission.");
    }
  };

  if (!feedbackOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900/50 backdrop-blur-sm flex justify-center items-center p-4 transition-opacity duration-300">
      <div ref={modalRef} className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 md:p-8 transform scale-100 transition-transform duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-600" /> Give Feedback
          </h3>
          <button onClick={() => setFeedbackOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description <span className="text-red-500">*</span></label>
            <textarea
              id="description"
              rows={3}
              value={feedback.description}
              onChange={(e) => setFeedback({ ...feedback, description: e.target.value })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name <span className="text-red-500">*</span></label>
            <input
              id="name"
              type="text"
              value={feedback.name}
              onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location <span className="text-red-500">*</span></label>
            <input
              id="location"
              type="text"
              value={feedback.location}
              onChange={(e) => setFeedback({ ...feedback, location: e.target.value })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <select
                id="type"
                value={feedback.type}
                onChange={(e) => setFeedback({ ...feedback, type: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm bg-white"
              >
                <option value="PG">PG</option>
                <option value="Flat">Flat</option>
                <option value="Hostel">Hostel</option>
                <option value="Room">Room</option>
              </select>
            </div>
            <div>
              <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700">PG/Flat/Hostel Name (Optional)</label>
              <input
                id="propertyName"
                type="text"
                value={feedback.propertyName}
                onChange={(e) => setFeedback({ ...feedback, propertyName: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              />
            </div>
          </div>

          {feedbackMsg && <p className="text-sm font-medium text-center text-indigo-600 pt-2">{feedbackMsg}</p>}
          
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => setFeedbackOpen(false)} 
              className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200/50"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// -------------------------------------------------------------------

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [me, setMe] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState({ description: "", name: "", location: "", type: "PG", propertyName: "" });
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const profileRef = useRef();
  useClickOutside(profileRef, () => setProfileOpen(false));
  
  const drawerRef = useRef();
  useClickOutside(drawerRef, () => setIsDrawerOpen(false));

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/auth/me");
        setMe(res.data.user);
        setFeedback(prev => ({ ...prev, name: res.data.user.fullName }));
      } catch {
        setMe(null);
        setFeedback(prev => ({ ...prev, name: "" }));
      }
    };
    load();
  }, []);
  
  useEffect(() => {
    if (isDrawerOpen) {
      // Optional: Prevent body scrolling when the drawer is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset'; // Cleanup on unmount
    };
  }, [isDrawerOpen]);

  const navLinks = [
    { name: "Home", path: "/user/home" },
    { name: "Properties", path: "/listingPage" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Complaints", path: "/complaints" },
  ];
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 w-full z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          
          {/* Logo */}
          <Link 
            to="/user/home" 
            className="flex items-center gap-2 py-0.5" // Added py-0.5 for vertical alignment fix
          >
            <Building2 className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-extrabold text-gray-900">
              Room<span className="text-cyan-500">Finder</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 py-1 hover:text-indigo-600 transition relative
                after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600
                after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth/Profile Section */}
          <div className="hidden lg:flex items-center gap-4">
            {!me ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition border border-indigo-600"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-full font-semibold shadow-lg shadow-indigo-200/50 hover:bg-indigo-700 transition"
                >
                  <span className="flex items-center gap-2"><LogIn size={18} /> Sign Up</span>
                </Link>
              </>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition border border-gray-200"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-expanded={profileOpen}
                >
                  <UserCircle className="w-6 h-6 text-indigo-600" />
                  <span className="font-semibold text-gray-800">{me.fullName.split(" ")[0]}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${profileOpen ? "rotate-180" : "rotate-0"}`} />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 animate-fade-in-down">
                    <div className="mb-4 pb-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900 truncate">{me.fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{me.email}</p>
                    </div>
                    <Link to="/user/profile" onClick={() => setProfileOpen(false)} className="block text-sm py-2 px-1 font-medium text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">My Profile</Link>
                    <button onClick={() => { setFeedbackOpen(true); setProfileOpen(false); }} className="w-full text-left block text-sm py-2 px-1 font-medium text-indigo-600 rounded-lg hover:bg-indigo-50 transition">Give Feedback</button>
                    <button
                      onClick={handleLogout}
                      className="mt-3 w-full text-left text-sm py-2 px-1 font-medium text-red-600 rounded-lg hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Mobile Actions (Visible Profile/Auth + Menu Button) */}
          <div className="flex items-center lg:hidden gap-2">
            {/* Mobile Profile/Auth Icon - Always visible for quick access */}
            {!me ? (
              <Link 
                to="/login"
                className="p-1.5 text-indigo-600 rounded-lg hover:bg-indigo-50 transition" // Slightly smaller padding for better fit
                aria-label="Sign In"
              >
                <LogIn size={26} /> 
              </Link>
            ) : (
              <Link 
                to="/user/profile" 
                className="p-1.5 text-indigo-600 rounded-lg hover:bg-indigo-50 transition" // Slightly smaller padding for better fit
                aria-label={`View Profile of ${me.fullName}`}
              >
                <UserCircle size={26} /> 
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className="p-1.5 text-gray-800 rounded-lg hover:bg-gray-100 transition" // Slightly smaller padding for better fit
              onClick={() => setIsDrawerOpen(true)} // Open the drawer
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Drawer (Off-Canvas Menu) */}
        <div 
          className={`fixed top-0 right-0 h-full w-64 max-w-xs bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden 
          ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Main Navigation Menu"
        >
          <div className="p-4 border-b border-gray-100 flex justify-end">
            <button 
              onClick={() => setIsDrawerOpen(false)} 
              className="p-2 text-gray-800 rounded-full hover:bg-gray-100 transition"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>
          
          {/* Drawer Content */}
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsDrawerOpen(false)} // Close drawer on link click
                className="py-3 px-3 text-lg font-medium text-gray-800 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t border-gray-100 mt-4 space-y-3">
            {me ? (
              <div className="space-y-2">
                <Link to="/user/profile" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-3 py-3 px-3 text-lg font-medium text-gray-800 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">
                    <UserCircle size={20} /> My Profile
                </Link>
                <button 
                  onClick={() => { setIsDrawerOpen(false); setFeedbackOpen(true); }}
                  className="w-full text-left flex items-center gap-3 py-3 px-3 text-lg font-medium text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                >
                    <MessageSquare size={20} /> Give Feedback
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-3 py-3 px-3 text-lg font-medium text-red-600 rounded-lg hover:bg-red-50 transition"
                >
                    <LogIn size={20} className="transform rotate-180" /> Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-center px-5 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200/50"
                >
                  <LogIn className="mr-2" size={20} /> Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-center px-5 py-3 border border-cyan-500 text-cyan-500 font-semibold rounded-xl hover:bg-cyan-50 transition"
                >
                  <LogIn className="mr-2" size={20} /> Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Overlay for Mobile Drawer */}
        {isDrawerOpen && (
          <div 
            className="fixed inset-0 bg-gray-900/40 z-40 lg:hidden"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}
      </header>

      {/* Feedback Modal (No changes) */}
      <FeedbackModal 
        feedbackOpen={feedbackOpen} 
        setFeedbackOpen={setFeedbackOpen} 
        me={me}
        feedback={feedback}
        setFeedback={setFeedback}
        feedbackMsg={feedbackMsg}
        setFeedbackMsg={setFeedbackMsg}
      />
    </>
  );
}