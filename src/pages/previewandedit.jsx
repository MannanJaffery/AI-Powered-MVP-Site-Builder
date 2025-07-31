import React from 'react'
import { useLocation } from 'react-router-dom'
import useUsername from '../services/getcurrentusername';
import { ArrowRight ,Sparkles , Zap , CreditCard , Brush, LayoutGrid , Shield , Settings,Users,BarChart2  } from 'lucide-react';

import { FcGoogle } from 'react-icons/fc';

const PreviewandEdit = () => {

 const username = useUsername();


  const handleGoogleSignup = () => {
    // Google signup functionality will go here
    console.log('Google signup clicked');
  };

 const location = useLocation();
  const { productName, aiResponse, formData } = location.state || {};
  
  let parsedResponse = null;
  
  if (aiResponse) {
    try {

      if (typeof aiResponse === 'object') {
        parsedResponse = aiResponse;
        console.log(parsedResponse);
      } else {

        const cleanedResponse = aiResponse
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();
        parsedResponse = JSON.parse(cleanedResponse);
      }
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      console.log("Raw AI response:", aiResponse);
      return <div>Error: Invalid AI response format</div>;
    }
  }

  
  if (!productName || !parsedResponse) {
    return <div>No data available</div>;
  }

return (

    <>
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Badge */}

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block lg:inline lg:ml-4">
              {parsedResponse.heading}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            {parsedResponse.subheading}
          </p>

          {/* CTA Section */}
          <div className="max-w-md mx-auto mb-12">
            <button 
              onClick={handleGoogleSignup}
              className="group w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl border border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 text-lg"
            >
              <FcGoogle size={20} />
              <span>Continue with Google</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Alternative CTA */}
            <div className="mt-4">
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-lg">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>


<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Features and Benefits
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Crafted to Perform Flawlessly. Built to Help You Achieve More
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {parsedResponse.features_and_benefits?.map((feature, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-100 transition-all duration-300 hover:shadow-lg"
        >
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
            index % 6 === 0 ? 'bg-blue-50 text-blue-600' :
            index % 6 === 1 ? 'bg-purple-50 text-purple-600' :
            index % 6 === 2 ? 'bg-red-50 text-red-600' :
            index % 6 === 3 ? 'bg-cyan-50 text-cyan-600' :
            index % 6 === 4 ? 'bg-green-50 text-green-600' :
            'bg-yellow-50 text-yellow-600'
          }`}>
            {index % 6 === 0 && <Zap className="w-6 h-6" />}
            {index % 6 === 1 && <CreditCard className="w-6 h-6" />}
            {index % 6 === 2 && <Brush className="w-6 h-6" />}
            {index % 6 === 3 && <LayoutGrid className="w-6 h-6" />}
            {index % 6 === 4 && <Shield className="w-6 h-6" />}
            {index % 6 === 5 && <Settings className="w-6 h-6" />}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {feature}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {parsedResponse.features_explanation[index]}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="w-full bg-white py-20 px-4 sm:px-6">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Why Use {productName}?
      </h2>
      <p className="text-gray-600 text-lg max-w-3xl mx-auto">
        {parsedResponse.why_use?.line || "The smarter way to validate your idea before building"}
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">

      <div className="flex items-start gap-6 bg-white p-6 rounded-xl border border-gray-200">
        <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
          <Zap className="text-blue-600 w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {parsedResponse.why_use?.points?.[0]?.title || "Lightning Fast Setup"}
          </h3>
          <p className="text-gray-600">
            {parsedResponse.why_use?.points?.[0]?.description || 
             "Get your waitlist page live in minutes, not days, with our streamlined process"}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-6 bg-white p-6 rounded-xl border border-gray-200">
        <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
          <Users className="text-green-600 w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {parsedResponse.why_use?.points?.[1]?.title || "Real User Validation"}
          </h3>
          <p className="text-gray-600">
            {parsedResponse.why_use?.points?.[1]?.description || 
             "Gauge genuine interest with real signups before investing in development"}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-6 bg-white p-6 rounded-xl border border-gray-200">
        <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
          <BarChart2 className="text-purple-600 w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {parsedResponse.why_use?.points?.[2]?.title || "Actionable Insights"}
          </h3>
          <p className="text-gray-600">
            {parsedResponse.why_use?.points?.[2]?.description || 
             "Get clear metrics on conversion rates and user interest to inform your decisions"}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-6 bg-white p-6 rounded-xl border border-gray-200">
        <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
          <Shield className="text-amber-600 w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {parsedResponse.why_use?.points?.[3]?.title || "Risk-Free Validation"}
          </h3>
          <p className="text-gray-600">
            {parsedResponse.why_use?.points?.[3]?.description || 
             "Test your concept with minimal investment before committing to full development"}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

    </>


);
}

export default PreviewandEdit
