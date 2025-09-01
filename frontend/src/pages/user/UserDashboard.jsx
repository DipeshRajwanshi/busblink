import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Bus, User, Clock, Navigation } from "lucide-react";

const UserDashboard = () => {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-10">
      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-wide">
            <span className="text-green-400">E-Bus</span> User Dashboard
          </h1>
          {/* 🔹 Removed duplicate Logout button here 
              since Navbar already has Logout */}
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Nearby Stops */}
          <Link
            to="/user/nearbystops"
            className="group bg-gray-900/60 border border-gray-700 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:border-green-500"
          >
            <MapPin className="text-green-400 mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h2 className="text-xl font-bold mb-2">Nearby Bus Stops</h2>
            <p className="text-gray-300">Find bus stops closest to your location.</p>
          </Link>

          {/* Bus Routes / Details */}
          <Link
            to="/user/busdetails"
            className="group bg-gray-900/60 border border-gray-700 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:border-green-500"
          >
            <Bus className="text-green-400 mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h2 className="text-xl font-bold mb-2">Bus Routes & Details</h2>
            <p className="text-gray-300">Check routes, ETA, and bus details.</p>
          </Link>

          {/* Live Tracking */}
          <Link
            to="/user/live-tracking"
            className="group bg-gray-900/60 border border-gray-700 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:border-green-500"
          >
            <Navigation className="text-green-400 mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h2 className="text-xl font-bold mb-2">Live Bus Tracking</h2>
            <p className="text-gray-300">Track buses in real-time on the map.</p>
          </Link>

          {/* Schedule */}
          <Link
            to="/user/schedule"
            className="group bg-gray-900/60 border border-gray-700 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:border-green-500"
          >
            <Clock className="text-green-400 mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h2 className="text-xl font-bold mb-2">Schedule</h2>
            <p className="text-gray-300">View bus availability and timings.</p>
          </Link>

          {/* Profile */}
          <Link
            to="/user/profile"
            className="group bg-gray-900/60 border border-gray-700 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:border-green-500"
          >
            <User className="text-green-400 mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h2 className="text-xl font-bold mb-2">Profile</h2>
            <p className="text-gray-300">Manage your personal details.</p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;
