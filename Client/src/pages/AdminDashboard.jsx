// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminPanel from "../components/AdminPanel";
import SettingsPage from "../components/SettingsPage";

const SESSION_DURATION_MINUTES = 15; // match JWT/cookie duration

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("appointments");
  const [sessionTime, setSessionTime] = useState(SESSION_DURATION_MINUTES * 60); // in seconds

  // Live session countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => {
        if (prev <= 1) {
          handleLogout(); // auto logout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <header className="w-full bg-gradient-to-r from-green-50 to-green-100 shadow-md fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">🏥 Dr. Shiv Clinic Admin</h1>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={28} />
          </button>

          {/* Desktop: session countdown + logout */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex flex-col w-32">
              <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${sessionTime <= 60 ? "bg-red-500 animate-pulse" : "bg-green-500"}`}
                  style={{ width: `${(sessionTime / (SESSION_DURATION_MINUTES*60)) * 100}%` }}
                ></div>
              </div>
              <span className={`text-sm font-medium mt-1 ${sessionTime <= 60 ? "text-red-600 animate-pulse" : "text-gray-600"}`}>
                Session: {formatTime(sessionTime)}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Page Layout */}
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-500 ease-in-out z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <div className="flex items-center justify-between p-4 border-b md:hidden">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              className="p-2 text-gray-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col p-6 space-y-4">
            {["appointments", "patients", "settings"].map((section) => {
              const labels = { appointments: "📅 Appointments", patients: "👥 Patients", settings: "⚙️ Settings" };
              return (
                <button
                  key={section}
                  onClick={() => { setActiveSection(section); setIsSidebarOpen(false); }}
                  className={`text-left font-medium transition-all duration-300 rounded-xl px-3 py-1 ${
                    activeSection === section
                      ? "bg-green-100 text-green-800 font-bold"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                  }`}
                >
                  {labels[section]}
                </button>
              );
            })}

            {/* Mobile logout */}
            <button
              onClick={handleLogout}
              className="md:hidden w-full mt-6 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              {activeSection === "appointments" && (
                <>
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Dashboard Overview
                  </h2>
                  <AdminPanel />
                </>
              )}

              {activeSection === "patients" && (
                <h2 className="text-3xl font-bold text-gray-800">Patients Section</h2>
              )}

              {activeSection === "settings" && <SettingsPage />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
