"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, ChevronDown, LogOut, User, BarChart2, Home, Activity, Weight } from "lucide-react"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const isAuthenticated = localStorage.getItem("token") !== null

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    navigate("/login")
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-800 to-purple-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Activity className="h-8 w-8 text-white mr-2" />
              <span className="text-white text-xl font-bold">Fitness Tracker</span>
            </Link>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === "/"
                    ? "text-white bg-indigo-700"
                    : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
                }`}
              >
                <span className="flex items-center">
                  <Home className="h-4 w-4 mr-1.5" />
                  Home
                </span>
              </Link>

              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === "/dashboard"
                        ? "text-white bg-indigo-700"
                        : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center">
                      <BarChart2 className="h-4 w-4 mr-1.5" />
                      Dashboard
                    </span>
                  </Link>
                  <Link
                    to="/workouts"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === "/workouts"
                        ? "text-white bg-indigo-700"
                        : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center">
                      <Activity className="h-4 w-4 mr-1.5" />
                      Workouts
                    </span>
                  </Link>
                  <Link
                    to="/weight-logs"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === "/weight-logs"
                        ? "text-white bg-indigo-700"
                        : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center">
                      <Weight className="h-4 w-4 mr-1.5" />
                      Weight Logs
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Auth links */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {!isAuthenticated ? (
                <div className="flex space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-indigo-700 hover:bg-indigo-50 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors"
                  >
                    <User className="h-5 w-5 mr-1.5" />
                    <span>Profile</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsProfileOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      >
                        <span className="flex items-center">
                          <LogOut className="h-4 w-4 mr-1.5" />
                          Logout
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-100 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/"
                ? "text-white bg-indigo-700"
                : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Home
            </span>
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/dashboard"
                    ? "text-white bg-indigo-700"
                    : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2" />
                  Dashboard
                </span>
              </Link>
              <Link
                to="/workouts"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/workouts"
                    ? "text-white bg-indigo-700"
                    : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Workouts
                </span>
              </Link>
              <Link
                to="/weight-logs"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/weight-logs"
                    ? "text-white bg-indigo-700"
                    : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center">
                  <Weight className="h-5 w-5 mr-2" />
                  Weight Logs
                </span>
              </Link>
            </>
          )}

          {!isAuthenticated ? (
            <div className="space-y-1 pt-2">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                handleLogout()
                setIsMenuOpen(false)
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white"
            >
              <span className="flex items-center">
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;