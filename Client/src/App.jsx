// src/App.jsx
import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from './components/Footer';
import CallToAction from './components/CallToAction';
import AboutSection from './components/AboutSection';
import MedicalServices from './components/MedicalServices';
import MedicalAssistanceCTA from './components/MedicalAssistanceCTA';
import QualityCareSection from './components/QualityCareSection';
import BookAppointmentSection from './components/BookAppointmentSection';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// ✅ Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/admin/login"; // redirect if not logged in
    return null;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Website */}
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <HeroSection />
              <WhyChooseUs />
              <CallToAction />
              <AboutSection />
              <MedicalServices />
              <QualityCareSection />
              <MedicalAssistanceCTA />
              <BookAppointmentSection />
              <Footer />
            </div>
          }
        />

        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
