import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import OwnerDashboard from "../pages/OwnerDashboard";
import AddProperty from "../pages/AddProperty";
import OwnerNotifications from "../pages/OwnerNotifications";
import OwnerSettings from "../pages/OwnerSettings";
import OwnerMyProperties from "../pages/OwnerMyProperties";
import ListingPage from "../pages/ListingCard";
import OwnerProfile from "../pages/OwnerProfile"; // IMPORTANT: This was missing


import ViewPropertiesDetails from "../components/ViewPropertiesDetails";

const router = createBrowserRouter([
  // 🔥 1 — AUTH PAGES (NO HEADER/FOOTER)
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // 🔥 2 — OWNER’S PAGES (OWNER HEADER + FOOTER)
  {
    path: "/owner",
    element: <OwnerLayout />,
    children: [
      { path: "dashboard", element: <OwnerDashboard /> },
      { path: "addProperties", element: <AddProperty /> },
      { path: "ownerProfile", element: <OwnerProfile /> },
      { path: "ownerNotification", element: <OwnerNotifications /> },
      { path: "ownerSetting", element: <OwnerSettings /> },
      { path: "ownerProperties", element: <OwnerMyProperties /> },
    ],
  },

  // 🔥 3 — NORMAL USER PAGES (USER HEADER + FOOTER)
  {
    element: <MainLayout />,
    children: [
      { path: "/user/home", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/listingPage", element: <ListingPage /> },
      { path: "/property/:id", element: <ViewPropertiesDetails /> }
 
    ],
  },
]);

export default router;
