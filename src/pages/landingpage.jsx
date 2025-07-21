
import landingImage from '../assets/images/landing.png';
import Navbar from '../components/navbar';

import {LayoutDashboard,CreditCard,Paintbrush,Smartphone,} from "lucide-react";
import Button from '../components/button';


import { useEffect } from 'react';


const LandingPage = () => {

const main_heading_words = ["MVP", "Startup", "Product", "WebApp"];
let index = 0;
useEffect(()=>{
    
    const interval = setInterval(()=>{
        index = (index +1) % main_heading_words.length;
        const changer = document.getElementById('changer');
        if(changer){
            changer.textContent = main_heading_words[index];
        }

    },2000)
return () => clearInterval(interval);   

},[])    


return (
<>
  {/* Navbar */}
  <div className="z-10 relative w-full bg-white">
    <Navbar />
  </div>

  {/* Hero Section with background */}
  <div className="relative h-fit">
    {/* Background SVG */}
    <img
      className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-0"
      src="https://static.typecdn.com/df8f99cf-82fd-423b-b55b-ba08cb042d95/2TpEkhn3WnmoSQiUAYXU4B6b927_dot-grid.svg"
      alt="background"
    />

    {/* Landing Image */}
<img
  src={landingImage}
  alt="Landing Image"
  className="relative z-10 mx-auto mt-16 sm:mt-20 md:mt-24 lg:mt-12 max-w-[80%] h-auto md:max-w-[75%] sm:max-w-[55%]"
/>


<div className="flex flex-wrap gap-2 justify-center">
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md border border-green-200 bg-green-50 text-green-500 text-sm font-medium">
        <Smartphone size={14} />
        LandingPage
      </span>
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md border border-purple-200 bg-purple-50 text-purple-500 text-sm font-medium">
        <CreditCard size={14} />
        Stripe Integration
      </span>
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md border border-red-200 bg-red-50 text-red-500 text-sm font-medium">
        <Paintbrush size={14} />
        Modern Design
      </span>
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md border border-cyan-200 bg-cyan-50 text-cyan-500 text-sm font-medium">
        <LayoutDashboard size={14} />
        Dashboard
      </span>
    </div>


    {/* Heading & Text */}
    <div className="relative z-10 p-8 text-center">
      <h1 className="text-5xl font-bold">Build your next <span id = 'changer' class=' text-purple-900'>MVP</span> today, not someday</h1> 
<span className="text-2xl sm:text-3xl md:text-5xl font-semibold mt-6 block opacity-30 px-4 text-center">


  <strong>Validate your idea fast with <br /> one no-code tool</strong>
</span>


<Button text='Get Started for Free' color = 'bg-purple-800' bgcolor_border='bg-purple-100 border-purple-200'/>

    </div>
  </div>


  {/* More Content */}
  <div className="bg-white text-black p-8">
    <p>This is more content after scroll.</p>
  </div>


</>

)
};

export default LandingPage;