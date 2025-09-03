// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AdminPanel from "../components/AdminPanel";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 const handleLogout = () => {
  sessionStorage.removeItem("adminToken");
  localStorage.removeItem("token"); // in case older code used it
  navigate("/admin/login", { replace: true });
};


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* 🔹 Navbar */}
      <header className="w-full bg-white shadow-md fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-green-700">
            🏥 Dr. Shiv Clinic Admin
          </h1>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={28} />
          </button>

          {/* Logout button (hidden on small screens, shown on md+) */}
          <button
            onClick={handleLogout}
            className="hidden md:block bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* 🔹 Page Layout */}
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-40 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
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
            <a
              href="#appointments"
              className="text-gray-700 hover:text-green-700 font-medium transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              📅 Appointments
            </a>
            <a
              href="#patients"
              className="text-gray-700 hover:text-green-700 font-medium transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              👥 Patients
            </a>
            <a
              href="#settings"
              className="text-gray-700 hover:text-green-700 font-medium transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              ⚙️ Settings
            </a>

            {/* Logout button for mobile */}
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
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Dashboard Overview
          </h2>

          {/* 📌 Appointments Table */}
          <section id="appointments">
            <AdminPanel />
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
