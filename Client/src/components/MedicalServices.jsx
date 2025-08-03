import React from "react";
import {
  Stethoscope,
  Thermometer,
  HeartPulse,
  Syringe,
  Brain,
  FlaskConical,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <Stethoscope className="w-7 h-7 text-white" />,
    title: "General Check-ups",
    desc: "Routine health consultations and preventive care",
  },
  {
    icon: <Thermometer className="w-7 h-7 text-white" />,
    title: "Fever & Infections",
    desc: "Accurate diagnosis and treatment of common illnesses",
  },
  {
    icon: <HeartPulse className="w-7 h-7 text-white" />,
    title: "Chronic Illness Management",
    desc: "Diabetes, blood pressure, asthma, and ongoing care",
  },
  {
    icon: <Syringe className="w-7 h-7 text-white" />,
    title: "Vaccinations",
    desc: "Adult & pediatric vaccinations for all ages",
  },
  {
    icon: <Brain className="w-7 h-7 text-white" />,
    title: "Stress & Fatigue Care",
    desc: "Holistic well-being and mental health support",
  },
  {
    icon: <FlaskConical className="w-7 h-7 text-white" />,
    title: "Lab Test Referrals",
    desc: "Essential medical investigations and health screenings",
  },
];

const MedicalServices = () => {
  return (
    <section id= "services" className="py-20 px-4 sm:px-8 lg:px-24 bg-white">
      <div className="text-center max-w-4xl mx-auto mb-12">
        {/* Top badge */}
        <span className="inline-block bg-[#e0f7f9] text-[#0086c3] text-sm font-semibold px-4 py-1 rounded-full mb-4">
          <span role="img" aria-label="medical-icon">🧾</span> Medical Services
        </span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Comprehensive <span className="text-teal-500">Healthcare Solutions</span>
        </h2>

        {/* Subheading */}
        <p className="text-gray-600 text-md sm:text-lg">
          From routine check-ups to specialized treatments, Dr. Shivkumar Patel
          provides comprehensive medical care tailored to your individual health
          needs with the latest medical practices and compassionate approach.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 border hover:shadow-2xl group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            {/* Icon circle */}
            <div className="flex items-center justify-center mx-auto w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-600 to-teal-400 mb-4">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3">
              {service.desc}
            </p>

            {/* Animated underline */}
            <div className="w-8 h-[2px] bg-teal-400 mx-auto group-hover:w-12 transition-all duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MedicalServices;
