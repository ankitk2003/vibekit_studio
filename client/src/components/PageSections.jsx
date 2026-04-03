import React from 'react';

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
      className="w-full py-20 px-6 bg-var(--vk-bg) text-var(--vk-text) min-h-96 flex items-center justify-center"
      style={{
        fontFamily: "var(--vk-heading-font)",
        backgroundColor: "var(--vk-bg)",
        color: "var(--vk-text)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          style={{
            fontWeight: "var(--vk-heading-weight)",
            fontFamily: "var(--vk-heading-font)",
          }}
        >
          {data.title || "Your Amazing Title"}
        </h1>

        <p
          className="text-lg md:text-xl text-var(--vk-text-secondary) mb-8 max-w-2xl mx-auto"
          style={{
            color: "var(--vk-text-secondary)",
            fontFamily: "var(--vk-body-font)",
          }}
        >
          {data.subtitle || "Your compelling subtitle here"}
        </p>

        <a
          href={data.buttonUrl || "#"}
          className="inline-block px-8 py-3 rounded-var(--vk-radius-md) font-semibold transition"
          style={{
            backgroundColor: "var(--vk-accent)",
            color: "white",
            padding: "var(--vk-sm) 2rem",
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
      className="w-full py-16 px-6"
      style={{
        backgroundColor: "var(--vk-surface)",
        color: "var(--vk-text)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.features?.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-var(--vk-radius-lg)"
              style={{
                backgroundColor: "var(--vk-bg)",
                border: "1px solid var(--vk-border)",
              }}
            >
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  fontFamily: "var(--vk-heading-font)",
                  fontWeight: "var(--vk-heading-weight)",
                  color: "var(--vk-text)",
                }}
              >
                {feature.title || "Feature"}
              </h3>
              <p style={{ color: "var(--vk-text-secondary)" }}>
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
      className="w-full py-16 px-6"
      style={{
        backgroundColor: "var(--vk-bg)",
        color: "var(--vk-text)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.images?.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt="Gallery image"
              className="w-full h-64 object-cover rounded-var(--vk-radius-lg)"
              style={{ borderRadius: "var(--vk-radius-lg)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const ContactSection = ({ data, onEdit, isEditing }) => {
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
      className="w-full py-16 px-6"
      style={{
        backgroundColor: "var(--vk-surface)",
        color: "var(--vk-text)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-3xl font-bold mb-4 text-center"
          style={{
            fontFamily: "var(--vk-heading-font)",
            fontWeight: "var(--vk-heading-weight)",
          }}
        >
          {data.title || "Contact Us"}
        </h2>

        <p
          className="text-center mb-8"
          style={{
            color: "var(--vk-text-secondary)",
            fontFamily: "var(--vk-body-font)",
          }}
        >
          {data.description || "Get in touch with us"}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Contact form submitted!");
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-var(--vk-border) rounded-var(--vk-radius-md) bg-var(--vk-bg) text-var(--vk-text)"
            style={{
              borderColor: "var(--vk-border)",
              backgroundColor: "var(--vk-bg)",
              color: "var(--vk-text)",
            }}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-var(--vk-border) rounded-var(--vk-radius-md) bg-var(--vk-bg) text-var(--vk-text)"
            style={{
              borderColor: "var(--vk-border)",
              backgroundColor: "var(--vk-bg)",
              color: "var(--vk-text)",
            }}
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-3 border border-var(--vk-border) rounded-var(--vk-radius-md) bg-var(--vk-bg) text-var(--vk-text)"
            style={{
              borderColor: "var(--vk-border)",
              backgroundColor: "var(--vk-bg)",
              color: "var(--vk-text)",
            }}
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-var(--vk-radius-md) font-semibold transition"
            style={{
              backgroundColor: "var(--vk-accent)",
              color: "white",
              borderRadius: "var(--vk-radius-md)",
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};
