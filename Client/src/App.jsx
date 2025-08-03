import React from 'react';
import './index.css'; // Ensure this is imported
import Navbar from './components/Navbar'; // Ensure this is imported
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

function App() {
  return (
    <div>

      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
}

export default App;
