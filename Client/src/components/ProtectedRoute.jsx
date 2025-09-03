// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Only accept the admin token stored in sessionStorage under a dedicated key.
  const token = sessionStorage.getItem("adminToken");

  if (!token) {
    // Not logged in — redirect to login and save where they wanted to go
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  // Logged in — show children
  return children;
};

export default ProtectedRoute;
