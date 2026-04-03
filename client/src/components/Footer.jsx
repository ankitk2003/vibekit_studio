import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VK</span>
              </div>
              <span className="font-bold text-base sm:text-lg text-white">VibeKit Studio</span>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed">
              Create stunning personalized pages without any coding. Express yourself with VibeKit.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm sm:text-base">Product</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-gray-300 active:text-white focus:text-white transition py-2 block">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 active:text-white focus:text-white transition py-2 block">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 active:text-white focus:text-white transition py-2 block">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 active:text-white focus:text-white transition py-2 block">
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#" className="text-gray-300 active:text-white focus:text-white transition py-2 block">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 active:text-white focus:text-white transition py-2 block">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 active:text-white focus:text-white transition py-2 block">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 active:text-white focus:text-white transition py-2 block">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#" className="text-gray-300 active:text-white focus:text-white transition py-2 block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 active:text-white focus:text-white transition py-2 block">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 active:text-white focus:text-white transition py-2 block">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 active:text-white focus:text-white transition py-2 block">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} VibeKit Studio. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <a href="#" className="text-gray-300 active:text-white focus:text-white transition text-xs sm:text-sm py-2">
                Twitter
              </a>
              <a href="#" className="text-gray-300 active:text-white focus:text-white transition text-xs sm:text-sm py-2">
                GitHub
              </a>
              <a href="#" className="text-gray-300 active:text-white focus:text-white transition text-xs sm:text-sm py-2">
                Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;