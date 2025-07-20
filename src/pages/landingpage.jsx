
import landingImage from '../assets/images/landing.png';
import Navbar from '../components/navbar';

const LandingPage = () => {
return (
<>
  {/* Navbar */}
  <div className="z-10 relative w-full bg-white">
    <Navbar className  = 'z-10 bg-white' />
  </div>

  {/* Hero Section with background */}
  <div className="relative h-screen overflow-hidden">
    {/* Background SVG */}
    <img
      className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-0"
      src="https://static.typecdn.com/df8f99cf-82fd-423b-b55b-ba08cb042d95/2TpEkhn3WnmoSQiUAYXU4B6b927_dot-grid.svg"
      alt="background"
    />

    {/* Landing Image */}
<img
  src={landingImage}
  className="relative z-10 mx-auto mt-12 max-w-[80%] h-auto md:max-w-[75%] sm:max-w-[55%]"
  alt="Landing Image"
/>


    {/* Heading & Text */}
    <div className="relative z-10 p-8 text-center">
      <h1 className="text-5xl font-bold">Build your next <span class='changer'>MVP</span> today, not someday</h1>
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