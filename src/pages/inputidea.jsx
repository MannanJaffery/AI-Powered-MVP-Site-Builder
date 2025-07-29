import { useState } from "react";

export default function IdeaInputAssistant() {
  const [inputData, setInputData] = useState({
    name: "",
    imageKeywords: "",
    tone: "",
    targetAudience: "",
    description: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputData.name || !inputData.description) return;
    
    // Handle form submission logic here
    console.log("Form submitted:", inputData);
    
    setInputData({
      name: "",
      imageKeywords: "",
      tone: "",
      targetAudience: "",
      description: ""
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-purple-50 font-sans overflow-x-hidden">
      {/* Header */}
      <header className="bg-white border-b border-purple-100 shadow-sm w-full">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800 tracking-tight">
            Content Strategy Assistant
          </h1>
        </div>
      </header>

      {/* Input Form */}
      <main className="w-full">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Enter product name"
                    value={inputData.name}
                    onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Visual Keywords
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="modern, minimal, premium"
                    value={inputData.imageKeywords}
                    onChange={(e) => setInputData({ ...inputData, imageKeywords: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Brand Tone
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm bg-white"
                    value={inputData.tone}
                    onChange={(e) => setInputData({ ...inputData, tone: e.target.value })}
                  >
                    <option value="">Select tone</option>
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="premium">Premium</option>
                    <option value="innovative">Innovative</option>
                    <option value="trustworthy">Trustworthy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Target Market
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="professionals, entrepreneurs, consumers"
                    value={inputData.targetAudience}
                    onChange={(e) => setInputData({ ...inputData, targetAudience: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Product Overview*
                </label>
                <textarea
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm resize-none"
                  rows={4}
                  placeholder="Describe key features, benefits, and unique value proposition..."
                  value={inputData.description}
                  onChange={(e) => setInputData({ ...inputData, description: e.target.value })}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!inputData.name || !inputData.description}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md text-sm w-full sm:w-auto"
                  onClick={handleSubmit}
                >
                  Generate Strategy
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}