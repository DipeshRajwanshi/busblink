import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DriverDashboard from "./pages/driver/DriverDashboard";
import UserDashboard from "./pages/user/UserDashboard";

// Components
import Navbar from "./components/layout/Navbar";
import LoadingSpinner from "./components/common/LoadingSpinner"; // Optional loading spinner

// Auth
import { useAuth } from "./context/Auth";
import Footer from "./components/layout/Footer";
import NearbyStops from "./pages/user/NearByStops";
import Profile from "./pages/user/Profile";
import BusDetails from "./pages/user/BusDetails";
import DriverPostInfo from "./pages/driver/DriverPostInfo"
import ManageSchedule from "./pages/driver/ManageSchedule";
import DriverProfile from "./pages/driver/DriverProfile";

const App = () => {
  const { user, role, loading } = useAuth();

  // Show a loading spinner while Firebase is checking the auth state
  if (loading) return <LoadingSpinner />;

  // 🔒 Protect dashboard routes by user role
  const ProtectedRoute = ({ allowedRoles, children }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;
    return children;
  };

  // 🔁 Redirect logged-in users away from login/register
  const RedirectIfLoggedIn = ({ children }) => {
    if (user) return <Navigate to={`/${role}/dashboard`} replace />;
    return children;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Login and Register (only for guests) */}
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfLoggedIn>
              <Register />
            </RedirectIfLoggedIn>
          }
        />

        {/* Dashboards (protected by role) */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/dashboard"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/profile"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/postinfo"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverPostInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/manageschedule"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <ManageSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/nearbystops"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <NearbyStops />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/busdetails"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <BusDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/nearbystops"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <NearbyStops />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route (unknown paths) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
