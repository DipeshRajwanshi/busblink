import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaBusAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden px-4 py-10 transition-colors duration-500">
      {/* Background Blobs */}
      <div className="absolute w-56 h-56 bg-purple-400 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob"></div>
      <div className="absolute w-56 h-56 bg-pink-400 dark:bg-pink-700 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
      <div className="absolute w-56 h-56 bg-yellow-400 dark:bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>

      {/* Footer Content */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-100">
        {/* Logo + Description */}
        <div className="bg-white/40 dark:bg-gray-800/60 backdrop-blur-lg rounded-xl p-4 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <FaBusAlt className="text-2xl text-blue-200 dark:text-green-400" />
            <span className="text-xl font-bold tracking-wide text-blue-100 dark:text-green-400">
              BusBlink
            </span>
          </div>
          <p className="text-sm text-gray-200 dark:text-gray-400">
            Real-time bus arrival tracking system designed to make your public
            transport experience smoother, smarter, and faster.
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-white/40 dark:bg-gray-800/60 backdrop-blur-lg rounded-xl p-4 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-white dark:text-green-400">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline hover:text-blue-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline hover:text-blue-200">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="hover:underline hover:text-blue-200"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/user/dashboard"
                className="hover:underline hover:text-blue-200"
              >
                User Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="bg-white/40 dark:bg-gray-800/60 backdrop-blur-lg rounded-xl p-4 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-white dark:text-green-400">
            Contact Us
          </h3>
          <ul className="text-sm space-y-2 text-gray-200 dark:text-gray-400">
            <li>Email: support@busblink.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: New Delhi, India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="bg-white/40 dark:bg-gray-800/60 backdrop-blur-lg rounded-xl p-4 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-white dark:text-green-400">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-green-300">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-green-300">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-green-300">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-green-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-400 dark:border-gray-700 mt-8 pt-4 text-center text-sm text-gray-200 dark:text-gray-400">
        © {new Date().getFullYear()} BusBlink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
