import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('minimal');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch pages
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('/.netlify/functions/pages-list', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setPages(data.pages);
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const handleCreatePage = async () => {
    if (!newPageTitle.trim()) return;

    try {
      const response = await fetch('/.netlify/functions/pages-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPageTitle,
          theme: selectedTheme,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setPages([...pages, data.page]);
        setShowCreateModal(false);
        setNewPageTitle('');
        navigate(`/editor/${data.page.id}`);
      }
    } catch (error) {
      alert('Error creating page');
    }
  };

  const handleDuplicate = async (pageId) => {
    try {
      const response = await fetch(
        `/.netlify/functions/pages-duplicate?id=${pageId}`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPages([...pages, data.page]);
        alert('Page duplicated!');
      }
    } catch (error) {
      alert('Error duplicating page');
    }
  };

  const handleDelete = async (pageId) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      const response = await fetch(
        `/.netlify/functions/pages-detail?id=${pageId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (response.ok) {
        setPages(pages.filter((p) => p.id !== pageId));
        alert('Page deleted');
      }
    } catch (error) {
      alert('Error deleting page');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">VibeKit Studio</h1>
            <p className="text-sm text-gray-600 mt-1">Your Dashboard</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Create Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold mb-8 flex items-center gap-2"
        >
          + Create New Page
        </button>

        {/* Pages Grid */}
        {loading ? (
          <div className="flex items-center justify-center min-h-96">
            <p className="text-gray-600">Loading your pages...</p>
          </div>
        ) : pages.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm">
            <p className="text-gray-600 text-lg mb-4">You haven't created any pages yet</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Your First Page
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <div
                key={page.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {page.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {page.slug}
                    </code>
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        page.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {page.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      Theme: {page.theme}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500">
                    Views: {page.viewCount || 0}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => navigate(`/editor/${page.id}`)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDuplicate(page.id)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
                    title="Duplicate page"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={() => handleDelete(page.id)}
                    className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium"
                    title="Delete page"
                  >
                    🗑️ Delete
                  </button>
                </div>

                {page.status === 'published' && (
                  <a
                    href={`/p/${page.slug}`}
                    className="mt-3 block w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm font-medium text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 View Published
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create New Page
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  placeholder="My Awesome Page"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Starting Theme
                </label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  <option value="minimal">Minimal</option>
                  <option value="neo-brutal">Neo-Brutal</option>
                  <option value="dark-neon">Dark Neon</option>
                  <option value="pastel-soft">Pastel Soft</option>
                  <option value="luxury-serif">Luxury Serif</option>
                  <option value="retro-pixel">Retro Pixel</option>
                  <option value="editorial">Editorial</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewPageTitle('');
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePage}
                disabled={!newPageTitle.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
              >
                Create Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
