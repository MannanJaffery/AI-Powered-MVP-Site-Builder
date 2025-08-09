
import { useLocation } from 'react-router-dom'

import { animate_scroll_section1, animate_scroll_section2, animate_scroll_section3} from '../animations/Landing_animations';
import { useEffect , useState } from 'react';
import Sidebar from '../components/edit_sidebar';
import Generated_Page_Nav from '../components/generated_page_nav';

import MainContent from '../components/maincontent';
import { addDoc , collection } from 'firebase/firestore';
import { db ,auth } from '../firebase';


const PreviewandEdit = () => {


  const [editmaintitle , seteditmaintitle] = useState('');
  const [editsubtitle , seteditsubtitle] = useState('');


  const [features , setFeatures] = useState([]);
  const [featuresexplanation , setFeaturesExplanation] = useState([]);


  const [whyuseline , setWhyuseLine] = useState('');
  const [whyusepoints , setWhyUsePoints] = useState([]);


  const [showsidebar , setshowsidebar] = useState(false);
  const [preview , setPreview] = useState(false);
 
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener('resize', handleResize);

 
  return () => window.removeEventListener('resize', handleResize);
}, []);


  const [benefits, setBenefits] = useState([
  { title: "50%", subtitle: "Discount" },
  { title: "VIP", subtitle: "Priority" },
  { title: "+1 mon", subtitle: "Free Trial" },
]);


  const handleGoogleSignup = () => {
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

    if(parsedResponse && !editmaintitle && !editsubtitle &&(!features || features.length === 0) &&
    (!featuresexplanation || featuresexplanation.length === 0) && !whyuseline && (!whyusepoints || whyusepoints.length===0)){
      seteditmaintitle(parsedResponse.heading);
      seteditsubtitle(parsedResponse.subheading);
      setFeatures(parsedResponse.features_and_benefits);
      setFeaturesExplanation(parsedResponse.features_explanation);
      setWhyuseLine(parsedResponse.why_use.line);
      setWhyUsePoints(parsedResponse.why_use.points);
    }
  },[parsedResponse])




  useEffect(()=>{
      
    if(!showsidebar){
      animate_scroll_section1(".section1");
      animate_scroll_section2(".section2");
      animate_scroll_section3(".section3");
    }
   },[showsidebar]);



   

const handlePublish = async ()=> {

  if(!editmaintitle || !editsubtitle || !benefits.length || !productName ||!parsedResponse){
    return;
  }

    const pageData = {
    title: editmaintitle,
    subtitle: editsubtitle,
    benefits,
    productName,
    parsedResponse,
    features,
    featuresexplanation,
    whyuseline,
    whyusepoints,
    createdAt: new Date(),
  };

  try {
    const user = auth.currentUser;
    await addDoc(collection(db, "users", user.uid, "pages"), pageData);
    alert("Page published successfully!");
  } catch (error) {
    console.error("Error publishing page:", error);
    alert("Failed to publish page.");
  }
}

return (

    <>

<div className='flex min-h-screen'>

{!showsidebar && !preview && (
<Generated_Page_Nav 
makesidebarshow = {setshowsidebar}
setPreview = {setPreview}
handlepublish={handlePublish}
 />
)}


<div
  className={`fixed top-0 left-0 h-screen w-[250px] bg-white border-r border-gray-200 shadow-lg z-50 transition-transform duration-300 ${
    showsidebar ? 'translate-x-0' : '-translate-x-full'
  }`}
>


  <Sidebar
    editmaintitle={editmaintitle}
    seteditmaintitle={seteditmaintitle}
    editsubtitle={editsubtitle}
    seteditsubtitle={seteditsubtitle}
    benefits={benefits}
    setBenefits={setBenefits}
    setshowsidebar={setshowsidebar}
    features = {features}
    featuresexplanation = {featuresexplanation}
    setFeatures = {setFeatures}
    setFeaturesExplanation = {setFeaturesExplanation}
    whyuseline={whyuseline}
    whyusepoints={whyusepoints}
    setWhyuseLine={setWhyuseLine}
    setWhyUsePoints={setWhyUsePoints}
  />
</div>


<MainContent 
  showsidebar={showsidebar}
  isMobile={isMobile}
  preview={preview}
  setPreview={setPreview}
  editmaintitle={editmaintitle}
  editsubtitle={editsubtitle}
  handleGoogleSignup={handleGoogleSignup}
  benefits={benefits}
  parsedResponse={parsedResponse}
  productName={productName}
  features = {features}
  featuresexplanation = {featuresexplanation}
  whyuseline={whyuseline}
  whyusepoints={whyusepoints}
/>
</div>
    </>

);
}

export default PreviewandEdit
