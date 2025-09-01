import React from "react";
import { NavLink } from "react-router-dom";
import { MapPinned, Bus, User, LayoutDashboard } from "lucide-react";

const UserSidebar = () => {
  const navItems = [
    { name: "Dashboard", path: "/user/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Nearby Stops", path: "/user/nearbystops", icon: <MapPinned size={18} /> },
    { name: "Bus Details", path: "/user/busdetails", icon: <Bus size={18} /> },
    { name: "Profile", path: "/user/profile", icon: <User size={18} /> },
  ];

  return (
    <aside className="w-60 min-h-screen bg-gradient-to-b from-indigo-600 to-blue-600 text-white p-4 space-y-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">E-Bus System</h2>
      <nav className="flex flex-col gap-3">
        {navItems.map(({ name, path, icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition duration-300 ${
                isActive ? "bg-white text-blue-600" : "hover:bg-blue-500"
              }`
            }
          >
            {icon}
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default UserSidebar;
