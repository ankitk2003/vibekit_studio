import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Your Creative Canvas Awaits
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              VibeKit Studio lets you create stunning, personalized pages in minutes. 
              No coding required. Just pure creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/app"
                className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-50 transition text-lg shadow-lg hover:shadow-xl"
              >
                Create Your First Page
              </Link>
              <Link 
                to="/login"
                className="inline-block bg-blue-700 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-800 transition text-lg border-2 border-white"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose VibeKit Studio?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-2xl mb-4">
                ✨
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Beautiful Themes
              </h3>
              <p className="text-gray-600">
                Choose from stunning pre-designed themes or create your own custom design with ease.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center text-2xl mb-4">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Your pages load instantly. Optimized performance ensures your audience gets the best experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center text-2xl mb-4">
                🔧
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Easy Customization
              </h3>
              <p className="text-gray-600">
                Drag-and-drop editor makes it simple to customize every aspect of your page without coding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Explore Our Templates
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Start with one of our professionally designed templates or build from scratch
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Template 1: Minimal */}
            <div className="group">
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl overflow-hidden mb-4 h-64 flex items-center justify-center cursor-pointer hover:shadow-2xl transition transform group-hover:-translate-y-2">
                <div className="text-center">
                  <div className="text-white text-7xl mb-4">◻</div>
                  <p className="text-white font-semibold text-lg">Minimal Design</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Minimal</h3>
              <p className="text-gray-600 mb-4">
                Clean, simple, and elegant. Perfect for professionals and portfolios. Focuses on content with minimalist aesthetics.
              </p>
              <Link 
                to="/create"
                className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Use Template →
              </Link>
            </div>

            {/* Template 2: Vibrant */}
            <div className="group">
              <div className="relative bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-xl overflow-hidden mb-4 h-64 flex items-center justify-center cursor-pointer hover:shadow-2xl transition transform group-hover:-translate-y-2">
                <div className="text-center">
                  <div className="text-white text-7xl mb-4">🎨</div>
                  <p className="text-white font-semibold text-lg">Vibrant & Bold</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Vibrant</h3>
              <p className="text-gray-600 mb-4">
                Colorful and energetic. Great for creative projects, artists, and brands that want to stand out with personality.
              </p>
              <Link 
                to="/create"
                className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Use Template →
              </Link>
            </div>

            {/* Template 3: Professional */}
            <div className="group">
              <div className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600 rounded-xl overflow-hidden mb-4 h-64 flex items-center justify-center cursor-pointer hover:shadow-2xl transition transform group-hover:-translate-y-2">
                <div className="text-center">
                  <div className="text-white text-7xl mb-4">💼</div>
                  <p className="text-white font-semibold text-lg">Professional</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
              <p className="text-gray-600 mb-4">
                Corporate and polished. Ideal for businesses, consultants, and enterprises looking for trust and authority.
              </p>
              <Link 
                to="/create"
                className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Use Template →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">50K+</div>
              <p className="text-blue-100 text-lg">Pages Created</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">10K+</div>
              <p className="text-blue-100 text-lg">Happy Users</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">99.9%</div>
              <p className="text-blue-100 text-lg">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of creators already using VibeKit Studio. Start creating for free today.
          </p>
          <Link 
            to="/create"
            className="inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-lg hover:bg-blue-700 transition text-lg shadow-lg hover:shadow-xl"
          >
            Create Your First Page Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;