import Dashboard from "./pages/dashboard";
import InputIdea from "./pages/inputidea";
import LandingPage from "./pages/landingpage";
import AuthPage from "./pages/authentication/login+signup";
import NotFoundPage from "./pages/notfound";
import PreviewAndEdit from "./pages/preview+edit";

import { BrowserRouter , Routes , Route } from "react-router-dom";

function App() {
 return (
  <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element = {<LandingPage />} />
            <Route path = "/auth" element = {<AuthPage />}/>
            <Route path = "/dashboard" element = {<Dashboard />}/>
            <Route path = "/previewandedit" element = {<PreviewAndEdit />}/>
            <Route path = "/ideainput" element = {<InputIdea />}/>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  </>
 )
}

export default App;
