import React from 'react';
import { PhoneCall, Calendar } from 'lucide-react';

const MedicalAssistanceCTA = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 my-10">
      <div
        className="
          rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-500 
          text-white text-center p-6 md:p-10 relative overflow-hidden shadow-lg animate-fadeUp
        "
      >
        {/* Heading */}
        <h2 className="text-lg md:text-2xl font-bold flex justify-center items-center gap-2 mb-2">
          <span className="text-2xl">🩺</span> Need Medical Assistance?
        </h2>

        {/* Subtitle */}
        <p className="text-s md:text-lg mb-5">
          Your health is our priority. Get immediate medical attention or schedule a consultation at your convenience.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:9850318850"
            className="
              inline-flex items-center justify-center gap-1 border border-white 
              rounded-full px-4 py-2 text-xs md:text-sm font-semibold
              hover:bg-white hover:text-sky-600 
              transition duration-300 transform hover:scale-105
            "
          >
            <PhoneCall size={16} /> EMERGENCY: 9850318850
          </a>
          <a
            href="#appointment"
            className="
              inline-flex items-center justify-center gap-1 bg-cyan-600 
              hover:bg-cyan-700 text-white rounded-full px-4 py-2 text-xs md:text-sm font-semibold
              transition duration-300 transform hover:scale-105
            "
          >
            <Calendar size={16} /> SCHEDULE APPOINTMENT
          </a>
        </div>
      </div>
    </section>
  );
};

export default MedicalAssistanceCTA;
