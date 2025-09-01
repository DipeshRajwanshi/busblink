import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const uid = auth.currentUser?.uid;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        setForm({ name: data.name || "", email: data.email || "", phone: data.phone || "" });
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const uid = auth.currentUser?.uid;
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, {
        name: form.name,
        phone: form.phone,
      });
      setEditing(false);
      fetchUserData(); // refresh
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-20 text-white text-lg animate-pulse">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex justify-center items-start">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          User Profile
        </h2>

        {!editing ? (
          <div className="space-y-4 text-gray-200">
            <p>
              <strong className="text-green-400">Name:</strong>{" "}
              {userData?.name || "N/A"}
            </p>
            <p>
              <strong className="text-green-400">Email:</strong>{" "}
              {userData?.email || auth.currentUser?.email}
            </p>
            <p>
              <strong className="text-green-400">Phone:</strong>{" "}
              {userData?.phone || "N/A"}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="mt-6 w-full py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium shadow-md hover:opacity-90 transition"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-5">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-600 text-white focus:ring-2 focus:ring-green-500 outline-none"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              disabled
              className="w-full px-4 py-2 rounded-lg bg-gray-700/60 text-gray-400 border border-gray-600 cursor-not-allowed"
            />

            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-600 text-white focus:ring-2 focus:ring-green-500 outline-none"
            />

            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow-md hover:opacity-90 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-gray-500 to-gray-700 text-white font-medium shadow-md hover:opacity-90 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
