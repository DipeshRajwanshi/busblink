// src/pages/driver/DriverPostInfo.jsx
import React, { useState } from "react";
import { db, auth } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const DriverPostInfo = () => {
  const [busNumber, setBusNumber] = useState("");
  const [busType, setBusType] = useState("Deluxe AC");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await addDoc(collection(db, "buses"), {
        busNumber,
        busType,
        contact,
        driverId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      setSuccessMsg("Bus info posted successfully!");
      setBusNumber("");
      setBusType("Deluxe AC");
      setContact("");
    } catch (err) {
      setErrorMsg("Failed to post. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex justify-center items-center px-4 py-10">
      <div className="bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-800">
        <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
          📝 Post Bus Info
        </h2>

        {/* Success Message */}
        {successMsg && (
          <div className="flex items-center gap-2 bg-green-700/20 text-green-400 border border-green-500 p-3 mb-4 rounded-lg text-sm animate-fade-in">
            <CheckCircleIcon className="h-5 w-5" />
            {successMsg}
          </div>
        )}

        {/* Error Message */}
        {errorMsg && (
          <div className="flex items-center gap-2 bg-red-700/20 text-red-400 border border-red-500 p-3 mb-4 rounded-lg text-sm animate-fade-in">
            <ExclamationTriangleIcon className="h-5 w-5" />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-2">Bus Number</label>
            <input
              type="text"
              placeholder="e.g. BA 2 KHA 1234"
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Bus Type</label>
            <select
              value={busType}
              onChange={(e) => setBusType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="Deluxe AC">Deluxe AC</option>
              <option value="Non-AC Mini">Non-AC Mini</option>
              <option value="Micro">Micro</option>
              <option value="Super Deluxe">Super Deluxe</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Driver Contact</label>
            <input
              type="tel"
              placeholder="e.g. 9800000000"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
              loading
                ? "bg-green-700/40 text-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white hover:scale-[1.02]"
            }`}
          >
            {loading ? "Posting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverPostInfo;
