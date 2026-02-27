import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    // If no token, send them back to the landing page login
    return <Navigate to="http://localhost:3000/login" replace />;
  }
  return children;
};

export default ProtectedRoute;