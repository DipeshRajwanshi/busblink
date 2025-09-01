import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Trash2 } from "lucide-react";

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const fetchDrivers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const list = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((u) => u.role === "driver");
    setDrivers(list);
    setFiltered(list);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const term = search.toLowerCase();
      setFiltered(
        drivers.filter((d) =>
          `${d.firstName} ${d.lastName} ${d.email}`.toLowerCase().includes(term)
        )
      );
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, drivers]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      await deleteDoc(doc(db, "users", id));
      fetchDrivers();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-green-700 mb-6">
        🧑‍✈️ Manage Drivers
      </h1>

      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <input
          type="text"
          className="p-2 border rounded-md w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="text-sm text-gray-500">
          Showing {filtered.length} of {drivers.length} drivers
        </span>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-100">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="bg-green-100 text-green-900 font-semibold">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((driver, i) => (
              <tr key={driver.id} className="border-b hover:bg-green-50 transition-all">
                <td className="px-4 py-3 font-medium">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {driver.firstName} {driver.lastName}
                    </span>
                    <span className="text-xs text-white bg-green-500 px-2 py-0.5 rounded-full">
                      Driver
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">{driver.email}</td>
                <td className="px-4 py-3">{driver.phone || "N/A"}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(driver.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete Driver"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                  No drivers found for your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDrivers;
