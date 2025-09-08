import React, { useRef } from "react";
import { Award, Users, CheckCircle, Shield } from "lucide-react";
import { motion, useInView } from "framer-motion";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const highlights = [
    { icon: <Award size={22} />, text: "10+ years of experience" },
    { icon: <Users size={22} />, text: "Personalized care for all ages" },
    { icon: <CheckCircle size={22} />, text: "Accurate diagnosis & treatment" },
    { icon: <Shield size={22} />, text: "Trusted by hundreds of families" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-start"
    >
      {/* Left Content */}
      <motion.article
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-snug">
          About{" "}
          <span className="text-blue-600">Dr. Shivkumar Patel</span>
        </h2>
        <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
          Dr. Shivkumar Patel is a renowned{" "}
          <span className="font-semibold">General & Family Physician</span>{" "}
          based in Nagpur. Holding degrees in{" "}
          <span className="font-semibold">B.A.M.S.</span> and{" "}
          <span className="font-semibold">C.C.H.</span>, he has dedicated his
          career to providing trusted, compassionate, and personalized
          healthcare.
        </p>
        <p className="text-gray-700 mb-8 text-sm md:text-base leading-relaxed">
          From everyday illnesses to chronic conditions, Dr. Patel ensures
          every patient receives timely attention and effective treatment. His
          holistic approach blends traditional wisdom with modern medical
          practices.
        </p>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-blue-500/90 text-white rounded-lg p-4 flex items-center gap-3 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {item.icon}
              <span className="text-sm md:text-base font-medium">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.article>

      {/* Right Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="space-y-8"
      >
        {/* Qualifications */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white shadow-xl rounded-2xl p-6"
        >
          <h3 className="font-bold text-lg text-center mb-5">
            Professional Qualifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center bg-blue-100 rounded-md p-3 hover:bg-blue-200 transition">
              <Award className="text-blue-600 mr-2" size={20} />
              <div>
                <p className="font-semibold text-sm">B.A.M.S.</p>
                <p className="text-xs text-gray-600">
                  Bachelor of Ayurvedic Medicine & Surgery
                </p>
              </div>
            </div>
            <div className="flex items-center bg-red-100 rounded-md p-3 hover:bg-red-200 transition">
              <Award className="text-red-600 mr-2" size={20} />
              <div>
                <p className="font-semibold text-sm">C.C.H.</p>
                <p className="text-xs text-gray-600">
                  Certificate Course in Child Health
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h4 className="font-bold text-lg mb-2 text-gray-800">
            Our Mission
          </h4>
          <p className="text-gray-700 italic text-sm md:text-lg leading-relaxed">
            "To provide accessible, compassionate, and comprehensive healthcare
            to every family, ensuring quality medical care is never beyond
            reach."
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
