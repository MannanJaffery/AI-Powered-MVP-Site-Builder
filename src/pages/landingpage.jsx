
import landingImage from '../assets/images/landing.png';
import Navbar from '../components/navbar';

import {LayoutDashboard,CreditCard,Paintbrush,Smartphone,Rocket,
  Brush,ShieldCheck,ChevronDown,
  Hammer , UserCheck , Clock , TrendingUp} from "lucide-react";
import Button from '../components/button';

import { useEffect ,useState , useRef } from 'react';
import Footer from '../components/footer';


//animations
import { animate_main_heading , animateImageEntrance , animate_scroll_section1, animate_scroll_section2} from '../animations/Landing_animations';


const faqs = [
  {
    question: "What is an MVP?",
    answer:
      "MVP stands for Minimum Viable Product — the simplest version of your product that helps validate your idea with real users before fully building it.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "You can launch in just a few hours. Our builder is optimized to help you set up landing pages, collect signups, and share your idea quickly.",
  },
  {
    question: "Do I need coding skills?",
    answer:
      "Nope. MVP Builder is designed for founders, marketers, and creators. You don’t need any technical background to use it.",
  },
  {
    question: "Can I collect payments or signups?",
    answer:
      "Yes! You can connect Stripe to accept pre-orders or just collect emails to measure interest.",
  },
  {
    question: "What happens after I get users?",
    answer:
      "Use their feedback to improve your product. Whether it’s refining the pitch or building the full version — you’ll be working with proof, not assumptions.",
  },
];

const testimonials = [
  {
    name: "Sarah Malik",
    role: "Indie Hacker",
    quote:
      "I launched my MVP landing page in one night. The best part? People actually signed up before I even wrote a single line of backend code.",
    avatar:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Ali Raza",
    role: "Startup Founder",
    quote:
      "The MVP builder helped us validate our product idea without wasting months of development. We even got 30+ paying users just from the landing page.",
    avatar:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Huda Khan",
    role: "No-Code Maker",
    quote:
      "I’m not a developer, but I was able to build and share my idea. It felt like cheating — in a good way!",
    avatar:
      "https://randomuser.me/api/portraits/women/65.jpg",
  },
];



const LandingPage = () => {

const [openIndex, setOpenIndex] = useState(null);
const main_heading_words = ["MVP", "Startup", "Product", "WebApp"];
const imageref = useRef(null);


  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


let index = 0;


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
return () => clearInterval(interval); 

},[])    




return (
<>
  {/* Navbar */}
<div className="z-10 relative w-full bg-white">
  <Navbar />
</div>


  <div className="relative z-0 w-full pt-24"> {/* Use padding instead of margin! */}
  {/* Background SVG */}
  <img
    className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-0 bg-[#F4F4F8]"
    src="https://static.typecdn.com/df8f99cf-82fd-423b-b55b-ba08cb042d95/2TpEkhn3WnmoSQiUAYXU4B6b927_dot-grid.svg"
    alt="background"
  />

  {/* Landing Image */}


<div className='flex flex-col'>  
<img
  src={landingImage}
  ref={imageref}
  onLoad={() => animateImageEntrance(imageref)}
  alt="Landing"
  className="relative z-10 mx-auto max-w-[80%] h-auto md:max-w-[55%] sm:max-w-[65%]"
/>
<div className="flex flex-wrap gap-2 justify-center z-10">
      <span className="badge-highlight inline-flex items-center gap-1 px-3 py-1 rounded-md border border-green-200 bg-green-50 text-green-500 text-sm font-medium">
        <Smartphone size={14} />
        LandingPage
      </span>
      <span className="badge-highlight inline-flex items-center gap-1 px-3 py-1 rounded-md border border-purple-200 bg-purple-50 text-purple-500 text-sm font-medium">
        <CreditCard size={14} />
        Stripe Integration
      </span>
      <span className="badge-highlight inline-flex items-center gap-1 px-3 py-1 rounded-md border border-red-200 bg-red-50 text-red-500 text-sm font-medium">
        <Paintbrush size={14} />
        Modern Design
      </span>
      <span className="badge-highlight inline-flex items-center gap-1 px-3 py-1 rounded-md border border-cyan-200 bg-cyan-50 text-cyan-500 text-sm font-medium">
        <LayoutDashboard size={14} />
        Dashboard
      </span>
</div>

</div>



    {/* Heading & Text */}
    <div className="relative z-10 p-8 text-center">
      <h1 className="text-5xl font-bold relative">Build your next <span id = 'changer' className=' text-purple-900 relative inline-block will-change-transform'>MVP</span> today, not someday</h1> 
<span className="text-2xl sm:text-3xl md:text-5xl font-semibold mt-6 block opacity-30 px-4 text-center">


  <strong>Validate your idea fast with <br /> one no-code tool</strong>
</span>


<Button text='Get Started for Free' color = 'bg-purple-800' bgcolor_border='bg-purple-100 border-purple-200'/>

    </div>
  </div>


  {/* More Content */}
<section className="section1 max-w-7xl mx-auto px-4 py-16 bg-[#F4F4F8]">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
    Build Smarter. Launch Faster.
  </h2>
  <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
    Everything you need to turn your SaaS idea into a working MVP — no fluff, just speed and precision.
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

    {/* Feature 1 */}
    <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="text-blue-600 mb-4">
        <Rocket className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-lg mb-2">Ready-to-Go Landing Pages</h3>
      <p className="text-sm text-gray-600">
        Launch with stunning, responsive pages built for conversion — no design skills required.
      </p>
    </div>

    {/* Feature 2 */}
    <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="text-purple-600 mb-4">
        <CreditCard className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-lg mb-2">Stripe Integration</h3>
      <p className="text-sm text-gray-600">
        Accept payments seamlessly with built-in Stripe setup, so you can monetize from day one.
      </p>
    </div>

    {/* Feature 3 */}
    <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="text-red-600 mb-4">
        <Brush className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-lg mb-2">Modern UI Design</h3>
      <p className="text-sm text-gray-600">
        Built with Tailwind and best design practices to deliver a beautiful user experience.
      </p>
    </div>

    {/* Feature 4 */}
    <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="text-cyan-600 mb-4">
        <LayoutDashboard className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-lg mb-2">Interactive Dashboard</h3>
      <p className="text-sm text-gray-600">
        Manage users, content, and settings in a clean, intuitive dashboard that scales with your app.
      </p>
    </div>

    {/* Feature 5 */}
    <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="text-green-600 mb-4">
        <ShieldCheck className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-lg mb-2">Auth & Security</h3>
      <p className="text-sm text-gray-600">
        Secure authentication with Firebase or custom setups, keeping user data protected and access smooth.
      </p>
    </div>

    {/* Feature 6 */}
    <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="text-yellow-500 mb-4">
        <Hammer className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-lg mb-2">Fully Customizable</h3>
      <p className="text-sm text-gray-600">
        Modify every section to match your brand and features — you're in full control.
      </p>
    </div>
  </div>
</section>


    <section className="section2 w-full bg-gray-50 py-16 px-6 md:px-20 overflow-x-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Why Use MVP Builder?
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-12">
          Validate ideas fast, test with users, and launch with confidence — all without writing a single line of backend code.
        </p>

        <div className="grid md:grid-cols-2 gap-10 text-left">
          <div className="flex items-start gap-4">
            <Rocket className="text-blue-600 w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Launch Quickly</h3>
              <p className="text-gray-600">
                Skip the long dev cycles and get a functional MVP in days, not months.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <UserCheck className="text-green-600 w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Validate with Real Users</h3>
              <p className="text-gray-600">
                Get your idea in front of early adopters and gather actionable feedback.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="text-yellow-500 w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Save Time & Money</h3>
              <p className="text-gray-600">
                Avoid building features users don’t need by starting small and focused.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <TrendingUp className="text-purple-600 w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Build Momentum</h3>
              <p className="text-gray-600">
                Turn your idea into traction fast and set the stage for funding or scaling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


        <section className="w-full py-16 px-6 md:px-20 bg-slate-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>



    <section className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Trusted by Early Founders & Builders
        </h2>
        <p className="text-gray-600 mb-12">
          Makers from all backgrounds are using MVP Builder to validate ideas faster than ever.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300"
            >
              <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>



<section id="payment" className="w-full bg-blue-50 py-24 px-6">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      Choose Your Plan
    </h2>
    <p className="text-gray-600 text-lg mb-12">
      Get started for free — upgrade anytime. No hidden fees. Cancel anytime.
    </p>

    <div className="grid md:grid-cols-4 gap-6">
      
      {/* Free Demo Plan */}
      <div className="border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
        <div>
          <span className="text-sm font-semibold text-gray-500 uppercase">Free Demo</span>
          <h3 className="text-3xl font-bold text-gray-800 mt-2 mb-1">Free</h3>
          <p className="text-gray-500 mb-6 text-sm">
            Sign up once and explore the platform. No analytics collected.
          </p>
        </div>
        <a
          href="#"
          className="block w-full mt-auto text-blue-600 font-semibold hover:underline"
        >
          Try the Demo →
        </a>
      </div>

      {/* Free Forever Plan */}
      <div className="border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
        <div>
          <span className="text-sm font-semibold text-gray-500 uppercase">Free Tier</span>
          <h3 className="text-3xl font-bold text-gray-800 mt-2 mb-1">$0</h3>
          <p className="text-gray-500 mb-6 text-sm">
            Limited features · No credit card required.
          </p>
        </div>
        <a
          href="#"
          className="block w-full mt-auto text-blue-600 font-semibold hover:underline"
        >
          Start Free →
        </a>
      </div>

      {/* Monthly Plan */}
      <div className="border border-gray-200 rounded-2xl p-8 shadow-lg flex flex-col justify-between">
        <div>
          <span className="text-sm font-semibold text-blue-500 uppercase">Standard</span>
          <h3 className="text-3xl font-bold text-gray-800 mt-2 mb-1">$10/mo</h3>
          <p className="text-gray-500 mb-6 text-sm">
            All core features + future updates.
          </p>
        </div>
        <a
          href="#"
          className="block w-full mt-auto bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Subscribe Monthly
        </a>
      </div>

      {/* Lifetime Deal */}
      <div className="relative border border-blue-200 rounded-2xl p-8 shadow-xl bg-blue-50 flex flex-col justify-between">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wide shadow-md">
          Most Popular
        </span>
        <div>
          <span className="text-sm font-semibold text-blue-500 uppercase">Lifetime Access</span>
          <h3 className="text-3xl font-bold text-gray-800 mt-2 mb-1">$49</h3>
          <p className="text-gray-500 mb-6 text-sm">
            Pay once, access forever. Includes all future updates.
          </p>
        </div>
        
        <a
          href="#"
          className="block w-full mt-auto bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Get Lifetime Deal
        </a>

      </div>
    </div>
  </div>
</section>

    <Footer />


</>

)
};

export default LandingPage;