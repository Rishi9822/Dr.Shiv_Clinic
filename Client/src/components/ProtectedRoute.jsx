// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000"; // ✅ your backend URL

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null = loading, true/false = result

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/check`, {
          credentials: "include", // ✅ send cookies
        });

        if (!res.ok) {
          // Backend returned 401/other → not authorized
          setIsAuth(false);
          return;
        }

        let data;
        try {
          data = await res.json(); // try parsing JSON
        } catch (err) {
          console.error("Failed to parse JSON from /auth/check:", err);
          setIsAuth(false);
          return;
        }

        setIsAuth(data.success === true);
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  // While checking → show loader
  if (isAuth === null) {
    return (
      <div className="text-center p-10 text-gray-700 font-semibold">
        Checking authentication...
      </div>
    );
  }

  // If authenticated → render children, else redirect to login
  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
