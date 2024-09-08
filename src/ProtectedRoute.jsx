/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth/index";
import { useContext } from "react";

export function ProtectedRoute({ children }) {
// const { user } = useAuth();
  const { org } = useContext(AuthContext);
  // global redux store
  const isLoggedIn = localStorage.getItem('token');
  console.log("User from protected route file:", org)
  if (!isLoggedIn) {
    return <Navigate to="/orglogin" replace />;
  }

  return children;
}
