import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import {
  Menu,
  X,
  LogOut,
  User,
  LogIn,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBusAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const roleRoute = {
    admin: "/admin/dashboard",
    driver: "/driver/dashboard",
    user: "/user/dashboard",
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className="sticky top-0 z-50 px-6 py-3 shadow-lg 
      bg-white/30 dark:bg-gray-800/50 backdrop-blur-md 
      border-b border-white/20 dark:border-gray-700 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold tracking-wide flex items-center gap-2 text-green-800 dark:text-green-400"
        >
          <FaBusAlt /> <span className="hidden sm:inline">BusBlink</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link
                to={roleRoute[role]}
                className="font-medium text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-transform duration-300 hover:scale-105"
              >
                Dashboard
              </Link>

              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg 
                  bg-white/20 dark:bg-gray-700/40 
                  hover:bg-white hover:text-green-600 
                  dark:hover:bg-gray-700 dark:hover:text-green-400 
                  transition text-gray-800 dark:text-gray-200"
                >
                  <User className="h-5 w-5" />
                  <span>{user.email.split("@")[0]}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-44 
                      bg-white dark:bg-gray-800 
                      text-gray-700 dark:text-gray-200 
                      rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700"
                    >
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1 text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1 text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
              >
                <UserPlus className="w-4 h-4" /> Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-800 dark:text-gray-200"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden mt-2 rounded-lg overflow-hidden 
            bg-white/40 dark:bg-gray-800/70 backdrop-blur-lg 
            border border-white/20 dark:border-gray-700 px-4 py-3"
          >
            <div className="flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    to={roleRoute[role]}
                    className="text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LogIn className="w-4 h-4" /> Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    <UserPlus className="w-4 h-4" /> Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
