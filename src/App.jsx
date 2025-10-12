import Dashboard from "./pages/dashboard";
import InputIdea from "./pages/inputidea";
import LandingPage from "./pages/landingpage";
import NotFoundPage from "./pages/notfound";

import Register from "./pages/authentication/register";
import Login from "./pages/authentication/login";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/protectedRoute";
import ForgetPassword from "./pages/authentication/forgetpassword";
import ProductPage from "./pages/productpage";
import PreviewandEdit from "./pages/previewandedit";
import Subscribers from "./pages/subscribers";
import { ProductsProvider } from "./context/productsContext";
import Changepassword from "./pages/authentication/changepassword";

import Scoring_Tool from "./pages/tools/scoring_tools";
import CompetitorFinder from "./pages/tools/competitor_finder";
import MarketSizeEstimator from "./pages/tools/market_size_estimator";



import Success from "./pages/successpayment";
import Cancel from "./pages/cancelpayment";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
 return (
  <>
  <AuthProvider>
    <ProductsProvider >
    <BrowserRouter>

    <ToastContainer position="top-right" autoClose={3000} />
    
        <Routes>
            <Route path="/" element = {<LandingPage />} />
            
            <Route path = "/dashboard/:id" element = {
              <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>}/>

            <Route path = "/subscribers/:userid" element = {
            <ProtectedRoute>
              <Subscribers />
            </ProtectedRoute>}/>

            <Route path = "/ideainput" element = {<InputIdea />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>


            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} /> 


            <Route path="/forget-password" element={<ForgetPassword/>}/>

            <Route path="/change-password" element={
              <ProtectedRoute>
              <Changepassword />
              </ProtectedRoute>
              }/>

            <Route path="/input-idea" element={
       
              <InputIdea/>
            
              }/>

              <Route path="/:username/:productname/preview+edit" element={

              <PreviewandEdit/>

              }/>
              
              <Route path="/:username/:productname" element={
              <ProductPage/>
              
              }/>


              <Route path="/idea-validator" element={<Scoring_Tool/>}/>
              <Route path="/competitor-finder" element={<CompetitorFinder/>}/>
              <Route path="/market-size-estimate" element={<MarketSizeEstimator/>}/>



            <Route path="*" element={<NotFoundPage />} />
        </Routes>
        
    </BrowserRouter>
    </ProductsProvider>
    </AuthProvider>
  </>
 )
}

export default App;
