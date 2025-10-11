import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import React from 'react';
import { Loader2, TrendingUp, Globe, DollarSign, Target, BarChart3, Users, Zap, Lock, MapPin, Lightbulb, ArrowRight, PieChart } from "lucide-react";
import Navbar from "../../components/navbar";

const MarketSizeEstimator = () => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const prompt = `
<Role>
You are a Senior Market Research Analyst with 20+ years of experience in startup valuation, market intelligence, and financial forecasting. Your task is to estimate the market size for a given business idea using logical assumptions, credible frameworks, and data-backed reasoning.
</Role>

<Context>
Investors and founders need clear, structured, and data-informed market size estimates to assess opportunity potential. You specialize in breaking down industries into measurable segments using the TAM–SAM–SOM model. Assume a realistic growth rate and clearly state any assumptions you make.
</Context>

<Instructions>
When a user provides a business idea, follow these steps:

1. **Understand the Business Idea**
   - Summarize the idea briefly in 1 paragraph.
   - Identify the industry, target market, and problem being solved.

2. **Define Market Segments**
   - Identify the **primary target audience** (e.g., small businesses, students, healthcare companies, etc.).
   - Identify the **geographic focus** (e.g., global, regional, specific countries).
   - List any **key industries or verticals** this idea applies to.

3. **Estimate Market Size (TAM–SAM–SOM Framework)**
   - **TAM (Total Addressable Market):** The total global demand for the product/service.
   - **SAM (Serviceable Available Market):** The portion of TAM within the target region and audience.
   - **SOM (Serviceable Obtainable Market):** The realistically attainable portion of SAM within 3–5 years.
   - For each, provide:
     - Estimated value (in USD)
     - Calculation approach (bottom-up or top-down)
     - Growth rate (%)
     - Supporting reasoning

4. **Provide Market Insights**
   - Describe the **market trends**, **growth drivers**, and **key barriers to entry**.
   - Mention **top regions or countries** leading this market.
   - Include **3–5 recent statistics or industry data points** (approximations allowed if no live data).

5. **Strategic Recommendations**
   - Suggest **3–5 strategies** for capturing market share (e.g., niche focus, partnerships, pricing, distribution).
   - Identify **potential high-value customer segments** or **emerging sub-markets**.

<Output_Format>
Return ONLY valid JSON with this structure:
{
  "idea_summary": "string",
  "industry": "string",
  "target_market": "string",
  "market_segments": [
    {
      "segment": "string",
      "region": "string",
      "description": "string"
    }
  ],
  "market_size_estimates": {
    "TAM": {
      "value_usd": 1000000000,
      "growth_rate_percent": 15,
      "approach": "string",
      "reasoning": "string"
    },
    "SAM": {
      "value_usd": 500000000,
      "growth_rate_percent": 12,
      "approach": "string",
      "reasoning": "string"
    },
    "SOM": {
      "value_usd": 50000000,
      "growth_rate_percent": 20,
      "approach": "string",
      "reasoning": "string"
    }
  },
  "market_insights": {
    "trends": ["string"],
    "drivers": ["string"],
    "barriers": ["string"],
    "key_statistics": ["string"]
  },
  "strategic_recommendations": [
    "string",
    "string",
    "string"
  ]
}
</Output_Format>
`;

  const formatCurrency = (value) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const handleEstimation = async () => {
    if (!idea.trim()) {
      setError("Please enter your business idea first!");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

      const fullPrompt = `${prompt}\n\n<User_Idea>\n${idea}\n</User_Idea>`;
      const response = await model.generateContent(fullPrompt);
      const text = response.response.text();
      
      let cleanedText = text.trim();
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      
      const parsedResult = JSON.parse(cleanedText);
      setResult(parsedResult);
    } catch (err) {
      console.error("Estimation error:", err);
      setError("Failed to estimate market size. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        {/* Header */}
        <div className="text-center mb-12 mt-12">

          <h1 className="text-5xl font-bold mb-4" style={{ color: '#003F2F' }}>
            Market Size Estimator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get data-driven TAM, SAM, and SOM estimates with strategic insights for your business opportunity
          </p>
        </div>

        {/* Input Section */}
        {!result && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8" style={{ borderTop: '6px solid #46AA72' }}>
            <label className="block text-2xl font-semibold mb-4" style={{ color: '#003F2F' }}>
              Describe Your Business Idea
            </label>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Enter your business idea... Include details about your product, target customers, industry, and geographic focus."
              className="w-full h-48 p-6 border-2 rounded-2xl text-lg focus:outline-none transition-all"
              style={{ 
                borderColor: '#90C1CA',
                backgroundColor: '#F7F8F3'
              }}
              onFocus={(e) => e.target.style.borderColor = '#46AA72'}
              onBlur={(e) => e.target.style.borderColor = '#90C1CA'}
            />
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            <button
              onClick={handleEstimation}
              disabled={loading}
              className="mt-6 w-full py-5 rounded-2xl text-white font-bold text-xl transition-all transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              style={{ backgroundColor: '#46AA72' }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Calculating Market Size...
                </>
              ) : (
                <>
                  <BarChart3 className="w-6 h-6" />
                  Estimate Market Size
                </>
              )}
            </button>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-8 animate-fadeIn">
            {/* Summary Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8" style={{ borderTop: '6px solid #003F2F' }}>
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#003F2F' }}>
                Business Overview
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{result.idea_summary}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#F7F8F3' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5" style={{ color: '#46AA72' }} />
                    <span className="font-semibold" style={{ color: '#003F2F' }}>Industry</span>
                  </div>
                  <p className="text-gray-700 text-lg">{result.industry}</p>
                </div>
                
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#F7F8F3' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5" style={{ color: '#90C1CA' }} />
                    <span className="font-semibold" style={{ color: '#003F2F' }}>Target Market</span>
                  </div>
                  <p className="text-gray-700 text-lg">{result.target_market}</p>
                </div>
              </div>
            </div>

            {/* Market Segments */}
            <div className="bg-white rounded-3xl shadow-2xl p-8" style={{ borderTop: '6px solid #90C1CA' }}>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#003F2F' }}>
                Market Segments
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.market_segments.map((segment, index) => (
                  <div key={index} className="p-5 rounded-xl border-2 transition-all hover:shadow-lg" style={{ 
                    backgroundColor: '#F7F8F3',
                    borderColor: '#90C1CA'
                  }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5" style={{ color: '#46AA72' }} />
                      <h3 className="font-bold text-lg" style={{ color: '#003F2F' }}>{segment.segment}</h3>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4" style={{ color: '#90C1CA' }} />
                      <span className="text-sm font-medium text-gray-600">{segment.region}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{segment.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TAM-SAM-SOM */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold" style={{ color: '#003F2F' }}>
                Market Size Breakdown (TAM-SAM-SOM)
              </h2>

              {/* TAM */}
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all" style={{ borderLeft: '8px solid #46AA72' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: '#F7F8F3' }}>
                      <Globe className="w-8 h-8" style={{ color: '#46AA72' }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: '#003F2F' }}>
                        Total Addressable Market (TAM)
                      </h3>
                      <p className="text-gray-600">Global market opportunity</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold" style={{ color: '#46AA72' }}>
                      {formatCurrency(result.market_size_estimates.TAM.value_usd)}
                    </div>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <TrendingUp className="w-4 h-4" style={{ color: '#46AA72' }} />
                      <span className="text-lg font-semibold" style={{ color: '#46AA72' }}>
                        {result.market_size_estimates.TAM.growth_rate_percent}% CAGR
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7F8F3' }}>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Approach</p>
                    <p className="text-gray-700">{result.market_size_estimates.TAM.approach}</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7F8F3' }}>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Reasoning</p>
                    <p className="text-gray-700">{result.market_size_estimates.TAM.reasoning}</p>
                  </div>
                </div>
              </div>

              {/* SAM */}
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all" style={{ borderLeft: '8px solid #90C1CA' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: '#F7F8F3' }}>
                      <Target className="w-8 h-8" style={{ color: '#90C1CA' }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: '#003F2F' }}>
                        Serviceable Available Market (SAM)
                      </h3>
                      <p className="text-gray-600">Targeted segment of TAM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold" style={{ color: '#90C1CA' }}>
                      {formatCurrency(result.market_size_estimates.SAM.value_usd)}
                    </div>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <TrendingUp className="w-4 h-4" style={{ color: '#90C1CA' }} />
                      <span className="text-lg font-semibold" style={{ color: '#90C1CA' }}>
                        {result.market_size_estimates.SAM.growth_rate_percent}% CAGR
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7F8F3' }}>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Approach</p>
                    <p className="text-gray-700">{result.market_size_estimates.SAM.approach}</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7F8F3' }}>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Reasoning</p>
                    <p className="text-gray-700">{result.market_size_estimates.SAM.reasoning}</p>
                  </div>
                </div>
              </div>

              {/* SOM */}
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all" style={{ borderLeft: '8px solid #003F2F' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: '#F7F8F3' }}>
                      <DollarSign className="w-8 h-8" style={{ color: '#003F2F' }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: '#003F2F' }}>
                        Serviceable Obtainable Market (SOM)
                      </h3>
                      <p className="text-gray-600">Realistic market capture (3-5 years)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold" style={{ color: '#003F2F' }}>
                      {formatCurrency(result.market_size_estimates.SOM.value_usd)}
                    </div>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <TrendingUp className="w-4 h-4" style={{ color: '#003F2F' }} />
                      <span className="text-lg font-semibold" style={{ color: '#003F2F' }}>
                        {result.market_size_estimates.SOM.growth_rate_percent}% CAGR
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7F8F3' }}>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Approach</p>
                    <p className="text-gray-700">{result.market_size_estimates.SOM.approach}</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7F8F3' }}>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Reasoning</p>
                    <p className="text-gray-700">{result.market_size_estimates.SOM.reasoning}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Insights */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Trends */}
              <div className="bg-white rounded-2xl shadow-xl p-6" style={{ borderTop: '4px solid #46AA72' }}>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6" style={{ color: '#46AA72' }} />
                  <h3 className="text-xl font-bold" style={{ color: '#003F2F' }}>Market Trends</h3>
                </div>
                <ul className="space-y-3">
                  {result.market_insights.trends.map((trend, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#46AA72' }} />
                      <span className="text-gray-700">{trend}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Drivers */}
              <div className="bg-white rounded-2xl shadow-xl p-6" style={{ borderTop: '4px solid #90C1CA' }}>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6" style={{ color: '#90C1CA' }} />
                  <h3 className="text-xl font-bold" style={{ color: '#003F2F' }}>Growth Drivers</h3>
                </div>
                <ul className="space-y-3">
                  {result.market_insights.drivers.map((driver, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#90C1CA' }} />
                      <span className="text-gray-700">{driver}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Barriers */}
              <div className="bg-white rounded-2xl shadow-xl p-6" style={{ borderTop: '4px solid #f59e0b' }}>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-orange-500" />
                  <h3 className="text-xl font-bold" style={{ color: '#003F2F' }}>Barriers to Entry</h3>
                </div>
                <ul className="space-y-3">
                  {result.market_insights.barriers.map((barrier, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-500" />
                      <span className="text-gray-700">{barrier}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Statistics */}
              <div className="bg-white rounded-2xl shadow-xl p-6" style={{ borderTop: '4px solid #003F2F' }}>
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-6 h-6" style={{ color: '#003F2F' }} />
                  <h3 className="text-xl font-bold" style={{ color: '#003F2F' }}>Key Statistics</h3>
                </div>
                <ul className="space-y-3">
                  {result.market_insights.key_statistics.map((stat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#003F2F' }} />
                      <span className="text-gray-700">{stat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="bg-white rounded-3xl shadow-2xl p-8" style={{ borderTop: '6px solid #46AA72' }}>
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-8 h-8" style={{ color: '#46AA72' }} />
                <h2 className="text-2xl font-bold" style={{ color: '#003F2F' }}>
                  Strategic Recommendations
                </h2>
              </div>
              <div className="space-y-4">
                {result.strategic_recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 rounded-xl hover:shadow-lg transition-all" style={{ backgroundColor: '#F7F8F3' }}>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#46AA72' }}>
                      {index + 1}
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed pt-0.5">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Try Again Button */}
            <button
              onClick={() => {
                setResult(null);
                setIdea("");
                setError(null);
              }}
              className="w-full py-5 rounded-2xl text-white font-bold text-xl transition-all transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3"
              style={{ backgroundColor: '#003F2F' }}
            >
              <PieChart className="w-6 h-6" />
              Estimate Another Market
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketSizeEstimator;