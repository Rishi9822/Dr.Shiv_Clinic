import React from 'react';
import './index.css'; // Ensure this is imported
import Navbar from './components/Navbar'; // Ensure this is imported
import HeroSection from './components/HeroSection';
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from './components/Footer';

function App() {
  return (
    <div>

      <Navbar />
      <HeroSection />
      <WhyChooseUs/>
      <Footer />

    </div>
  );
}

export default App;
