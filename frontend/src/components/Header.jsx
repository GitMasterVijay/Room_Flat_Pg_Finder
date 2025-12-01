 import {
  Menu,
  X,
  LogOut,
  Building2,
  UserCircle,
  ChevronDown,
  MessageSquare, // Used for the new Feedback link
  Settings,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

// ------------------ CLICK OUTSIDE HOOK (No Change) ------------------
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Use event.composedPath() if available for better shadow DOM compatibility, but simple target check is fine.
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};

// ------------------ MAIN HEADER ------------------
export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [me, setMe] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const drawerRef = useRef();
  const profileRef = useRef();

  // The useCallback around the handler is important for memoization in the hook
  const closeDrawer = () => setIsDrawerOpen(false);
  const closeProfile = () => setProfileOpen(false);

  useClickOutside(drawerRef, closeDrawer);
  useClickOutside(profileRef, closeProfile);

  // Fetch logged user
  useEffect(() => {
    (async () => {
      try {
        // Assume /auth/me returns the currently logged-in user
        const res = await API.get("/auth/me");
        setMe(res.data.user);
      } catch {
        setMe(null);
      }
    })();
  }, []);

  const navLinks = [
    { name: "Home", path: "/user/home" },
    { name: "Properties", path: "/listingPage" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Complaints", path: "/complaints" },
    { name: "Feedback", path: "/feedback" }, // 🆕 ADDED FEEDBACK LINK
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* ---------------- TOP HEADER ---------------- */}
      <header className="
        bg-white/95
        backdrop-blur-sm
        shadow-lg
        sticky
        top-0
        z-50
        transition-all duration-300
        border-b border-gray-100
      ">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4"> {/* Increased padding */}

          {/* LOGO (Refined with gradient and bolder text) */}
          <Link to="/user/home" className="flex items-center gap-2 group">
            <Building2 className="w-8 h-8 text-teal-600 group-hover:scale-105 transition" />
            <h1 className="
              text-3xl
              font-extrabold
              tracking-tight
              text-gray-800
              bg-clip-text
              bg-gradient-to-r from-teal-600 to-blue-500
              hover:text-transparent
              transition duration-300
            ">
              Room<span className="text-gray-800 group-hover:text-transparent transition">Finder</span>
            </h1>
          </Link>

          {/* ---------------- MOBILE ---------------- */}
          <div className="lg:hidden flex items-center gap-4"> {/* Increased gap */}

            {/* PROFILE INFO/LOGIN BUTTON */}
            {!me ? (
              <Link to="/login" className="
                p-2
                text-teal-600
                rounded-full
                hover:bg-teal-50
                transition
              ">
                <LogOut size={28} className="rotate-180" /> {/* LogIn icon is LogOut rotated 180 */}
              </Link>
            ) : (
              <div className="
                flex items-center gap-2
                px-3 py-1
                bg-white
                border border-gray-200
                rounded-full
                shadow-sm
              ">
                {/* Removed extra details, kept it minimal for mobile */}
                <UserCircle size={24} className="text-teal-600" />
                <p className="text-sm font-semibold text-gray-700">{me.fullName.split(" ")[0]}</p>
              </div>
            )}

            {/* MENU BUTTON (Refined styling) */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="
                p-2
                text-gray-800
                rounded-full
                hover:bg-gray-100
                active:bg-gray-200
                transition
              "
            >
              <Menu size={28} />
            </button>
          </div>

          {/* ---------------- DESKTOP NAV (Bolder font, cleaner hover) ---------------- */}
          <nav className="hidden lg:flex gap-10 font-semibold text-gray-700"> {/* Increased gap, better font-weight */}
            {navLinks.map((l) => (
              <Link
                key={l.name}
                to={l.path}
                className="
                  relative
                  hover:text-teal-600
                  transition-colors
                  after:content-['']
                  after:absolute
                  after:w-0
                  after:h-0.5
                  after:bottom-[-5px]
                  after:left-0
                  after:bg-teal-600
                  after:transition-all
                  after:duration-300
                  hover:after:w-full
                "
              >
                {l.name}
              </Link>
            ))}
          </nav>

          {/* ---------------- DESKTOP PROFILE (More refined dropdown) ---------------- */}
          <div className="hidden lg:flex items-center">
            {!me ? (
              <>
                <Link
                  to="/login"
                  className="
                    px-5 py-2
                    border border-teal-600
                    rounded-full
                    text-teal-600
                    font-medium
                    hover:bg-teal-50
                    transition
                    duration-200
                  "
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="
                    px-5 py-2 ml-3
                    bg-amber-500
                    text-white
                    rounded-full
                    font-medium
                    shadow-md
                    hover:bg-amber-600
                    hover:shadow-lg
                    transition
                    duration-200
                  "
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div ref={profileRef} className="relative ml-4">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="
                    flex items-center gap-2
                    px-4 py-2
                    bg-white
                    border border-gray-300
                    rounded-full
                    hover:shadow-md
                    transition-all
                    text-gray-700
                  "
                >
                  <UserCircle size={26} className="text-teal-600" />
                  <span className="font-medium">{me.fullName.split(" ")[0]}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-500 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {profileOpen && (
                  <div className="
                    absolute right-0
                    mt-4
                    w-64
                    bg-white
                    border border-gray-100
                    shadow-2xl
                    rounded-xl
                    p-2
                    transform origin-top-right
                    animate-fadeIn
                  ">
                    <div className="p-3 border-b mb-2">
                      <p className="font-bold text-gray-800">{me.fullName}</p>
                      <p className="text-sm text-gray-500 truncate">{me.email}</p>
                    </div>
                    
                    {/* 🆕 ADDED FEEDBACK LINK TO DROPDOWN */}
                    <Link
                      to="/feedback"
                      onClick={closeProfile}
                      className="
                        flex items-center gap-3
                        py-2 px-3
                        rounded-lg
                        text-gray-700
                        hover:bg-gray-50
                        transition
                        w-full
                      "
                    >
                        <MessageSquare size={18} className="text-blue-500" />
                        Send Feedback
                    </Link>

                    <Link
                      to="/user/profile"
                      onClick={closeProfile}
                      className="
                        flex items-center gap-3
                        py-2 px-3
                        rounded-lg
                        text-gray-700
                        hover:bg-gray-50
                        transition
                        w-full
                      "
                    >
                        <Settings size={18} className="text-teal-600" />
                      Account Settings
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="
                        flex items-center gap-3
                        py-2 px-3
                        rounded-lg
                        text-red-500
                        hover:bg-red-50
                        transition
                        w-full
                        mt-1
                      "
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ---------------- LEFT MOBILE DRAWER ---------------- */}
      <div>
        {/* DARK OVERLAY (Smoother fade-in) */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 opacity-100"
            onClick={closeDrawer}
          ></div>
        )}

        {/* DRAWER (Better slide transition, padding) */}
        <div
          ref={drawerRef}
          className={`
            fixed top-0 left-0 h-full w-72 bg-white
            shadow-2xl z-50
            transform transition-transform duration-500
            flex flex-col
            ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* DRAWER HEADER */}
          <div className="p-5 border-b flex justify-between items-center">
            <Link to="/user/home" className="flex items-center gap-2" onClick={closeDrawer}>
                <Building2 className="w-6 h-6 text-teal-600" />
                <span className="text-lg font-bold text-gray-800">RoomFinder</span>
            </Link>

            <button
              onClick={closeDrawer}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* USER INFO */}
          {me && (
            <div className="p-5 flex items-center gap-4 border-b bg-gray-50">
              <UserCircle size={32} className="text-teal-600" />
              <div>
                <p className="font-bold text-gray-800">{me.fullName}</p>
                <Link to="/user/profile" onClick={closeDrawer} className="text-xs text-teal-600 hover:underline">
                    View Profile
                </Link>
              </div>
            </div>
          )}

          {/* NAV LINKS (Bolder, clearer interaction) */}
          <nav className="p-5 flex flex-col gap-1 flex-grow"> {/* flex-grow pushes auth buttons to bottom */}
            {navLinks.map((l) => (
              <Link
                key={l.name}
                to={l.path}
                onClick={closeDrawer}
                className="
                  flex items-center gap-3
                  py-3 px-4
                  rounded-xl
                  font-medium
                  text-gray-700
                  hover:bg-teal-50
                  hover:text-teal-600
                  transition
                "
              >
                {/* Use appropriate icon for the link in the drawer */}
                {l.name === "Feedback" && <MessageSquare size={20} className="text-blue-500" />}
                {l.name !== "Feedback" && l.name !== "Complaints" && <ChevronDown size={20} className="text-gray-500 rotate-90" />} {/* Simple placeholder icon */}
                {l.name === "Complaints" && <X size={20} className="text-red-500" />}
                {l.name}
              </Link>
            ))}
          </nav>

          {/* AUTH BUTTONS (Separated, primary CTA is Amber) */}
          <div className="p-5 border-t">
            {!me ? (
              <>
                <Link
                  to="/login"
                  onClick={closeDrawer}
                  className="
                    block w-full text-center
                    py-3
                    bg-amber-500
                    text-white
                    font-semibold
                    rounded-xl
                    shadow-md
                    hover:bg-amber-600
                    transition
                  "
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  onClick={closeDrawer}
                  className="
                    block w-full mt-2 text-center
                    py-3
                    border border-teal-600
                    text-teal-600
                    font-semibold
                    rounded-xl
                    hover:bg-teal-50
                    transition
                  "
                >
                  Create Account
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                    handleLogout();
                    closeDrawer();
                }}
                className="
                  w-full text-left
                  py-3
                  text-red-500
                  flex items-center gap-3
                  font-medium
                  hover:bg-red-50
                  rounded-xl
                  px-4
                  transition
                "
              >
                <LogOut size={20} /> Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}