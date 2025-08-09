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


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
 return (
  <>
  <AuthProvider>
    <BrowserRouter>

    <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
            <Route path="/" element = {<LandingPage />} />
            
            <Route path = "/dashboard/:id" element = {
              <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>}/>

            <Route path = "/ideainput" element = {<InputIdea />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>

            <Route path="/forget-password" element={<ForgetPassword/>}/>

            <Route path="/input-idea" element={
              <ProtectedRoute>
              <InputIdea/>
              </ProtectedRoute>
              }/>

              <Route path="/:username/:productname/preview+edit" element={
              <ProtectedRoute>
              <PreviewandEdit/>
              </ProtectedRoute>
              }/>


              <Route path="/:username/:productname" element={
              <ProductPage/>
              
              }/>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
    </AuthProvider>
  </>
 )
}

export default App;
