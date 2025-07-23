
//https://mvp-go-seven.vercel.app/




import landingImage from '../assets/images/landing.png';
import Navbar from '../components/navbar';

import {LayoutDashboard,CreditCard,Paintbrush,Smartphone,Rocket,
  Brush,ShieldCheck,ChevronDown,
  Hammer , UserCheck , Clock , TrendingUp , HelpCircle , Star , CheckCircle , XCircle , BadgeCheck} from "lucide-react";
import Button from '../components/button';

import { useEffect ,useState , useRef } from 'react';
import Footer from '../components/footer';


//animations
import { animate_main_heading , animateImageEntrance , animate_scroll_section1, animate_scroll_section2, animate_scroll_section3} from '../animations/Landing_animations';



//this is mock data for now , while creating mvp
const faqs = [
  {
    question: "What exactly does this platform do?",
    answer:
      "It helps you validate startup ideas by generating a clean, AI-powered landing page using Gemini. Users describe their idea, and the system creates tailored copy and visuals on a unique subpage with a waitlist signup at the bottom.",
  },
  {
    question: "How do I know if my idea has real interest?",
    answer:
      "Every landing page has a waitlist card that tracks signups. You’ll get access to a dashboard with names, emails, and total interest count — giving you clear data to assess user demand before investing in full development.",
  },
  {
    question: "What can I edit on my landing page?",
    answer:
      "Free users can preview a demo page, while paid users get access to a simple editor to customize headings, subheadings, and content. This allows more control while keeping the layout clean and consistent.",
  },
  {
    question: "Can I accept payments or early pre-orders?",
    answer:
      "Yes. You can connect Stripe to offer preorder pricing and charge before building the product. It’s a great way to validate demand and potentially fund early development.",
  },
  {
    question: "How is my page shared or accessed?",
    answer:
      "Each user receives a unique sublink from our domain (e.g. yourdomain.com/username), where they can view, share, and edit their AI-generated page based on their access level.",
  },
  {
    question: "What’s included in the development process?",
    answer:
      "The project is delivered in four milestones: a responsive landing page, AI page generation using Gemini, a dashboard with waitlist analytics, and Stripe integration. Everything is built using React, Tailwind, Firebase, and deployed live on Vercel.",
  },
];


const testimonials = [
  {
    name: "Sarah Malik",
    role: "Developer",
    quote:
      "I launched my MVP landing page in minutes. The best part? People actually signed up before I even wrote a single line of backend code.",
    avatar:
      "https://randomuser.me/api/portraits/women/44.jpg",
    stars:5
  },
  {
    name: "Ali Raza",
    role: "Startup Founder",
    quote:
      "The MVP builder helped us validate our product idea without wasting months of development. We even got 30+ paying users just from the landing page.",
    avatar:
      "https://randomuser.me/api/portraits/men/32.jpg",
    stars:4
  },
  {
    name: "Huda Khan",
    role: "Co-Founder",
    quote:
      "I am not a developer, but I was able to build and share my idea. It felt like cheating — in a good way! I did not do anything , almost everything was selected by AI",
    avatar:
      "https://randomuser.me/api/portraits/women/65.jpg",
    stars:5
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
    animate_scroll_section3(".section3");

return () => clearInterval(interval); 

},[])    




return (
<>
  {/* Navbar */}

<div className="z-10 relative w-full bg-white">
  <Navbar />
</div>


  <div className="relative z-0 w-full pt-24"> 
  {/* Background SVG */}
  <img
    className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-0 bg-[#F4F4F8]"
    src="https://static.typecdn.com/df8f99cf-82fd-423b-b55b-ba08cb042d95/2TpEkhn3WnmoSQiUAYXU4B6b927_dot-grid.svg"
    alt="background"
  />

  {/* Landing Image */}

<div className='flex flex-col items-center justify-center px-4'> 
<h1 className="flex flex-wrap justify-center mb-4 p-4 text-5xl font-bold text-center relative">
  Validate your next 
  <span id='changer' className='text-purple-900 relative inline-block will-change-transform ml-2'>MVP</span>&nbsp;today
</h1>

{/* I had to add the space manually here */}

  <img
    src={landingImage}
    ref={imageref}
    onLoad={() => animateImageEntrance(imageref)}
    alt="Landing"
    className="relative z-10 mx-auto max-w-[80%] h-auto md:max-w-[40%] sm:max-w-[65%]"
  />

{/* spans for the image dessign below */}

  <div className="flex flex-wrap gap-2 justify-center z-10 mt-4 px-2">
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


<span className="text-2xl sm:text-3xl md:text-4xl font-semibold block opacity-30 px-4 text-center">


  <strong>Showcase your ideas...</strong>
</span>


<Button text='Get Started for Free' color = 'bg-purple-800' bgcolor_border='bg-purple-100 border-purple-200'/>

    </div>
  </div>


<section id='features' className="section1 max-w-7xl mx-auto px-4 py-16 bg-gray-50">
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


    <section className="section2 w-full bg-[#F4F4F8] py-16 px-6 md:px-20 ">
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





<section id='faq' className="section3 w-full py-16 px-6 md:px-20 bg-[#fafafc]">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
      Frequently Asked Questions
    </h2>
    <div className="space-y-6">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl shadow-sm transition-all duration-300 bg-white"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center p-6 text-left group hover:bg-gray-50 rounded-t-xl"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
              <span className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                {faq.question}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-transform duration-300 ${
                openIndex === index ? "rotate-180 text-indigo-600" : ""
              }`}
            />
          </button>
          <div
            className={`px-6 pt-0 overflow-hidden transition-all duration-300 text-gray-600 ${
              openIndex === index ? "max-h-screen pb-6" : "max-h-0"
            }`}
          >
            <p className="text-base leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="section1 bg-white py-20 px-6 md:px-20">
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
          className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col justify-between h-full"
        >
            <div className="flex items-center justify-between mt-6">
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
            {/* Star rating (emoji or Lucide icons) */}
            <div className="flex gap-1 text-yellow-400">
              {[...Array(t.stars)].map((_, starIndex) => (
                <Star key={starIndex} className="w-4 h-4 fill-yellow-400" />
              ))}
            </div>
          </div>


          <div>
            <p className="text-gray-700 italic mt-4">“{t.quote}”</p>
          </div>
          
        </div>
      ))}
    </div>
  </div>
</section>

<section id="pricing" className="section3 w-full bg-purple-100 py-28 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      Choose Your Plan
    </h2>
    <p className="text-gray-600 text-lg mb-16">
      Get started for free — upgrade anytime. No hidden fees. Cancel anytime.
    </p>

    <div className="grid gap-8 md:grid-cols-3">
      {/* Free Demo Plan */}
      <div className="relative border-2 border-purple-200 bg-gray-100 rounded-2xl p-10 shadow-md flex flex-col justify-between hover:shadow-lg transition-all duration-300 min-h-[400px]">
        <div>
          <span className="text-sm font-semibold text-gray-500 uppercase">Free Demo</span>
          <h3 className="text-3xl font-bold text-gray-800 mt-2 mb-4">Free</h3>
          <ul className="text-left text-sm text-gray-600 space-y-3">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" />Full platform access (limited)</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" />Generate 1 free website template</li>
            <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" />Dashboard or analytics</li>
            <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" />Custom domain</li>
          </ul>
        </div>
        <div className="mt-6">
          <Button
            text="Free Demo"
            color="bg-purple-800"
            bgcolor_border="bg-purple-100 border-purple-200"
          />
        </div>
      </div>

      {/* Monthly Plan */}
      <div className="relative border-2 border-purple-400 bg-gray-100 rounded-2xl p-10 shadow-md flex flex-col justify-between hover:shadow-lg transition-all duration-300 min-h-[400px]">
        <div>
          <span className="text-sm font-semibold text-purple-600 uppercase">Standard</span>
          <h3 className="text-3xl font-bold text-gray-800 mt-2 mb-4">$10/mo</h3>
          <ul className="text-left text-sm text-gray-600 space-y-3">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" />Full feature access</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" />Unlimited site generations</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" />Dashboard + analytics access</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" />Priority support</li>
          </ul>
        </div>
        <div className="mt-6">
          <Button
            text="Subscribe Monthly"
            color="bg-purple-800"
            bgcolor_border="bg-purple-100 border-purple-200"
          />
        </div>
      </div>

      {/* Lifetime Deal */}
      <div className="relative border-4 border-purple-700 bg-gray-100 rounded-2xl p-10 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 min-h-[400px]">
        {/* Ribbon */}
        <div className="absolute -top-3 right-4 bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <Star className="w-3.5 h-3.5" /> Most Popular
        </div>
        <div>
          <span className="text-sm font-semibold text-purple-700 uppercase">Lifetime Access</span>
          <h3 className="text-3xl font-bold text-gray-800 mt-2 mb-4">$49</h3>
          <ul className="text-left text-sm text-gray-600 space-y-3">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-700" />One-time payment</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-700" />All Standard plan features</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-700" />Lifetime updates</li>
            <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-purple-700" />Bonus templates + themes</li>
          </ul>
        </div>
        <div className="mt-6">
          <Button
            text="Get Lifetime Deal"
            color="bg-purple-800"
            bgcolor_border="bg-purple-100 border-purple-200"
          />
        </div>
      </div>
    </div>
  </div>
</section>



    <Footer />

</>

)
};

export default LandingPage;