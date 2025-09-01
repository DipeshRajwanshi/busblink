import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { firstName, lastName, email, password, role } = form;

    if (!firstName || !lastName || !email || !password || !role) {
      setError("All fields are required.");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      await setDoc(doc(db, "users", uid), {
        uid,
        firstName,
        lastName,
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 dark:from-gray-900 dark:via-gray-800 dark:to-black px-4 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute w-72 h-72 bg-purple-400 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute w-72 h-72 bg-pink-400 dark:bg-pink-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute w-72 h-72 bg-yellow-400 dark:bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Register Card */}
      <div className="relative bg-white/40 dark:bg-gray-800/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center text-white dark:text-blue-300 flex items-center justify-center gap-2">
          <UserPlus className="w-6 h-6" /> Create Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 animate-shake text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="flex items-center bg-white/60 dark:bg-gray-700/50 rounded-lg px-3 py-2">
            <User className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full px-3 py-2 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div className="flex items-center bg-white/60 dark:bg-gray-700/50 rounded-lg px-3 py-2">
            <User className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full px-3 py-2 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="flex items-center bg-white/60 dark:bg-gray-700/50 rounded-lg px-3 py-2">
            <Mail className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-3 py-2 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/60 dark:bg-gray-700/50 rounded-lg px-3 py-2">
            <Lock className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-3 py-2 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Role */}
          <select
            name="role"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">👤 User</option>
            <option value="driver">🚌 Driver</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-300 transform hover:scale-[1.02]"
          >
            Sign Up
          </button>
        </form>

        {/* Already have account */}
        <p className="text-sm mt-5 text-center text-gray-200 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
