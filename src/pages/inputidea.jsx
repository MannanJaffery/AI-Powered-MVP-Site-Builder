import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { useNavigate } from "react-router-dom";
import useUsername from "../services/getcurrentusername";

import Loader from "../components/loading";

export default function IdeaInputAssistant() {

  const {username} = useUsername();

  const navigate = useNavigate();
  const [AIresponse , setAIResponse] = useState(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  const [inputData, setInputData] = useState({
    name: "",
    imageKeywords: "",
    tone: "",
    targetAudience: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);

const prompt = `You are required to extract structured data from the provided product information. Do not include any explanations, comments, or extra words. Your output must be strictly and only the following in **valid JSON format**:
{
 "heading": "(Describe what the product actually is, not just the name , 5 to 6 words only , unique )",
 "subheading": "(Provide a bit more detail explaining the heading ,at least 15 words )",
 "why_use": {
   "line": "(A one-line summary of the main benefit , atleast 15 words )",
   "points": [
     "(First reason , at least 20 words)",
     "(Second reason , at least 20 words)",
     "(Third reason , at least 20 words)",
     "(Fourth reason , at least 20 words)"
   ]
 },
 "features_and_benefits": [
   "(Feature 1 , short and clear)",
   "(Feature 2, short and clear)",
   "(Feature 3, short and clear)"
 ],
 "features_explanation": [
   "(Explanation for feature 1 , at least 20 words)",
   "(Explanation for feature 2 , at least 20 words)",
   "(Explanation for feature 3 , at least 20 words)"
 ]
}
 
Use the product name and description below to generate the required content:
PRODUCT NAME: ${inputData.name}
PRODUCT DESCRIPTION: ${inputData.description}`;


 const AI_Response = async () => {
  try {
    setLoading(true);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Gemini error:", error);
    return null;
  }finally{
    setLoading(false);
  }

};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputData.name || !inputData.description) return;
    
    // Handle form submission logic here
    console.log("Form submitted:", inputData);

  const result = await AI_Response();
  console.log("The response of AI is this:", result);


  if(result){

    setAIResponse(result);
    navigate(`/${username}/${inputData.name}/preview+edit`,{

      state:{

        productName: inputData.name,
        aiResponse: result,

      }

    });


  }
    
    setInputData({
      name: "",
      imageKeywords: "",
      tone: "",
      targetAudience: "",
      description: ""
    });
  };

  if(loading) return <Loader />


  return (<div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-purple-50 font-sans overflow-x-hidden">
  {/* Animated Header */}
  <header className="bg-white/90 backdrop-blur-sm border-b border-purple-100 shadow-sm w-full sticky top-0 z-50 transition-all duration-300 hover:shadow-md">
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-semibold text-slate-800 tracking-tight flex items-center">
          <span className="text-purple-500 mr-2 animate-pulse">✨</span>
          Content Strategy Assistant
        </h1>
        <div className="hidden sm:block">
          <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full transition-all hover:bg-purple-200">
            BETA
          </span>
        </div>
      </div>
    </div>
  </header>

  <main className="w-full animate-fadeIn">
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-3xl mx-auto transition-all duration-300 hover:scale-[1.005]">
        {/* Card with subtle effects */}
        <div className="bg-white rounded-xl shadow-sm border border-purple-100/50 overflow-hidden transition-all duration-300 hover:shadow-md">
          {/* Card header */}
          <div className="bg-gradient-to-r from-purple-50 to-white p-6 border-b border-purple-100/50">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 flex items-center">
              <span className="text-purple-500 mr-2">🖋️</span>
              Content Strategy Generator
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Create a comprehensive content strategy for your product
            </p>
          </div>

          {/* Form content */}
          <div className="p-6 sm:p-8">
            {/* Product Name */}
            <div className="mb-6 animate-fadeInLeft">
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <span>Product Name</span>
                <span className="text-purple-500 ml-1">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm placeholder-slate-400 hover:border-purple-300"
                placeholder="Enter product name"
                value={inputData.name}
                onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
              />
            </div>

            {/* Product Description */}
            <div className="mb-8 animate-fadeInLeft">
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <span>Product Description</span>
                <span className="text-purple-500 ml-1">*</span>
              </label>
              <textarea
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm resize-none placeholder-slate-400 hover:border-purple-300"
                rows={5}
                placeholder="Describe key features, benefits, and unique value proposition..."
                value={inputData.description}
                onChange={(e) => setInputData({ ...inputData, description: e.target.value })}
              />
              <p className="text-xs text-slate-500 mt-1">
                Minimum 50 characters required
              </p>
            </div>

            {/* Generate Button */}
            <div className="flex justify-end animate-fadeInUp">
              <button
                type="submit"
                disabled={loading || !inputData.name || !inputData.description}
                className={`relative overflow-hidden px-6 sm:px-8 py-3.5 rounded-lg font-medium text-sm w-full sm:w-auto transition-all duration-200 shadow-sm flex items-center justify-center gap-2
                  ${loading ? "bg-slate-100 text-slate-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200 hover:shadow-md hover:-translate-y-0.5"}`}
                onClick={handleSubmit}
              >
                {loading ? (
                  <>
                    <span className="animate-spin">🔄</span>
                    <span>Generating Strategy...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Strategy</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </>
                )}
                {/* Button hover effect */}
                {!loading && (
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-700/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Help text */}
        <div className="mt-6 text-center animate-fadeIn">
          <p className="text-xs text-slate-500 flex items-center justify-center">
            <span className="mr-1">❓</span>
            Need help? Our AI will analyze your product and generate a complete strategy
          </p>
        </div>
      </div>
    </div>
  </main>

  <style jsx>{`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
    .animate-fadeInLeft { animation: fadeInLeft 0.5s ease-out; }
    .animate-fadeInUp { animation: fadeInUp 0.5s ease-out; }
  `}</style>
</div>
  );
}