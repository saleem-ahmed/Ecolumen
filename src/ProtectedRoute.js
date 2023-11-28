// ProtectedRoute.js
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Auth/index";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/orglogin" />;
  }

  return <Navigate to={<Outlet />} />;
};

export default ProtectedRoute;
