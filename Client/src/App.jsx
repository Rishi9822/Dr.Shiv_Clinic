import React from 'react';
import './index.css'; // Ensure this is imported
import Navbar from './components/Navbar'; // Ensure this is imported
import HeroSection from './components/HeroSection';
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from './components/Footer';
import CallToAction from './components/CallToAction';
import AboutSection from './components/AboutSection';
import MedicalAssistanceCTA from './components/MedicalAssistanceCTA';
import QualityCareSection from './components/QualityCareSection';

function App() {
  return (
    <div>

      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <CallToAction />
      <AboutSection />
<QualityCareSection />
      <MedicalAssistanceCTA />



      <Footer />

    </div>
  );
}

export default App;
