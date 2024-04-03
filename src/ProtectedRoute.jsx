/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth/index";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  // global redux store
  const isLoggedIn = localStorage.getItem('token');
  console.log("User:", user)
  if (!isLoggedIn) {
    return <Navigate to="/orglogin" replace />;
  }

  return children;
}
