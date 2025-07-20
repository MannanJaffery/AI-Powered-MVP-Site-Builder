
import landingImage from '../assets/images/landing.png';
import Navbar from '../components/navbar';

const LandingPage = () => {
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


<div class="flex gap-3 flex-wrap justify-center">
  <span class="px-3 py-1 rounded-md border border-green-200 bg-green-50 text-green-500 text-sm font-medium">LandingPage</span>
  <span class="px-3 py-1 rounded-md border border-purple-200 bg-purple-50 text-purple-500 text-sm font-medium">Stripe Integration</span>
  <span class="px-3 py-1 rounded-md border border-red-200 bg-red-50 text-red-500 text-sm font-medium">Modern Design</span>
  <span class="px-3 py-1 rounded-md border border-cyan-200 bg-cyan-50 text-cyan-500 text-sm font-medium">Dashboard</span>
</div>





    {/* Heading & Text */}
    <div className="relative z-10 p-8 text-center">
      <h1 className="text-5xl font-bold">Build your next <span class='changer'>MVP</span> today, not someday</h1> 
      
      {/* MVP , STARTUP , PRODUCT , WEBAPP */}

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