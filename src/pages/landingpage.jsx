
import landingImage from '../assets/images/landing.png';
import Navbar from '../components/navbar';

import {LayoutDashboard,CreditCard,Paintbrush,Smartphone,Rocket,
  Brush,ShieldCheck,ChevronDown,
  Hammer , UserCheck , Clock , TrendingUp} from "lucide-react";
import Button from '../components/button';

import { useEffect ,useState } from 'react';
import Footer from '../components/footer';

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
  <div className="relative h-fit z-0">
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
<section className="max-w-7xl mx-auto px-4 py-16">
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


    <section className="w-full bg-white py-16 px-6 md:px-20">
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


        <section className="w-full py-16 px-6 md:px-20">
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

    <Footer />


</>

)
};

export default LandingPage;