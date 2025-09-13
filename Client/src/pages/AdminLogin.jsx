// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const BACKEND_URL = "http://localhost:5000";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle password
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        navigate(from, { replace: true });
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-green-100 px-4">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 flex flex-col relative"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-extrabold mb-8 text-center text-green-700"
        >
          Clinic Admin Login
        </motion.h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md shadow-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Username Field */}
        <div className="relative mb-6">
          <motion.input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder=" "
            autoComplete="username"
            whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(72,187,120,0.4)" }}
            className="peer w-full p-4 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition bg-white text-gray-900"
          />
          <label
            htmlFor="username"
            className="absolute left-4 top-4 text-gray-400 text-sm transition-all
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
            peer-focus:top-1 peer-focus:text-green-600 peer-focus:text-xs
            pointer-events-none"
          >
            Username
          </label>
        </div>

        {/* Password Field with Eye Icon */}
        <div className="relative mb-8">
          <motion.input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
            autoComplete="current-password"
            whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(72,187,120,0.4)" }}
            className="peer w-full p-4 pr-12 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition bg-white text-gray-900"
          />
          <label
            htmlFor="password"
            className="absolute left-4 top-4 text-gray-400 text-sm transition-all
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
            peer-focus:top-1 peer-focus:text-green-600 peer-focus:text-xs
            pointer-events-none"
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-green-600 transition"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(34,197,94,0.3)" }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </motion.button>

        <p className="mt-6 text-center text-gray-500 text-sm">
          © 2025 Dr. Shiv Clinic
        </p>
      </motion.form>

      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0px 1000px white inset !important;
          -webkit-text-fill-color: #111 !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
