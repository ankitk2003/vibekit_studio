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
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
  const [selectedPageSubmissions, setSelectedPageSubmissions] = useState(null);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);

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
        const response = await fetch('/api/pages-list', {
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
      const response = await fetch('/api/pages-create', {
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
        `/api/pages-duplicate?id=${pageId}`,
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
        `/api/pages-detail?id=${pageId}`,
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

  const handleViewSubmissions = async (pageId, pageTitle) => {
    setSubmissionsLoading(true);
    try {
      const response = await fetch(
        `/api/get-submissions?pageId=${pageId}`,
        {
          credentials: 'include',
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedPageSubmissions({
          pageTitle: data.pageTitle,
          submissions: data.submissions,
          count: data.count,
        });
        setShowSubmissionsModal(true);
      } else {
        alert('Failed to fetch submissions');
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      alert('Error fetching submissions');
    } finally {
      setSubmissionsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">VibeKit Studio</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Your Dashboard</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full sm:w-auto px-6 py-3 min-h-11 bg-red-600 text-white rounded-lg active:bg-red-700 transition font-medium text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Create Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full sm:w-auto px-6 py-3 min-h-11 bg-blue-600 text-white rounded-lg active:bg-blue-700 transition font-semibold mb-8 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          + Create New Page
        </button>

        {/* Pages Grid */}
        {loading ? (
          <div className="flex items-center justify-center min-h-96">
            <p className="text-gray-600 text-center text-sm sm:text-base">Loading your pages...</p>
          </div>
        ) : pages.length === 0 ? (
          <div className="bg-white rounded-lg p-8 sm:p-12 text-center shadow-sm">
            <p className="text-gray-600 text-base sm:text-lg mb-6">You haven't created any pages yet</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 min-h-11 bg-blue-600 text-white rounded-lg active:bg-blue-700 text-sm sm:text-base font-medium"
            >
              Create Your First Page
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pages.map((page) => (
              <div
                key={page.id}
                className="bg-white rounded-lg shadow-sm active:shadow-md transition p-4 sm:p-6 flex flex-col"
              >
                <div className="mb-4 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {page.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 break-all">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {page.slug}
                    </code>
                  </p>

                  <div className="flex flex-col xs:flex-row gap-2 items-start xs:items-center xs:gap-3 mb-3">
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
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => navigate(`/editor/${page.id}`)}
                    className="w-full px-4 py-3 min-h-11 bg-blue-600 text-white rounded-lg active:bg-blue-700 transition text-xs sm:text-sm font-medium"
                  >
                    Edit
                  </button>
                  
                  {page.status === 'published' && (
                    <button
                      onClick={() => handleViewSubmissions(page.id, page.title)}
                      className="w-full px-4 py-3 min-h-11 bg-purple-600 text-white rounded-lg active:bg-purple-700 transition text-xs sm:text-sm font-medium"
                      disabled={submissionsLoading}
                    >
                      📊 View Submissions
                    </button>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDuplicate(page.id)}
                      className="w-full px-4 py-3 min-h-11 bg-gray-200 text-gray-900 rounded-lg active:bg-gray-300 transition text-xs sm:text-sm font-medium"
                      title="Duplicate page"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={() => handleDelete(page.id)}
                      className="w-full px-4 py-3 min-h-11 bg-red-100 text-red-700 rounded-lg active:bg-red-200 transition text-xs sm:text-sm font-medium"
                      title="Delete page"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>

                {page.status === 'published' && (
                  <a
                    href={`/p/${page.slug}`}
                    className="mt-3 block w-full px-4 py-3 min-h-11 bg-green-100 text-green-700 rounded-lg active:bg-green-200 transition text-xs sm:text-sm font-medium text-center"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-t-lg sm:rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto sm:max-h-none">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm min-h-11"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm min-h-11"
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

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewPageTitle('');
                  }}
                  className="flex-1 px-4 py-3 min-h-11 bg-gray-200 text-gray-900 rounded-lg active:bg-gray-300 transition font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePage}
                  disabled={!newPageTitle.trim()}
                  className="flex-1 px-4 py-3 min-h-11 bg-blue-600 text-white rounded-lg active:bg-blue-700 transition font-medium disabled:opacity-50 text-sm"
                >
                  Create Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submissions Modal */}
      {showSubmissionsModal && selectedPageSubmissions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-t-lg sm:rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8 sticky top-0 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Form Submissions
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedPageSubmissions.pageTitle}
                  </p>
                </div>
                <button
                  onClick={() => setShowSubmissionsModal(false)}
                  className="text-gray-500 hover:text-gray-700 active:text-gray-900 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {selectedPageSubmissions.count === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-sm sm:text-base">
                    No submissions yet
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-3 px-3 font-semibold text-gray-900">
                          Name
                        </th>
                        <th className="text-left py-3 px-3 font-semibold text-gray-900">
                          Email
                        </th>
                        <th className="text-left py-3 px-3 font-semibold text-gray-900 hidden sm:table-cell">
                          Message
                        </th>
                        <th className="text-left py-3 px-3 font-semibold text-gray-900 hidden md:table-cell">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPageSubmissions.submissions.map((submission, idx) => (
                        <tr
                          key={submission.id}
                          className={`border-b border-gray-200 ${
                            idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          }`}
                        >
                          <td className="py-3 px-3 text-gray-900">
                            {submission.name}
                          </td>
                          <td className="py-3 px-3 text-gray-700 break-all">
                            <a
                              href={`mailto:${submission.email}`}
                              className="text-blue-600 active:text-blue-700 underline"
                            >
                              {submission.email}
                            </a>
                          </td>
                          <td className="py-3 px-3 text-gray-600 hidden sm:table-cell line-clamp-2">
                            {submission.message}
                          </td>
                          <td className="py-3 px-3 text-gray-500 hidden md:table-cell text-xs">
                            {new Date(submission.submittedAt).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              }
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowSubmissionsModal(false)}
                  className="flex-1 px-4 py-3 min-h-11 bg-gray-200 text-gray-900 rounded-lg active:bg-gray-300 transition font-medium text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
