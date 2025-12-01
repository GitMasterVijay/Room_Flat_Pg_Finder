import { Menu, X, LogIn, Building2, UserCircle, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [me, setMe] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState({ description: "", name: "", location: "", type: "PG", propertyName: "" });
  const [feedbackMsg, setFeedbackMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/auth/me");
        setMe(res.data.user);
      } catch {
        setMe(null);
      }
    };
    load();
  }, []);

  const navLinks = [
    { name: "Home", path: "/user/home" },
    { name: "Properties", path: "/listingPage" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Complaints", path: "/complaints" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 w-full z-50 shadow-md relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        
        {/* Logo */}
        <Link 
          to="/user/home" 
          className="flex items-center gap-2" 
          onClick={() => setIsOpen(false)}
        >
          <Building2 className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-extrabold text-gray-900">
            Room<span className="text-cyan-500">Finder</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 lg:gap-8 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-indigo-600 transition relative
              after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600
              after:transition-all hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {!me ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 bg-indigo-600 text-white rounded-full font-semibold shadow hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <LogIn size={18} />
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-cyan-500 text-white rounded-full font-semibold shadow hover:bg-cyan-600 transition flex items-center gap-2"
              >
                <LogIn size={18} />
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <UserCircle className="w-7 h-7 text-indigo-600" />
                <span className="font-semibold text-gray-800">{me.fullName}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${profileOpen ? "rotate-180" : "rotate-0"}`} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-4">
                  <div className="mb-3">
                    <p className="text-sm font-bold text-gray-900">{me.fullName}</p>
                    <p className="text-xs text-gray-600">{me.email}</p>
                  </div>
                  <Link to="/user/profile" className="block text-sm font-medium text-gray-700 hover:underline">My Profile</Link>
                  <button onClick={() => { setFeedbackOpen(true); setProfileOpen(false); }} className="block text-sm font-medium text-indigo-600 hover:underline">Give Feedback</button>
                  <button
                    onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}
                    className="mt-3 w-full text-left text-sm font-medium text-red-600 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-800 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white w-full shadow-lg border-t border-gray-200 transition-all duration-300 overflow-hidden 
        ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="flex flex-col px-4 py-3 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="py-3 px-3 text-lg font-medium text-gray-800 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="mt-2 flex items-center justify-center px-5 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
          >
            <LogIn className="mr-2" /> Sign In
          </Link>

          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="mt-2 flex items-center justify-center px-5 py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition"
          >
            <LogIn className="mr-2" /> Sign Up
          </Link>
        </nav>
      </div>
      {feedbackOpen && (
        <div className="absolute left-0 right-0 top-full z-[60] flex justify-center px-4">
          <div className="bg-white w-full max-w-md mt-2 rounded-2xl shadow-2xl p-6 border">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Give Feedback</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setFeedbackMsg("");
                try {
                  const res = await API.post("/feedback", feedback);
                  if (res.data.success) {
                    setFeedbackMsg("Thanks! Your feedback was submitted.");
                    setFeedback({ description: "", name: "", location: "", type: "PG", propertyName: "" });
                    setTimeout(() => setFeedbackOpen(false), 1200);
                  } else {
                    setFeedbackMsg("Submission failed");
                  }
                } catch {
                  setFeedbackMsg("Submission failed");
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={3}
                  value={feedback.description}
                  onChange={(e) => setFeedback({ ...feedback, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  value={feedback.name}
                  onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={feedback.location}
                  onChange={(e) => setFeedback({ ...feedback, location: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={feedback.type}
                    onChange={(e) => setFeedback({ ...feedback, type: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="PG">PG</option>
                    <option value="Flat">Flat</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Room">Room</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">PG/Flat/Hostel Name</label>
                  <input
                    type="text"
                    value={feedback.propertyName}
                    onChange={(e) => setFeedback({ ...feedback, propertyName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              {feedbackMsg && <p className="text-sm text-indigo-600">{feedbackMsg}</p>}
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setFeedbackOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
