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
    <div className="min-h-screen bg-gray-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Create Your Page
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            Choose a template and start creating your masterpiece
          </p>
        </div>

        {!selectedTemplate ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className="bg-white rounded-xl shadow-md active:shadow-lg transition text-left overflow-hidden hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className={`h-40 sm:h-48 bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                  <div className="text-5xl sm:text-6xl">📄</div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    {template.description}
                  </p>
                  <div className="w-full bg-blue-600 text-white font-bold py-3 min-h-11 px-4 rounded-lg text-sm sm:text-base flex items-center justify-center">
                    Use Template
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Editor Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-8 border-b border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex-1">
                Page Editor
              </h2>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="w-full sm:w-auto px-4 py-3 min-h-11 text-gray-600 active:text-gray-900 text-sm sm:text-base font-medium hover:bg-gray-50 rounded-lg transition"
              >
                ← Back
              </button>
            </div>

            {/* Editor Content */}
            <div className="p-4 sm:p-8">
              <div className="bg-gray-50 rounded-lg p-6 sm:p-8 mb-6 min-h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl mb-4">🎨</div>
                  <p className="text-lg sm:text-xl text-gray-600 mb-4">
                    Editor coming soon!
                  </p>
                  <p className="text-sm sm:text-base text-gray-500">
                    You've selected the <strong className="font-semibold capitalize">{selectedTemplate}</strong> template.
                    Full editor will be available soon.
                  </p>
                </div>
              </div>

              {/* Editor Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="flex-1 border-2 border-gray-300 text-gray-900 font-bold py-3 min-h-11 px-4 sm:px-6 rounded-lg active:bg-gray-100 transition text-sm sm:text-base"
                >
                  Choose Different Template
                </button>
                <button className="flex-1 bg-blue-600 text-white font-bold py-3 min-h-11 px-4 sm:px-6 rounded-lg active:bg-blue-700 transition text-sm sm:text-base">
                  Continue Editing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Create;
