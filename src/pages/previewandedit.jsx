
import { useLocation } from 'react-router-dom'
import { ArrowRight ,ShieldCheck, Clock , Zap , CreditCard , Brush, LayoutGrid , Shield , Settings,Users,TrendingUp  } from 'lucide-react';

import { FcGoogle } from 'react-icons/fc';
import { animate_scroll_section1, animate_scroll_section2, animate_scroll_section3} from '../animations/Landing_animations';
import { useEffect } from 'react';
const PreviewandEdit = () => {





  const handleGoogleSignup = () => {
    // Google signup functionality will go here
    console.log('Google signup clicked');
  };

 const location = useLocation();
  const { productName, aiResponse } = location.state || {};
  
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



  useEffect(()=>{
      
      const interval = setInterval(()=>{
          index = (index +1) % main_heading_words.length;
          const changer = document.getElementById('changer');
          if(changer){
              changer.textContent = main_heading_words[index];
              animate_main_heading(changer);
          }
      },2000)
  
      animate_scroll_section1(".section1");
      animate_scroll_section2(".section2");
      animate_scroll_section3(".section3");
  
  return () => clearInterval(interval); 
  
  },[])    


return (

    <><section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
  
  <div className="absolute inset-0">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl"></div>
  </div>


  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

  <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
    <div className="text-center">
      {/* Premium Badge - Enhanced */}
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xs mb-8 hover:shadow-sm transition-shadow duration-200">
        <span className="text-sm font-medium text-gray-700 tracking-wider">✨ EXCLUSIVE EARLY ACCESS</span>
      </div>


      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {parsedResponse.heading}
        </span>
      </h1>


      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
        {parsedResponse.subheading}
      </p>

      <div className="mt-8 flex justify-center">
<div className="relative group">
  {/* Glowing animated border */}
  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-75 blur-sm group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>

  {/* Button */}
  <button className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:-translate-y-0.5">
    
    {/* Background effect (transparent overlay) */}
    <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 rounded-xl"></span>

    {/* Button content */}
    <div className="relative z-10 flex items-center justify-center space-x-2">
      <span className="text-lg tracking-wide">Reserve Your Spot</span>
      <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
    </div>
  </button>
</div>

      </div>

      <div className="mt-12">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200/50">
            <ShieldCheck className="w-4 h-4 text-green-500 mr-2" />
            <span>Secure reservation</span>
          </div>
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200/50">
            <Clock className="w-4 h-4 text-blue-500 mr-2" />
            <span>Limited availability</span>
          </div>
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200/50">
            <CreditCard className="w-4 h-4 text-purple-500 mr-2" />
            <span>No payment required</span>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-400 tracking-wide">
          Cancel anytime • Data secured with 256-bit encryption
        </p>
      </div>
    </div>
  </div>


  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
</section>


<section className="py-20 bg-gray-50 section1">
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


<section className="w-full bg-[#F9F9FA] py-20 px-6 md:px-20 section2">
 <div className="max-w-6xl mx-auto text-center">
   <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900 leading-tight">
     Why Use <span className="text-blue-600 font-medium">{productName}</span>?
   </h2>
   <p className="text-gray-600 text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
     {parsedResponse.why_use?.line || "The smarter way to validate your idea"}
   </p>
   
   
   <div className="grid md:grid-cols-2 gap-12 text-left max-w-7xl mx-auto">
     <div className="flex items-start gap-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
       <div className="flex-shrink-0">
         <Zap className="text-blue-600 w-5 h-5 mt-1" />
       </div>
       <div>
         <p className="text-lg text-gray-700 leading-relaxed">
           {parsedResponse.why_use.points[0] || "Launch quickly and validate"}
         </p>
       </div>
     </div>

     <div className="flex items-start gap-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
       <div className="flex-shrink-0">
         <Users className="text-green-600 w-5 h-5 mt-1" />
       </div>
       <div>
         <p className="text-lg text-gray-700 leading-relaxed">
           {parsedResponse.why_use.points[1] || "Get real user feedback"}
         </p>
       </div>
     </div>

     <div className="flex items-start gap-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
       <div className="flex-shrink-0">
         <Clock className="text-amber-600 w-5 h-5 mt-1" />
       </div>
       <div>
         <p className="text-lg text-gray-700 leading-relaxed">
           {parsedResponse.why_use.points[2] || "Save time and resources"}
         </p>
       </div>
     </div>

     <div className="flex items-start gap-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
       <div className="flex-shrink-0">
         <TrendingUp className="text-purple-600 w-5 h-5 mt-1" />
       </div>
       <div>
         <p className="text-lg text-gray-700 leading-relaxed">
           {parsedResponse.why_use.points[3] || "Build momentum for launch"}
         </p>
       </div>
     </div>
   </div>
 </div>
</section>

<section className="w-full bg-white py-20 px-4 sm:px-6 section3">
  <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 sm:p-12 border border-gray-200/50 shadow-sm">
    <div className="text-center mb-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Secure Your Advantage
        </span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Early adopters get <span className="font-semibold text-blue-600">exclusive pricing</span> and <span className="font-semibold text-purple-600">priority access</span>
      </p>
    </div>

    <div className="max-w-md mx-auto space-y-6">
      {/* Main Reserve Now Button */}
      <div className="relative group">
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-75 blur-sm group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
        <button className="relative w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-0.5">
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg">Reserve Now - Limited Spots</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>
      </div>

      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Google Early Access Sign-In */}
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-3">Get early access updates</p>
        <button 
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <FcGoogle className="w-5 h-5" />
          <span>Sign up for early access</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8 text-center">
        <div className="bg-white/90 p-3 rounded-lg border border-gray-200/50">
          <div className="text-xl font-bold text-blue-600">50%</div>
          <div className="text-xs text-gray-600">Discount</div>
        </div>
        <div className="bg-white/90 p-3 rounded-lg border border-gray-200/50">
          <div className="text-xl font-bold text-blue-600">VIP</div>
          <div className="text-xs text-gray-600">Priority</div>
        </div>
        <div className="bg-white/90 p-3 rounded-lg border border-gray-200/50">
          <div className="text-xl font-bold text-blue-600">+1 mon</div>
          <div className="text-xs text-gray-600">Free Trial</div>
        </div>
      </div>
    </div>
  </div>
</section>

    </>


);
}

export default PreviewandEdit
