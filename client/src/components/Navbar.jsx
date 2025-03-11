import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold">Fitness Tracker</Link>
          </div>
          
          {/* Desktop navigation links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/' 
                    ? 'text-white bg-blue-700' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                Home
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/dashboard' 
                        ? 'text-white bg-blue-700' 
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/workouts" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/workouts' 
                        ? 'text-white bg-blue-700' 
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                    }`}
                  >
                    Workouts
                  </Link>
                  <Link 
                    to="/weight-logs" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/weight-logs' 
                        ? 'text-white bg-blue-700' 
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                    }`}
                  >
                    Weight Logs
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Auth links */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {!isAuthenticated ? (
                <div className="flex space-x-2">
                  <Link 
                    to="/login" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-blue-700 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="px-3 py-2 rounded-md text-sm font-medium bg-white text-blue-700 hover:bg-blue-50"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-blue-700 hover:text-white"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon for closing menu */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/'
                ? 'text-white bg-blue-700'
                : 'text-blue-100 hover:bg-blue-700 hover:text-white'
            }`}
          >
            Home
          </Link>
          
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/dashboard'
                    ? 'text-white bg-blue-700'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/workouts"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/workouts'
                    ? 'text-white bg-blue-700'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                Workouts
              </Link>
              <Link
                to="/weight-logs"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/weight-logs'
                    ? 'text-white bg-blue-700'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                Weight Logs
              </Link>
            </>
          )}
          
          {!isAuthenticated ? (
            <div className="space-y-1 pt-2">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;