// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // No token? Go to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
