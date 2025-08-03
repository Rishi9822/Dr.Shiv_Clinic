import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, PhoneCall, MapPin, Clock } from "lucide-react";
import CountUp from "react-countup";
import doctorImage from '../assets/doctor.jpg';


const stats = [
  { end: 10, suffix: "+", label: "Years Experience" },
  { end: 500, suffix: "+", label: "Happy Families" },
  { end: 24, suffix: "/7", label: "Emergency Care" },
  { end: 100, suffix: "%", label: "Trusted Care" },
];

const HeroSection = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <section className="relative bg-[#0086AD] text-white min-h-screen flex items-center py-12 px-4 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center w-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-white text-[#0086AD] px-3 py-1 text-sm rounded-full font-semibold inline-block mb-4">
            🩺 Premier Healthcare Services
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Expert Medical <br className="hidden md:block" />
            Care for Every Family
          </h1>
          <p className="text-lg font-semibold mt-4">Dr. Shivkumar Patel</p>
          <p className="text-sm font-medium text-gray-200 mb-3">
            <span className="font-bold">B.A.M.S, C.C.H.</span> • General & Family Physician
          </p>
          <p className="text-sm text-gray-200 mb-5">
            ✨ 10+ Years of Excellence • 500+ Happy Families • 24/7 Emergency Care
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <button className="bg-white text-[#0086AD] font-semibold px-5 py-2 rounded-full flex items-center gap-2 transition duration-300 ease-in-out hover:bg-[#0086AD] hover:text-white hover:shadow-lg hover:scale-105">
              <Calendar size={18} /> BOOK APPOINTMENT
            </button>
            <button className="bg-gray-100 text-[#0086AD] font-semibold px-5 py-2 rounded-full flex items-center gap-2 transition duration-300 ease-in-out hover:bg-[#0086AD] hover:text-white hover:shadow-lg hover:scale-105">
              <PhoneCall size={18} /> Emergency Call
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-[#047799] px-5 py-3 rounded-xl flex items-center gap-3 w-fit transition duration-300 hover:shadow-lg hover:scale-105">
              <Clock size={20} />
              <div>
                <p className="text-sm font-semibold">Mon – Sat</p>
                <p className="text-xs">9:00 AM – 8:00 PM</p>
              </div>
            </div>
            <div className="bg-[#047799] px-5 py-3 rounded-xl flex items-center gap-3 w-fit transition duration-300 hover:shadow-lg hover:scale-105">
              <MapPin size={20} />
              <div>
                <p className="text-sm font-semibold">Adarsh Nagar</p>
                <p className="text-xs">Wadi, Nagpur</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="bg-[#047799] p-4 rounded-2xl text-center w-full max-w-sm transition duration-300 hover:shadow-2xl hover:scale-105">
            <img
              src={doctorImage}
              alt="Dr. Shivkumar Patel"
              className="w-full h-64 object-cover rounded-xl mb-4"
              loading="lazy"
            />
            <span className="bg-white text-[#0086AD] font-semibold px-4 py-1 rounded-full inline-block mb-2">
              Dr. Shivkumar Patel
            </span>
            <p className="text-sm text-gray-200 italic px-4">
              "Committed to delivering exceptional healthcare with compassion and expertise for every patient and family"
            </p>
          </div>

          {/* Stats Grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#047799] text-center py-4 rounded-xl transition duration-300 hover:shadow-lg hover:scale-105"
              >
                <p className="text-xl font-bold">
                  {isInView ? (
                    <CountUp
                      end={stat.end}
                      duration={2}
                      suffix={stat.suffix}
                      delay={0.5 * index}
                    />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </p>
                <p className="text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Emergency Call */}
          <div className="bg-red-600 text-white text-center py-4 rounded-xl w-full max-w-sm transition duration-300 hover:shadow-lg hover:scale-105">
            <p className="text-sm font-semibold flex justify-center items-center gap-2">
              🚨 Emergency Helpline
            </p>
            <p className="text-xl font-bold mt-1">📞 9850318850</p>
            <p className="text-xs mt-1">Available 24/7 for medical emergencies</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
