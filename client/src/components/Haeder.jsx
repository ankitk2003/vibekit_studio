import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">VK</span>
          </div>
          <span className="hidden xs:inline font-bold text-lg sm:text-xl text-gray-900">VibeKit Studio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 active:text-gray-900 focus:text-gray-900 transition text-sm">
            Features
          </a>
          <a href="#templates" className="text-gray-600 active:text-gray-900 focus:text-gray-900 transition text-sm">
            Templates
          </a>
          <a href="#pricing" className="text-gray-600 active:text-gray-900 focus:text-gray-900 transition text-sm">
            Pricing
          </a>
        </div>

        {/* CTA Buttons / User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-3 border-r border-gray-200 pr-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-600 active:text-gray-900 focus:text-gray-900 transition font-medium text-sm min-h-11 px-3 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="text-gray-600 active:text-gray-900 focus:text-gray-900 transition font-medium text-sm min-h-11 px-3 py-2 flex items-center"
              >
                Sign In
              </Link>
              <Link 
                to="/app"
                className="bg-blue-600 text-white px-4 py-2 min-h-11 rounded-lg active:bg-blue-700 focus:bg-blue-700 transition font-medium text-sm flex items-center"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 min-h-11 min-w-11 flex items-center justify-center rounded-lg active:bg-gray-100 focus:bg-gray-100 transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 py-3 space-y-2">
            <a 
              href="#features" 
              className="block px-3 py-3 min-h-11 text-gray-600 active:text-gray-900 focus:text-gray-900 transition rounded-lg active:bg-gray-50 text-sm"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a 
              href="#templates" 
              className="block px-3 py-3 min-h-11 text-gray-600 active:text-gray-900 focus:text-gray-900 transition rounded-lg active:bg-gray-50 text-sm"
              onClick={() => setIsOpen(false)}
            >
              Templates
            </a>
            <a 
              href="#pricing" 
              className="block px-3 py-3 min-h-11 text-gray-600 active:text-gray-900 focus:text-gray-900 transition rounded-lg active:bg-gray-50 text-sm"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <div className="border-t border-gray-200 pt-3 mt-3">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-gray-900">
                    {user?.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-3 min-h-11 text-gray-600 active:text-gray-900 focus:text-gray-900 transition rounded-lg active:bg-gray-50 text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="block px-3 py-3 min-h-11 text-gray-600 active:text-gray-900 focus:text-gray-900 transition rounded-lg active:bg-gray-50 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/app"
                    className="block px-3 py-3 min-h-11 bg-blue-600 text-white rounded-lg active:bg-blue-700 focus:bg-blue-700 transition text-center font-medium text-sm mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;