import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Post Bus Info",
    description: "Add your bus number, type, and contact details.",
    icon: ClipboardDocumentListIcon,
    path: "/driver/postinfo",
  },
  {
    name: "Manage Schedule",
    description: "Update your availability and trip timings.",
    icon: CalendarDaysIcon,
    path: "/driver/manageschedule",
  },
  {
    name: "Profile",
    description: "View and update your driver profile.",
    icon: UserCircleIcon,
    path: "/driver/profile",
  },
];

const DriverDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent animate-fade-in-down">
          Driver Dashboard
        </h1>

        {/* Features Section */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 animate-fade-in-up">
          {features.map((feature, idx) => (
            <div
              key={idx}
              onClick={() => navigate(feature.path)}
              className="cursor-pointer group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-green-500 shadow-lg rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
            >
              <feature.icon className="h-12 w-12 text-green-400 group-hover:text-green-500 mb-4 transition-colors duration-300" />
              <h3 className="text-xl font-semibold text-green-300 group-hover:text-green-400">
                {feature.name}
              </h3>
              <p className="text-sm text-gray-300 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Live Bus Location Section */}
        <div className="mt-16 bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl shadow-2xl p-8 text-center animate-fade-in-up">
          <MapPinIcon className="h-12 w-12 text-green-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-green-400">Live Bus Location</h2>
          <p className="text-gray-400 mt-2 max-w-lg mx-auto">
            Track your bus in real time. Update your location and make it easier
            for users to find you quickly.
          </p>
          <button
            onClick={() => navigate("/driver/tracker")}
            className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:scale-105"
          >
            Go to Live Tracker
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
