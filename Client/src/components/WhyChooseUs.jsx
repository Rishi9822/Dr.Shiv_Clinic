import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock4, Users, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={32} className="text-white" />,
    title: "Trusted Healthcare",
    description:
      "Reliable medical services with proven track record",
    bgColor: "bg-[#0086AD]",
  },
  {
    icon: <Clock4 size={32} className="text-white" />,
    title: "Flexible Timings",
    description:
      "Extended hours from 9 AM to 8 PM, Monday to Saturday",
    bgColor: "bg-[#00B2B2]",
  },
  {
    icon: <Users size={32} className="text-white" />,
    title: "Family Care",
    description:
      "Comprehensive healthcare solutions for all age groups",
    bgColor: "bg-[#EF4444]",
  },
  {
    icon: <BadgeCheck size={32} className="text-white" />,
    title: "Certified Expertise",
    description:
      "B.A.M.S. and C.C.H. qualified with 10+ years experience",
    bgColor: "bg-[#0086AD]",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#F5FDFF] py-10 px-4 md:px-12 lg:px-24 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Section Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-[#DFF5FD] text-[#0086AD] px-4 py-1 text-sm rounded-full font-semibold inline-block mb-4">
            Why Choose Us
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Excellence in <span className="text-[#0086AD]">Medical Care</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-gray-600 text-base md:text-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Dr. Shivkumar Patel brings years of expertise and a compassionate
          approach to healthcare, ensuring every patient receives personalized
          attention and quality treatment.
        </motion.p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <div
              className={`w-16 h-16 mx-auto mb-5 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${feature.bgColor}`}
            >
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#0086AD] transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
