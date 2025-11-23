import React, { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // OR your custom API instance

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

  // Handle login
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

        // Redirect based on role
        if (role === "owner") navigate("/owner/dashboard");
        else navigate("/user/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          <LogIn className="inline-block mb-1" size={28} /> Login
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-600 font-medium bg-red-100 py-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 
              focus:ring-indigo-500 focus:outline-none"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 
                focus:ring-indigo-500 focus:outline-none pr-12"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {/* Show/Hide Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-indigo-600 rounded-lg 
            hover:bg-indigo-700 transition font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
