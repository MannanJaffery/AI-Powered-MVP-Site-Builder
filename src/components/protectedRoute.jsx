import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const { currentUser, authLoading } = useAuth();

  if (authLoading) return <div>Loading...</div>;

  if (!currentUser || !currentUser.emailVerified) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;