import React from "react";
import { motion } from "framer-motion";

const LoadingBar = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-green-400">
      {/* Bar Container */}
      <div className="w-64 h-3 bg-gray-800/70 rounded-full overflow-hidden shadow-inner border border-gray-700">
        {/* Animated Bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-green-500 via-green-400 to-green-600 shadow-[0_0_15px_rgba(34,197,94,0.9)]"
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
        />
      </div>

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

export default LoadingBar;
