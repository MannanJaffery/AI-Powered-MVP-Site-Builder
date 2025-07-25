import Dashboard from "./pages/dashboard";
import InputIdea from "./pages/inputidea";
import LandingPage from "./pages/landingpage";

import NotFoundPage from "./pages/notfound";
import PreviewAndEdit from "./pages/preview+edit";
import Register from "./pages/authentication/register";

import { BrowserRouter , Routes , Route } from "react-router-dom";
import LoginGoogle from "./pages/authentication/login";
import ForgetPassword from "./pages/authentication/forgetpassword";

function App() {
 return (
  <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element = {<LandingPage />} />
            
            <Route path = "/dashboard" element = {<Dashboard />}/>
            <Route path = "/previewandedit" element = {<PreviewAndEdit />}/>
            <Route path = "/ideainput" element = {<InputIdea />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<LoginGoogle />}></Route>
            <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
        </Routes>
    </BrowserRouter>
  </>
 )
}

export default App;
