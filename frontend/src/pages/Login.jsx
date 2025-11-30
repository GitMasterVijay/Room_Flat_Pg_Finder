import React, { useState } from "react";
import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle login (Backend logic is unchanged)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (res.data.success) {
        const role = res.data.role;

        // Save token & role
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        // Redirect
        if (role === "owner") navigate("/owner/dashboard");
        else navigate("/user/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    // 📱 Fully Responsive Container: Full screen height, centered content
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8">

      {/* Main Card: Uses a grid/flex for responsiveness */}
      <div className="flex bg-white rounded-3xl shadow-2xl overflow-hidden 
                    w-full max-w-6xl transition-all duration-500 
                    border border-gray-100">

        {/* 🖼️ Image Section: Takes 5/12 of the space on desktop, hidden on mobile */}
        <div className="hidden lg:flex lg:w-5/12 bg-gray-900 items-center justify-center p-8 relative overflow-hidden">
          {/* Subtle background pattern for visual interest */}
          <div className="absolute inset-0 bg-dots-grid opacity-10"></div>
          
          <div className="text-white text-center z-10 p-6">
            <h1 className="text-4xl font-extrabold mb-4 leading-snug">
              Access Your Account
            </h1>
            <p className="text-gray-300 text-lg font-light">
              Manage your properties and services with ease.
            </p>
          </div>
          {/* Placeholder for a complex image/illustration */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=jpg&crop=entropy" 
            alt="App promotional visual"
            className="absolute bottom-0 right-0 max-h-full opacity-0"
          />
        </div>

        {/* 📝 Form Section: Takes 7/12 on desktop, full width on mobile/tablet */}
        <div className="w-full lg:w-7/12 p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center">

          {/* Header Section */}
          <div className="text-left mb-8">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
              Welcome Back!
            </h2>
            <p className="text-lg text-gray-600">
              Please sign in to continue.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <p className="mb-6 text-sm text-red-700 font-medium bg-red-50 p-3 rounded-xl border border-red-300 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email Input Group */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white
                  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200 text-gray-900"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Input Group */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-white
                  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200 text-gray-900"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition duration-150 py-1"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button - Restored powerful indigo/purple gradient for visual pop */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
              text-white rounded-xl font-extrabold shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/60 
              transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center tracking-wider"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : "LOGIN SECURELY"}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-gray-600 text-sm">
              New to our platform?{" "}
              <Link
                to="/register"
                className="font-extrabold text-indigo-600 hover:text-indigo-700 hover:underline transition duration-150"
              >
                Create a Free Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
