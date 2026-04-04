import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import {
  HeroSection,
  FeaturesSection,
  GallerySection,
  ContactSection,
} from './PageSections';
import THEMES, { generateThemeCSS } from '../themes/themeConfig';

const PageBuilder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isAuthenticated } = useAuthStore();

  const [page, setPage] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // desktop, tablet, mobile
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch page data
  useEffect(() => {
    if (!id) return;

    const fetchPage = async () => {
      try {
        const response = await fetch(`/.netlify/functions/pages-detail?id=${id}`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setPage(data.page);
        }
      } catch (error) {
        console.error('Error fetching page:', error);
      }
    };

    fetchPage();
  }, [id]);

  // Auto-save
  useEffect(() => {
    if (!page || !id || isSaved) return;

    const timer = setTimeout(async () => {
      try {
        await fetch(`/.netlify/functions/pages-detail?id=${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: page.title,
            content: page.content,
            theme: page.theme,
          }),
          credentials: 'include',
        });

        setIsSaved(true);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (error) {
        console.error('Error saving page:', error);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [page, id, isSaved]);

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const getSectionComponent = (section, isPreview = false) => {
    const props = {
      data: section.data,
      isEditing: !isPreview && editingSection === section.id,
      onEdit: (newData) => {
        const updated = page.content.sections.map((s) =>
          s.id === section.id ? { ...s, data: newData } : s
        );
        setPage({ ...page, content: { ...page.content, sections: updated } });
        setIsSaved(false);
      },
    };

    switch (section.type) {
      case 'hero':
        return <HeroSection {...props} />;
      case 'features':
        return <FeaturesSection {...props} />;
      case 'gallery':
        return <GallerySection {...props} />;
      case 'contact':
        return <ContactSection {...props} />;
      default:
        return null;
    }
  };

  const getSectionPreview = (section) => {
    return getSectionComponent(section, true);
  };

  const getPreviewWidth = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'max-w-sm';
      case 'tablet':
        return 'max-w-2xl';
      default:
        return 'w-full';
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/.netlify/functions/pages-publish?id=${page.id}`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPage(data.page);
        alert(`Page ${data.action === 'published' ? 'published' : 'unpublished'} successfully!`);
      }
    } catch (error) {
      alert('Error publishing page');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="w-full px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{page.title}</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Status: <span className="font-semibold c.netlify/functionstalize">{page.status}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {saved && (
              <div className="text-green-600 text-xs sm:text-sm font-medium whitespace-nowrap">✓ Saved</div>
            )}
            <button
              onClick={handlePublish}
              disabled={loading}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-2 min-h-11 rounded-lg font-semibold transition text-sm sm:text-base whitespace-nowrap"
              style={{
                backgroundColor: page.status === 'published' ? '#EF4444' : '#10B981',
                color: 'white',
              }}
            >
              {page.status === 'published' ? 'Unpublish' : 'Publish'}
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {/* Sidebar - Controls */}
        <div className="md:col-span-1 space-y-4">
          {/* Theme Selection */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Theme</h3>
            <select
              value={page.theme}
              onChange={(e) => {
                setPage({ ...page, theme: e.target.value });
                setIsSaved(false);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              {Object.entries(THEMES).map(([key, theme]) => (
                <option key={key} value={key}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>

          {/* Device Preview Toggle */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Preview</h3>
            <div className="grid grid-cols-3 gap-2">
              {['mobile', 'tablet', 'desktop'].map((device) => (
                <button
                  key={device}
                  onClick={() => setPreviewDevice(device)}
                  className={`py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium c.netlify/functionstalize transition min-h-11 flex items-center justify-center ${
                    previewDevice === device
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 active:bg-gray-200'
                  }`}
                  title={device}
                >
                  <span className="hidden xs:inline">{device === 'mobile' ? '📱' : device === 'tablet' ? '📱' : '🖥️'}</span>
                  <span className="xs:hidden">{device === 'mobile' ? 'M' : device === 'tablet' ? 'T' : 'D'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Sections</h3>
            <div className="space-y-2">
              {page.content.sections.map((section, idx) => (
                <button
                  key={section.id}
                  onClick={() => setEditingSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition c.netlify/functionstalize text-sm min-h-11 flex items-center ${
                    editingSection === section.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-100 active:bg-gray-200 border border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{section.type}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main - Editor */}
        <div className="md:col-span-1 lg:col-span-2">
          {editingSection && (
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Edit {page.content.sections.find((s) => s.id === editingSection)?.type}
                </h3>
                <button
                  onClick={() => setEditingSection(null)}
                  className="w-full sm:w-auto px-4 py-3 sm:py-2 min-h-11 bg-gray-200 text-gray-900 rounded-lg active:bg-gray-300 text-sm font-medium"
                >
                  Done
                </button>
              </div>

              {getSectionComponent(
                page.content.sections.find((s) => s.id === editingSection)
              )}
            </div>
          )}

          {!editingSection && (
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm text-center text-gray-500 min-h-96 flex items-center justify-center">
              <p className="text-sm sm:text-base">Select a section to edit</p>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg p-4 shadow-sm sticky md:top-24">
            <h3 className="font-semibold text-gray-900 mb-4 text-center text-sm sm:text-base">Live Preview</h3>

            <div
              className={`${getPreviewWidth()} mx-auto bg-gray-200 rounded-lg overflow-hidden border-4 sm:border-8 border-gray-300`}
            >
              <style>{generateThemeCSS(page.theme)}</style>
              <div className="flex flex-col">
                {page.content.sections.map((section) => (
                  <div key={section.id}>{getSectionPreview(section)}</div>
                ))}
              </div>
            </div>

            {page.status === 'published' && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs sm:text-sm text-green-700 font-medium">
                  📤 Published at:<br />
                  <code className="text-xs bg-green-100 px-2 py-1 rounded block mt-1 break-all">
                    /p/{page.slug}
                  </code>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBuilder;
