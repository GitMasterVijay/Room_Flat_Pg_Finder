import { useState } from "react";
import { Eye, EyeOff, LogIn, Mail, Lock, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", server: "" }));
  };

  // Submit login form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // API CALL
    try {
      setLoading(true);
      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // SAVE USER + TOKEN
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect after login
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        server: error.response?.data?.message || "Login failed. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const ErrorMessage = ({ message }) => (
    <p className="mt-1 text-xs font-medium text-red-500">{message}</p>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-5xl h-screen sm:h-[600px] flex shadow-2xl overflow-hidden rounded-none sm:rounded-xl">
        {/* LEFT SIDE IMAGE */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-800 text-white p-12 flex-col justify-center items-center relative">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1547447192-36c92d5257a0?auto=format&fit=crop&q=80&w=1500')",
            }}
          ></div>

          <div className="relative z-10 text-center">
            <Zap size={48} className="text-cyan-400 mx-auto mb-4" />
            <h2 className="text-4xl font-extrabold mb-3 tracking-wide">
              Welcome Back
            </h2>
            <p className="text-gray-300 text-lg">
              Manage your properties and check your dashboard.
            </p>
          </div>

          <div className="absolute bottom-6 text-gray-500 text-sm">
            <span className="text-cyan-400 font-bold">Room</span>Finder © 2025
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center">
          {/* HEADING */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              Access Your Dashboard
            </h1>
            <p className="text-gray-600 text-md">Enter your credentials.</p>
          </div>

          {/* SERVER ERROR */}
          {errors.server && (
            <p className="mb-4 p-3 text-red-600 bg-red-100 border border-red-300 rounded">
              {errors.server}
            </p>
          )}

          {/* FORM */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                <Mail size={16} className="inline mr-1 text-indigo-500" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <ErrorMessage message={errors.email} />}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                <Lock size={16} className="inline mr-1 text-indigo-500" />{" "}
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-12 transition ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errors.password && <ErrorMessage message={errors.password} />}
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline font-medium transition"
              >
                Forgot Password?
              </Link>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition"
            >
              <LogIn size={20} />
              {loading ? "Please wait..." : "Login"}
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              Don't have an account?
              <Link
                to="/register"
                className="text-indigo-600 font-semibold ml-1 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
