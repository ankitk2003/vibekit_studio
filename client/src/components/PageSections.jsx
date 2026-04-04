import React, { useState } from 'react';

export const HeroSection = ({ data, onEdit, isEditing }) => {
  if (isEditing) {
    return (
      <div className="p-6 bg-var(--vk-surface) border-2 border-var(--vk-border) rounded-var(--vk-radius-lg)">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-var(--vk-text) mb-2">
              Hero Title
            </label>
            <input
              type="text"
              value={data.title || ""}
              onChange={(e) =>
                onEdit({ ...data, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-var(--vk-border) rounded-var(--vk-radius-md) bg-var(--vk-bg) text-var(--vk-text)"
              placeholder="Enter hero title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-var(--vk-text) mb-2">
              Subtitle
            </label>
            <textarea
              value={data.subtitle || ""}
              onChange={(e) =>
                onEdit({ ...data, subtitle: e.target.value })
              }
              rows="3"
              className="w-full px-4 py-2 border border-var(--vk-border) rounded-var(--vk-radius-md) bg-var(--vk-bg) text-var(--vk-text)"
              placeholder="Enter subtitle"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-var(--vk-text) mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={data.buttonText || ""}
                onChange={(e) =>
                  onEdit({ ...data, buttonText: e.target.value })
                }
                className="w-full px-4 py-2 border border-var(--vk-border) rounded-var(--vk-radius-md) bg-var(--vk-bg) text-var(--vk-text)"
                placeholder="Button text"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-var(--vk-text) mb-2">
                Button URL
              </label>
              <input
                type="text"
                value={data.buttonUrl || ""}
                onChange={(e) =>
                  onEdit({ ...data, buttonUrl: e.target.value })
                }
                className="w-full px-4 py-2 border border-var(--vk-border) rounded-var(--vk-radius-md) bg-var(--vk-bg) text-var(--vk-text)"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-var(--vk-bg) text-var(--vk-text) min-h-96 flex items-center justify-center"
      style={{
        fontFamily: "var(--vk-heading-font)",
        backgroundColor: "var(--vk-bg)",
        color: "var(--vk-text)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center w-full">
        <h1
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6"
          style={{
            fontWeight: "var(--vk-heading-weight)",
            fontFamily: "var(--vk-heading-font)",
            lineHeight: '1.2',
          }}
        >
          {data.title || "Your Amazing Title"}
        </h1>

        <p
          className="text-base xs:text-lg sm:text-xl text-var(--vk-text-secondary) mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{
            color: "var(--vk-text-secondary)",
            fontFamily: "var(--vk-body-font)",
          }}
        >
          {data.subtitle || "Your compelling subtitle here"}
        </p>

        <a
          href={data.buttonUrl || "#"}
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 min-h-11 rounded-var(--vk-radius-md) font-semibold transition text-sm sm:text-base"
          style={{
            backgroundColor: "var(--vk-accent)",
            color: "white",
            borderRadius: "var(--vk-radius-md)",
          }}
        >
          {data.buttonText || "Get Started"}
        </a>
      </div>
    </section>
  );
};

export const FeaturesSection = ({ data, onEdit, isEditing }) => {
  if (isEditing) {
    return (
      <div className="p-6 bg-var(--vk-surface) border-2 border-var(--vk-border) rounded-var(--vk-radius-lg)">
        <h3 className="text-lg font-semibold text-var(--vk-text) mb-4">
          Features
        </h3>

        {data.features?.map((feature, idx) => (
          <div key={idx} className="mb-4 p-4 border border-var(--vk-border) rounded-var(--vk-radius-md)">
            <input
              type="text"
              value={feature.title || ""}
              onChange={(e) => {
                const updated = [...data.features];
                updated[idx].title = e.target.value;
                onEdit({ ...data, features: updated });
              }}
              className="w-full px-3 py-2 border border-var(--vk-border) rounded-var(--vk-radius-sm) bg-var(--vk-bg) text-var(--vk-text) mb-2"
              placeholder="Feature title"
            />
            <textarea
              value={feature.description || ""}
              onChange={(e) => {
                const updated = [...data.features];
                updated[idx].description = e.target.value;
                onEdit({ ...data, features: updated });
              }}
              rows="2"
              className="w-full px-3 py-2 border border-var(--vk-border) rounded-var(--vk-radius-sm) bg-var(--vk-bg) text-var(--vk-text)"
              placeholder="Feature description"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6"
      style={{
        backgroundColor: "var(--vk-surface)",
        color: "var(--vk-text)",
      }}
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {data.features?.map((feature, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 rounded-var(--vk-radius-lg)"
              style={{
                backgroundColor: "var(--vk-bg)",
                border: "1px solid var(--vk-border)",
              }}
            >
              <h3
                className="text-lg sm:text-xl font-semibold mb-3"
                style={{
                  fontFamily: "var(--vk-heading-font)",
                  fontWeight: "var(--vk-heading-weight)",
                  color: "var(--vk-text)",
                  lineHeight: '1.3',
                }}
              >
                {feature.title || "Feature"}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--vk-text-secondary)" }}>
                {feature.description || "Feature description"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const GallerySection = ({ data, onEdit, isEditing }) => {
  if (isEditing) {
    return (
      <div className="p-6 bg-var(--vk-surface) border-2 border-var(--vk-border) rounded-var(--vk-radius-lg)">
        <h3 className="text-lg font-semibold text-var(--vk-text) mb-4">
          Gallery Images
        </h3>

        <div className="space-y-3">
          {data.images?.map((image, idx) => (
            <input
              key={idx}
              type="text"
              value={image || ""}
              onChange={(e) => {
                const updated = [...data.images];
                updated[idx] = e.target.value;
                onEdit({ ...data, images: updated });
              }}
              className="w-full px-4 py-2 border border-var(--vk-border) rounded-var(--vk-radius-md) bg-var(--vk-bg) text-var(--vk-text)"
              placeholder={`Image ${idx + 1} URL`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6"
      style={{
        backgroundColor: "var(--vk-bg)",
        color: "var(--vk-text)",
      }}
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {data.images?.map((image, idx) => (
            <div key={idx} className="overflow-hidden rounded-var(--vk-radius-lg)">
              <img
                src={image}
                alt="Gallery image"
                className="w-full h-auto sm:h-48 md:h-56 object-cover rounded-var(--vk-radius-lg)"
                style={{ borderRadius: "var(--vk-radius-lg)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ContactSection = ({ data, onEdit, isEditing, slug }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear messages on input change
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In edit mode, just show alert
    if (isEditing) {
      alert("Contact form submitted!");
      return;
    }

    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(
        `/.netlify/functions/public-contact?slug=${slug}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message || 'Thank you! Your message has been sent successfully.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        setErrorMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="p-6 bg-var(--vk-surface) border-2 border-var(--vk-border) rounded-var(--vk-radius-lg)">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-var(--vk-text) mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={data.title || ""}
              onChange={(e) =>
                onEdit({ ...data, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-var(--vk-border) rounded-var(--vk-radius-md) bg-var(--vk-bg) text-var(--vk-text)"
              placeholder="Contact section title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-var(--vk-text) mb-2">
              Description
            </label>
            <textarea
              value={data.description || ""}
              onChange={(e) =>
                onEdit({ ...data, description: e.target.value })
              }
              rows="3"
              className="w-full px-4 py-2 border border-var(--vk-border) rounded-var(--vk-radius-md) bg-var(--vk-bg) text-var(--vk-text)"
              placeholder="Contact section description"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6"
      style={{
        backgroundColor: "var(--vk-surface)",
        color: "var(--vk-text)",
      }}
    >
      <div className="max-w-2xl mx-auto w-full">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center"
          style={{
            fontFamily: "var(--vk-heading-font)",
            fontWeight: "var(--vk-heading-weight)",
            lineHeight: '1.3',
          }}
        >
          {data.title || "Contact Us"}
        </h2>

        <p
          className="text-sm sm:text-base text-center mb-6 sm:mb-8 leading-relaxed"
          style={{
            color: "var(--vk-text-secondary)",
            fontFamily: "var(--vk-body-font)",
          }}
        >
          {data.description || "Get in touch with us"}
        </p>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-lg text-sm" style={{
            backgroundColor: '#D1FAE5',
            color: '#065F46',
            border: '1px solid #A7F3D0'
          }}>
            ✓ {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-lg text-sm" style={{
            backgroundColor: '#FEE2E2',
            color: '#991B1B',
            border: '1px solid #FECACA'
          }}>
            ✕ {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 min-h-11 border border-var(--vk-border) rounded-var(--vk-radius-md) bg-var(--vk-bg) text-var(--vk-text) text-sm sm:text-base"
            style={{
              borderColor: "var(--vk-border)",
              backgroundColor: "var(--vk-bg)",
              color: "var(--vk-text)",
            }}
            required
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 min-h-11 border border-var(--vk-border) rounded-var(--vk-radius-md) bg-var(--vk-bg) text-var(--vk-text) text-sm sm:text-base"
            style={{
              borderColor: "var(--vk-border)",
              backgroundColor: "var(--vk-bg)",
              color: "var(--vk-text)",
            }}
            required
            disabled={loading}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            rows="5"
            className="w-full px-4 py-3 border border-var(--vk-border) rounded-var(--vk-radius-md) bg-var(--vk-bg) text-var(--vk-text) text-sm sm:text-base resize-none"
            style={{
              borderColor: "var(--vk-border)",
              backgroundColor: "var(--vk-bg)",
              color: "var(--vk-text)",
            }}
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 min-h-11 rounded-var(--vk-radius-md) font-semibold transition text-sm sm:text-base"
            style={{
              backgroundColor: loading ? 'var(--vk-accent)' : 'var(--vk-accent)',
              color: "white",
              borderRadius: "var(--vk-radius-md)",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};
