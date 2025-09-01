import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Trash2 } from "lucide-react";

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const fetchBuses = async () => {
    const snapshot = await getDocs(collection(db, "buses"));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBuses(list);
    setFiltered(list);
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      const term = search.toLowerCase();
      setFiltered(
        buses.filter((bus) =>
          `${bus.source} ${bus.destination} ${bus.driverName}`.toLowerCase().includes(term)
        )
      );
    }, 300);
    return () => clearTimeout(delay);
  }, [search, buses]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this bus?")) {
      await deleteDoc(doc(db, "buses", id));
      fetchBuses();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">🚌 Manage Buses</h1>

      <input
        type="text"
        className="mb-4 p-2 border rounded-md w-full max-w-md"
        placeholder="Search by route or driver..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-purple-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Bus Type</th>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Driver</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((bus, i) => (
              <tr key={bus.id} className="border-b hover:bg-purple-50">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2 capitalize">{bus.busType}</td>
                <td className="px-4 py-2">{bus.source} → {bus.destination}</td>
                <td className="px-4 py-2">{bus.driverName}</td>
                <td className="px-4 py-2">{bus.contact}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDelete(bus.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No buses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBuses;
