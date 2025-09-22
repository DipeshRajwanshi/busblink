import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { getDoc, setDoc, doc } from "firebase/firestore"; 
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  // helper: ensure user doc exists
  const createUserDocIfMissing = async (uid, user) => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        role: "user", // default role
        createdAt: Date.now(),
      });
      console.log("New Firestore user created:", uid);
      return { role: "user" };
    }

    return docSnap.data();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // ensure Firestore user doc exists
      const userData = await createUserDocIfMissing(uid, userCred.user);

      navigate(`/${userData.role || "user"}/dashboard`);
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
      const uid = userCred.user.uid;

      // ensure Firestore user doc exists
      const userData = await createUserDocIfMissing(uid, userCred.user);

      navigate(`/${userData.role || "user"}/dashboard`);
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google Sign-in failed.");
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password flow can be implemented here.");
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden px-4 transition-colors duration-500">
      {/* Background Blobs */}
      <div className="absolute w-72 h-72 bg-purple-400 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute w-72 h-72 bg-pink-400 dark:bg-pink-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute w-72 h-72 bg-yellow-400 dark:bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Login Card */}
      <div className="relative bg-white/40 dark:bg-gray-800/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in transition-colors duration-500">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900 dark:text-white">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-200 p-3 rounded-lg mb-4 text-sm flex items-center space-x-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-500 shadow-sm transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-500 shadow-sm transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-700 dark:text-blue-400 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 dark:from-blue-600 dark:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 text-white py-2 rounded-lg font-medium transition duration-300 transform hover:scale-[1.02] shadow-md"
          >
            Login
          </button>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300 flex items-center justify-center space-x-2 shadow-sm"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span>Sign in with Google</span>
          </button>
        </form>

        {/* Register Link */}
        <p className="text-sm mt-5 text-center text-gray-700 dark:text-gray-300">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-800 dark:text-blue-400 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
