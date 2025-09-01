import React from "react";
import { Home, Users, Bus, Settings } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-md border-r border-gray-700 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <nav className="flex flex-col gap-4">
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition">
            <Home className="w-5 h-5" />
            Dashboard
          </button>
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition">
            <Users className="w-5 h-5" />
            Users
          </button>
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition">
            <Bus className="w-5 h-5" />
            Buses
          </button>
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Dashboard</h2>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition">
            Log Out
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-gray-700 hover:scale-[1.02] transition">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold mt-2">1,254</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-gray-700 hover:scale-[1.02] transition">
            <h3 className="text-lg font-semibold">Active Buses</h3>
            <p className="text-3xl font-bold mt-2">58</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-gray-700 hover:scale-[1.02] transition">
            <h3 className="text-lg font-semibold">Pending Reports</h3>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="mt-10 p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3">User</th>
                <th className="py-3">Action</th>
                <th className="py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-white/5 transition">
                <td className="py-3">John Doe</td>
                <td>Booked Bus #24</td>
                <td>Aug 15, 2025</td>
              </tr>
              <tr className="hover:bg-white/5 transition">
                <td className="py-3">Alice Smith</td>
                <td>Reported Delay</td>
                <td>Aug 14, 2025</td>
              </tr>
              <tr className="hover:bg-white/5 transition">
                <td className="py-3">David Lee</td>
                <td>Updated Profile</td>
                <td>Aug 13, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
