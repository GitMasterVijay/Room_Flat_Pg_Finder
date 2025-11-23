import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Building, Home } from "lucide-react";
import API from "../api/axios";

// Put logo inside:  src/assets/logo.png
// import LOGO from "../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "owner",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, phone: onlyDigits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  // Validate fields
  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
      valid = false;
    }

    if (!/^(\+91)?[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
      valid = false;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
      valid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be 8+ characters.";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
     
      await API.post("/auth/register", formData);

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      setServerError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const ErrorText = ({ msg }) =>
    msg && <p className="text-xs text-red-500 mt-1">{msg}</p>;

  const RoleCard = ({ value, label, Icon }) => {
    const isSelected = formData.role === value;
    return (
      <label
        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition w-full
          ${isSelected ? "bg-indigo-50 border-indigo-600 shadow-md" :
                         "bg-gray-50 border-gray-300 hover:bg-gray-100"}`}
      >
        <input
          type="radio"
          name="role"
          value={value}
          checked={isSelected}
          onChange={handleChange}
          className="hidden"
        />
        <Icon size={20} className={isSelected ? "text-indigo-600" : "text-gray-500"} />
        <div>
          <p className={`font-semibold ${isSelected ? "text-indigo-900" : "text-gray-700"}`}>
            {label}
          </p>
          <small className="text-gray-500">
            {value === "owner" ? "List & manage properties" : "Find rooms & contact owners"}
          </small>
        </div>
      </label>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* FORM SIDE */}
        <div className="p-8 lg:p-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            {/* <img src={LOGO} className="w-12 h-12 rounded-full border object-cover" /> */}
            <div>
              <h1 className="text-2xl font-bold">
                Room<span className="text-indigo-600">Finder</span>
              </h1>
              <p className="text-gray-500 text-sm">Create your account</p>
            </div>
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="p-3 rounded border border-red-300 bg-red-50 text-red-600 mb-4">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* ROLE SELECTION */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">I am a</p>
              <div className="grid grid-cols-2 gap-4">
                <RoleCard value="owner" label="Property Owner" Icon={Building} />
                <RoleCard value="user" label="Room Finder" Icon={Home} />
              </div>
            </div>

            {/* FULL NAME */}
            <div>
              <label className="font-medium text-gray-700 text-sm">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="w-full px-4 py-3 rounded-lg border"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
              />
              <ErrorText msg={errors.fullName} />
            </div>

            {/* PHONE */}
            <div>
              <label className="font-medium text-gray-700 text-sm">Phone</label>
              <input
                type="text"
                name="phone"
                maxLength="10"
                className="w-full px-4 py-3 rounded-lg border"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
              />
              <ErrorText msg={errors.phone} />
            </div>

            {/* EMAIL */}
            <div>
              <label className="font-medium text-gray-700 text-sm">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg border"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
              />
              <ErrorText msg={errors.email} />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="font-medium text-gray-700 text-sm">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full px-4 py-3 rounded-lg border"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
              <ErrorText msg={errors.password} />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="font-medium text-gray-700 text-sm">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full px-4 py-3 rounded-lg border"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirm((p) => !p)}
                >
                  {showConfirm ? <EyeOff /> : <Eye />}
                </span>
              </div>
              <ErrorText msg={errors.confirmPassword} />
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE BANNER */}
        <div className="hidden lg:flex bg-indigo-600 items-center justify-center text-white p-10">
          <h2 className="text-3xl font-bold leading-snug">
            Find Rooms, PGs, Flats <br /> or List Your Property Easily
          </h2>
        </div>
      </div>
    </div>
  );
}
