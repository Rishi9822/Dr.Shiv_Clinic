import React from "react";
import { motion } from "framer-motion";
import { Calendar, PhoneCall, Stethoscope } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="bg-[#0086c3] text-white py-16 px-4 md:px-12 lg:px-24 rounded-[30px] mx-4 lg:mx-24 my-10 relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute w-40 h-40 bg-[#027bb3] rounded-full top-0 -right-10 opacity-40 pointer-events-none"></div>
      <div className="absolute w-40 h-40 bg-[#027bb3] rounded-full bottom-0 -left-10 opacity-40 pointer-events-none"></div>

      <motion.div
        className="text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <Stethoscope className="w-10 h-10 text-white" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
          Ready to Take Care of Your Health?
        </h2>

        {/* Subtext */}
        <p className="text-white/90 text-base md:text-lg mb-8">
          Don&apos;t wait for tomorrow. Book your consultation today and take the
          first step towards better health and well-being.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#bookappointment"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 text-white font-semibold border border-white rounded-full transition-all duration-300 hover:bg-white hover:text-[#0086c3] shadow-lg"
          >
            <Calendar className="w-5 h-5" />
            Book Appointment Now
          </motion.a>

          <motion.a
            href="tel:9850318850"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#0086c3] font-semibold rounded-full shadow-lg transition-all duration-300 hover:opacity-90"
          >
            <PhoneCall className="w-5 h-5" />
            Call: 9850318850
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
