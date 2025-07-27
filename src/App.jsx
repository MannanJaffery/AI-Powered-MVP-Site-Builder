import Dashboard from "./pages/dashboard";
import InputIdea from "./pages/inputidea";
import LandingPage from "./pages/landingpage";


import NotFoundPage from "./pages/notfound";
import PreviewAndEdit from "./pages/preview+edit";
import Register from "./pages/authentication/register";
import Login from "./pages/authentication/login";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/protectedRoute";



function App() {
 return (
  <>
  <AuthProvider>
    <BrowserRouter>
        <Routes>
            <Route path="/" element = {<LandingPage />} />
            
            <Route path = "/dashboard" element = {<Dashboard />}/>
            <Route path = "/previewandedit" element = {<PreviewAndEdit />}/>
            <Route path = "/ideainput" element = {<InputIdea />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>

            <Route path="/input-idea" element={
              <ProtectedRoute>
              <InputIdea/>
              </ProtectedRoute>
              }/>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
    </AuthProvider>
  </>
 )
}

export default App;
