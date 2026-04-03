import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Create() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean, simple, and elegant',
      color: 'from-gray-900 to-gray-700'
    },
    {
      id: 'vibrant',
      name: 'Vibrant',
      description: 'Colorful and energetic',
      color: 'from-pink-500 via-purple-500 to-blue-500'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Corporate and polished',
      color: 'from-blue-900 via-blue-700 to-cyan-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Page
          </h1>
          <p className="text-xl text-gray-600">
            Choose a template and start creating your masterpiece
          </p>
        </div>

        {!selectedTemplate ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className={`h-48 bg-gradient-to-br ${template.color} rounded-t-xl flex items-center justify-center`}>
                  <div className="text-white text-6xl">📄</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {template.description}
                  </p>
                  <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Page Editor
              </h2>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 mb-6 min-h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-xl text-gray-600 mb-4">
                  Editor coming soon!
                </p>
                <p className="text-gray-500">
                  You've selected the <strong>{selectedTemplate}</strong> template.
                  Full editor will be available soon.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedTemplate(null)}
                className="flex-1 border-2 border-gray-300 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
              >
                Choose Different Template
              </button>
              <button className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
                Continue Editing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Create;
