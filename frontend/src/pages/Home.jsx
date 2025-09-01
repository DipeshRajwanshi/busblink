import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { Bus, LogIn, UserPlus, ArrowRight } from "lucide-react";

const busImages = [
  "/images/ebus1.jpg",
  "/images/ebus2.jpg",
  "/images/ebus3.jpg",
  "/images/ebus4.jpg",
];

const Home = () => {
  const { user, role } = useAuth();
  const [busCount, setBusCount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Animated bus counter
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 3) + 1;
      if (count > 42) count = 42;
      setBusCount(count);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide images
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % busImages.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center space-y-10 animate-fade-in">
        
        {/* Live Bus Counter */}
        <div className="flex items-center gap-2 bg-gray-800/70 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-gray-700">
          <Bus className="text-green-400" size={22} />
          <span className="font-semibold text-gray-200">
            {busCount} Active Buses Right Now
          </span>
        </div>

        {/* Hero Section */}
        <section
          className="w-full grid md:grid-cols-2 gap-10 items-center bg-gray-900/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-800"
          aria-label="E-Bus Arrival Time Prediction System"
        >
          {/* Left - Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight">
              {user ? `Welcome back${user.name ? `, ${user.name}` : ""}!` : "Welcome to the"}{" "}
              <span className="text-green-400">E-Bus</span> Arrival Time Prediction System
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Get <span className="font-semibold text-green-400">real-time bus arrival updates</span>, 
              track buses live, and enjoy a smarter public transport experience.
            </p>

            {/* Buttons */}
            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <LogIn size={20} /> Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 bg-white/90 hover:bg-white text-gray-900 font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <UserPlus size={20} /> Register
                </Link>
              </div>
            ) : (
              <Link
                to={`/${role}/dashboard`}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
              >
                Go to Dashboard <ArrowRight size={20} />
              </Link>
            )}
          </div>

          {/* Right - Image Slider */}
          <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-2xl shadow-lg border border-gray-700">
            {busImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`E-Bus ${index + 1}`}
                className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
              {busImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? "bg-green-400 scale-110" : "bg-gray-400"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
