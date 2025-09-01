import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-green-400">
      {/* Outer Glow Ring */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      >
        <div className="h-20 w-20 rounded-full border-4 border-t-green-500 border-r-green-400 border-b-transparent border-l-transparent shadow-[0_0_20px_rgba(34,197,94,0.8)]"></div>
        {/* Inner Pulse Circle */}
        <motion.div
          className="absolute h-10 w-10 rounded-full bg-green-500/30"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="mt-6 text-lg font-semibold tracking-wide text-green-400 drop-shadow-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
