import { useEffect} from 'react'; 
import { initLineStreamAnimation } from '../animations/landingAnimations';
import landingImage from '../assets/images/landing.png';

const LandingPage = () => {
return (
    <>

<div className="relative min-h-screen overflow-x-hidden overflow-y-auto">

  <div>
    NavBar
</div>  


  <img
    className="absolute top-0 left-0 w-full h-screen object-cover pointer-events-none -z-10"
    src="https://static.typecdn.com/df8f99cf-82fd-423b-b55b-ba08cb042d95/2TpEkhn3WnmoSQiUAYXU4B6b927_dot-grid.svg"
    alt="background"
  />

  <img src={landingImage} className='relative z-1 max-w-[100%] h-auto'alt="Landing Image" />

  <div className="relative z-1 p-8">
    <h1 className="text-4xl font-bol">Welcome to My Website</h1>
    <p className="">Scroll down to hide background</p>
  </div>

  {/* More Sections */}
  <div className="h-[200vh] bg-white text-black p-8">
    <p>This is more content after scroll.</p>
  </div>
</div>

    
    </>
)
};

export default LandingPage;