import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  HeroSection,
  FeaturesSection,
  GallerySection,
  ContactSection,
} from '../components/PageSections';
import THEMES, { generateThemeCSS } from '../themes/themeConfig';

const PublishedPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(
          `/.netlify/functions/public-page?slug=${slug}`
        );

        if (!response.ok) {
          setError('Page not found');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setPage(data.page);

        // Track view
        fetch(`/.netlify/functions/public-track-view?slug=${slug}`, {
          method: 'POST',
        }).catch(console.error);
      } catch (err) {
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading page...</p>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">{error || 'Page not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const getSectionComponent = (section) => {
    const props = {
      data: section.data,
      isEditing: false,
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

  return (
    <div className="w-full">
      <style>{generateThemeCSS(page.theme)}</style>

      {/* Top Bar */}
      <div
        className="py-4 px-6 flex items-center justify-between border-b"
        style={{
          backgroundColor: 'var(--vk-bg)',
          color: 'var(--vk-text)',
          borderColor: 'var(--vk-border)',
        }}
      >
        <div>
          <p className="text-sm opacity-75">Published with VibeKit Studio</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-sm underline hover:no-underline"
        >
          Create Your Own
        </button>
      </div>

      {/* Page Content */}
      <main>
        {page.content.sections.map((section) => (
          <div key={section.id}>{getSectionComponent(section)}</div>
        ))}
      </main>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center border-t"
        style={{
          backgroundColor: 'var(--vk-surface)',
          color: 'var(--vk-text-secondary)',
          borderColor: 'var(--vk-border)',
          fontFamily: 'var(--vk-body-font)',
        }}
      >
        <p className="text-sm">
          Made with <span className="text-red-500">♥</span> using VibeKit Studio
        </p>
      </footer>
    </div>
  );
};

export default PublishedPage;
