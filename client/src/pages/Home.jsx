import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section with Enhanced Gradient */}
      <section className="relative min-h-screen lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 lg:pt-0">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition">
                  ✨ Create Beautiful Pages in Minutes
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Generate a <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">theme</span><br />Build your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">vibe</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed">
                  VibeKit Studio is your all-in-one page builder. Select a design theme, customize your mini-site with our intuitive editor, and publish to a public URL that loads lightning fast.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link 
                  to="/app"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  Create Your First Page
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link 
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-lg"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Right Visual Preview */}
            <div className="hidden lg:block relative h-96">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
                    <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded"></div>
                    <div className="h-2 bg-gradient-to-r from-pink-400 to-blue-400 rounded"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-700 rounded w-full"></div>
                    <div className="h-3 bg-slate-700 rounded w-5/6"></div>
                  </div>
                  <div className="pt-4 grid grid-cols-3 gap-2">
                    <div className="h-20 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg border border-blue-400/50"></div>
                    <div className="h-20 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-lg border border-purple-400/50"></div>
                    <div className="h-20 bg-gradient-to-br from-pink-500/30 to-pink-600/30 rounded-lg border border-pink-400/50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Why Creators Love VibeKit
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, customize, and publish stunning pages without touching a line of code
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100/50 p-8 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-blue-400/0 group-hover:from-blue-400/10 group-hover:to-transparent rounded-2xl transition-colors duration-300"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  🎨
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  6+ Beautiful Themes
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Minimal, Neo-brutal, Dark Neon, Pastel, Luxury, and Retro. Each with carefully crafted color palettes and typography that work perfectly together.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100/50 p-8 rounded-2xl border border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 to-purple-400/0 group-hover:from-purple-400/10 group-hover:to-transparent rounded-2xl transition-colors duration-300"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  ⚡
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Lightning-Fast Performance
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Serverless backend on Netlify. Your published pages load in milliseconds, with 99.9% uptime guaranteed.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-pink-50 to-pink-100/50 p-8 rounded-2xl border border-pink-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/0 to-pink-400/0 group-hover:from-pink-400/10 group-hover:to-transparent rounded-2xl transition-colors duration-300"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  ✏️
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Drag-and-Drop Editor
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Live preview on desktop, tablet, and mobile. Reorder sections, edit content, and see changes instantly—no coding required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Presets Showcase - Premium Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Vibe
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Six carefully crafted theme presets, each with a unique personality. Design tokens include color palettes, typography, spacing, and micro-interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Theme 1: Minimal / Editorial */}
            <div className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="relative h-72 bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden">
                {/* Minimal Theme Preview */}
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="h-1 w-12 bg-black mb-6"></div>
                    <div className="space-y-3 mb-8">
                      <div className="h-3 w-3/4 bg-gray-300 rounded-sm"></div>
                      <div className="h-2 w-full bg-gray-200 rounded-sm"></div>
                      <div className="h-2 w-5/6 bg-gray-200 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-20 bg-gray-200 rounded-sm"></div>
                    <div className="h-2 w-3/4 bg-gray-300 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Minimal</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Clean, editorial, and professional. Perfect for portfolios and startups that value clarity over excess.
                </p>
                <div className="flex items-center gap-4 mb-6 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
                    B&W Colors
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                    Serif Type
                  </span>
                </div>
                <Link 
                  to="/app"
                  className="inline-block w-full text-center bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-black transition-all duration-300 group-hover:shadow-lg"
                >
                  Start with Minimal
                </Link>
              </div>
            </div>

            {/* Theme 2: Neo-Brutal / Dark Neon */}
            <div className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="relative h-72 bg-gradient-to-b from-gray-900 via-slate-800 to-black overflow-hidden">
                {/* Neo-Brutal Theme Preview */}
                <div className="p-6 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-6 w-8 bg-cyan-400 rounded-md"></div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-gradient-to-r from-cyan-400 to-transparent rounded-sm"></div>
                      <div className="h-3 w-4/5 bg-gradient-to-r from-magenta-500 to-transparent rounded-sm"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 border-2 border-cyan-400 rounded-lg flex items-center justify-center text-cyan-400 text-xs font-bold">◆</div>
                    <div className="h-16 border-2 border-magenta-500 rounded-lg flex items-center justify-center text-magenta-500 text-xs font-bold">■</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 p-8">
                <h3 className="text-2xl font-bold text-white mb-3">Neo-Brutal</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  Bold, geometric, dark. Ideal for tech startups, creative studios, and brands that dare to be different.
                </p>
                <div className="flex items-center gap-4 mb-6 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    Neon Colors
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-magenta-500 rounded-full"></span>
                    Sans Type
                  </span>
                </div>
                <Link 
                  to="/app"
                  className="inline-block w-full text-center bg-gradient-to-r from-cyan-400 to-magenta-500 text-black font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 group-hover:scale-105"
                >
                  Start with Neo-Brutal
                </Link>
              </div>
            </div>

            {/* Theme 3: Luxury / Serif */}
            <div className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="relative h-72 bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 overflow-hidden">
                {/* Luxury Theme Preview */}
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>✦</div>
                    <div className="space-y-4 mt-6 text-amber-900/80" style={{ fontFamily: 'Georgia, serif' }}>
                      <div className="h-4 w-3/4 bg-gradient-to-r from-amber-900 to-transparent rounded-sm"></div>
                      <div className="h-3 w-4/5 bg-amber-200 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-20 bg-gradient-to-br from-amber-800/20 to-amber-600/20 border-2 border-amber-900/30 rounded-lg"></div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 border-t-4 border-amber-900">
                <h3 className="text-2xl font-bold text-amber-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>Luxury</h3>
                <p className="text-amber-900/70 mb-4 text-sm leading-relaxed">
                  Elegant, sophisticated, refined. Perfect for luxury brands, boutiques, and high-end services.
                </p>
                <div className="flex items-center gap-4 mb-6 text-xs text-amber-900/60">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-amber-900 rounded-full"></span>
                    Gold Tones
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-amber-700 rounded-full"></span>
                    Serif Type
                  </span>
                </div>
                <Link 
                  to="/app"
                  className="inline-block w-full text-center bg-amber-900 text-white font-semibold py-3 rounded-lg hover:bg-amber-950 transition-all duration-300 group-hover:shadow-lg"
                >
                  Start with Luxury
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Themes Teaser */}
          <div className="mt-16 p-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Plus 3 More Themes</h3>
            <p className="text-slate-300 mb-6">Pastel / Soft, Dark / Neon, and Retro / Pixel presets with their own unique character and carefully chosen design tokens</p>
            <Link 
              to="/app"
              className="inline-block bg-white text-slate-900 font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-slate-50"
            >
              Explore All Themes
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">50K+</div>
              <p className="text-blue-100 text-lg">Pages Created</p>
              <p className="text-blue-200 text-sm mt-2">And growing daily</p>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">10K+</div>
              <p className="text-blue-100 text-lg">Happy Creators</p>
              <p className="text-blue-200 text-sm mt-2">Building their vibe</p>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">99.9%</div>
              <p className="text-blue-100 text-lg">Uptime Guarantee</p>
              <p className="text-blue-200 text-sm mt-2">Always available</p>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">&lt;100ms</div>
              <p className="text-blue-100 text-lg">Page Load Time</p>
              <p className="text-blue-200 text-sm mt-2">Lightning fast</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Enhanced */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Ready to Build Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Perfect Vibe</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators building beautiful, fast, personalized pages. Start completely free—no credit card required. Create, publish, and share in minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link 
              to="/app"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 text-lg shadow-lg"
            >
              Create Your Page Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link 
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-200 text-gray-900 font-bold rounded-xl hover:bg-gray-300 transition-all duration-300 text-lg"
            >
              Sign In
            </Link>
          </div>

          <p className="text-sm text-gray-500 pt-8">
            No credit card required • Free forever plan available • Upgrade anytime
          </p>
        </div>
      </section>

      {/* Footer Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-bold mb-4">About VibeKit</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering creators worldwide to build, design, and publish stunning pages without coding. Pure creativity, pure vibes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/app" className="text-gray-400 hover:text-white transition">Create a Page</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white transition">Sign In</Link></li>
                <li><Link to="/signup" className="text-gray-400 hover:text-white transition">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Built On</h3>
              <p className="text-gray-400 text-sm">
                Fast, secure, and scalable. Powered by Netlify with PostgreSQL database and serverless functions.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 VibeKit Studio. All rights reserved. Building beautiful vibes, together.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;