import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const DriverProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    busNumber: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const uid = auth.currentUser?.uid;

  const getProfile = async () => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, profile);
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <p className="animate-pulse text-lg text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 py-10">
      <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-xl border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-transform duration-300 hover:scale-[1.02]">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
          Driver Profile
        </h2>

        <div className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={profile.fullName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Email (Disabled) */}
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-400 cursor-not-allowed"
              value={profile.email}
              disabled
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-300 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Bus Number */}
          <div>
            <label className="block text-gray-300 mb-1">Bus Number</label>
            <input
              type="text"
              name="busNumber"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={profile.busNumber}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Buttons */}
          {isEditing ? (
            <button
              onClick={handleSave}
              className="w-full py-3 mt-6 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-md transition transform hover:scale-105"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-3 mt-6 rounded-lg bg-gray-700 hover:bg-green-600 text-white font-medium shadow-md transition transform hover:scale-105"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
