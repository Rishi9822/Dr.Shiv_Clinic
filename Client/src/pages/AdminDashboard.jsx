// src/pages/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../components/AdminPanel";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
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

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* 🔹 Page Layout */}
      <div className="flex flex-1 pt-20">
        {/* Sidebar (future expandable) */}
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <nav className="flex flex-col p-6 space-y-4">
            <a
              href="#"
              className="text-gray-700 hover:text-green-700 font-medium transition"
            >
              📅 Appointments
            </a>
            <a
              href="#patients"
              className="text-gray-700 hover:text-green-700 font-medium transition"
            >
              👥 Patients
            </a>
            <a
              href="#settings"
              className="text-gray-700 hover:text-green-700 font-medium transition"
            >
              ⚙️ Settings
            </a>
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
