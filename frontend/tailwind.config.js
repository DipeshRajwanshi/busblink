module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class', // ← Add this
  theme: {
    extend: {
  animation: {
    "fade-in": "fadeIn 0.6s ease-out",
    pulse: "pulse 1s ease-in-out infinite",
    shake: "shake 0.5s ease-in-out",
  },
  keyframes: {
    fadeIn: {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
    shake: {
      "0%, 100%": { transform: "translateX(0)" },
      "25%": { transform: "translateX(-5px)" },
      "75%": { transform: "translateX(5px)" },
    },
  },
}
,
  },
  plugins: [],
}
