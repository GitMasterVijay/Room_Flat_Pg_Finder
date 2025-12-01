import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import OwnerLayout from "./layouts/OwnerLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OwnerDashboard from "./pages/OwnerDashboard";
import AddProperty from "./pages/AddProperty";
import OwnerProfile from "./pages/OwnerProfile";
import OwnerNotifications from "./pages/OwnerNotifications";
import OwnerSettings from "./pages/OwnerSettings";
import OwnerMyProperties from "./pages/OwnerMyProperties";
import ListingPage from "./pages/ListingCard";
import Feedback from "./pages/Feedback";

// ✅ Missing import added
import ViewPropertiesDetails from "./components/ViewPropertiesDetails";
import Complaints from "./pages/Complaints";
import UserProfile from "./pages/UserProfile";

export default function App() {
  return (
    <Routes>
      {/* DEFAULT: Always show Login at root */}
      <Route path="/" element={<Login />} />

      {/* PUBLIC USER ROUTES (Header + Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/user/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/listingPage" element={<ListingPage />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="viewPropertiesDetails" element={<ViewPropertiesDetails />} />
        <Route path="/property/:id" element={<ViewPropertiesDetails />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/user/profile" element={<UserProfile />} />
      </Route>

      {/* AUTH ROUTES (NO HEADER, NO FOOTER) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* OWNER ROUTES (ONLY OWNER HEADER) */}
      <Route path="/owner" element={<OwnerLayout />}>
        <Route path="dashboard" element={<OwnerDashboard />} />
        <Route path="addProperties" element={<AddProperty />} />
        <Route path="ownerProfile" element={<OwnerProfile />} />
        <Route path="ownerNotification" element={<OwnerNotifications />} />
        <Route path="ownerSetting" element={<OwnerSettings />} />
        <Route path="ownerProperties" element={<OwnerMyProperties />} />
        <Route path="my-properties" element={<OwnerMyProperties />} />

        {/* ✅ Now it will work */}
      
      </Route>

      {/* Fallback: any unknown route goes to Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
