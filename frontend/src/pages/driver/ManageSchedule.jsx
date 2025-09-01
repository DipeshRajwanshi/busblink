import React, { useState } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { PlusCircle, Trash2 } from "lucide-react";

const ManageSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [form, setForm] = useState({
    route: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSchedule = () => {
    if (!form.route || !form.date || !form.time) return;
    const newSchedule = { id: uuidv4(), ...form };
    setSchedules([...schedules, newSchedule]);
    setForm({ route: "", date: "", time: "" });
  };

  const handleDelete = (id) => {
    setSchedules(schedules.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-green-100 p-6">
      <motion.div
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-green drop-shadow-lg">
          🗓 Manage Schedule
        </h2>

        {/* Add Schedule Form */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <input
            type="text"
            name="route"
            placeholder="Route Name"
            value={form.route}
            onChange={handleChange}
            className="bg-gray-800/80 border border-gray-600 p-3 rounded-lg text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="bg-gray-800/80 border border-gray-600 p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="bg-gray-800/80 border border-gray-600 p-3 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleAddSchedule}
            className="col-span-1 sm:col-span-3 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-600 text-white py-3 rounded-lg shadow-lg hover:from-green-500 hover:to-green-500 transition transform hover:scale-[1.02]"
          >
            <PlusCircle className="w-5 h-5" /> Add Schedule
          </button>
        </motion.div>

        {/* Schedule List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {schedules.length === 0 ? (
            <p className="text-center text-gray-400 italic">
              No schedules added yet.
            </p>
          ) : (
            schedules.map((item) => (
              <motion.div
                key={item.id}
                className="bg-gray-800/80 border border-gray-700 rounded-xl p-5 shadow-lg flex justify-between items-center hover:border-green-500 transition duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <h4 className="font-semibold text-green-400 text-lg">
                    {item.route}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {item.date} — {item.time}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 transition"
                >
                  <Trash2 className="w-5 h-5" /> Delete
                </button>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ManageSchedule;
