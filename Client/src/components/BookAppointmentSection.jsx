import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  CalendarDays,
  PhoneCall,
  ChevronDown,
  ClipboardList,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const BookAppointmentSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // 👇 NEW state for schedule
  const [schedule, setSchedule] = useState(null);

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Refs for manual open
  const dateInputRef = useRef(null);
  const timeSlotRef = useRef(null);

  const openDatePicker = () => {
    if (dateInputRef.current?.showPicker) {
      dateInputRef.current.showPicker();
    } else {
      dateInputRef.current?.focus();
    }
  };

  const openTimeSlot = () => {
    if (timeSlotRef.current) {
      timeSlotRef.current.focus();
      const event = new MouseEvent("mousedown", { bubbles: true });
      timeSlotRef.current.dispatchEvent(event);
    }
  };

  const slots = [
    "09:00 AM - 12:00 PM",
    "12:00 PM - 03:00 PM",
    "03:00 PM - 06:00 PM",
    "06:00 PM - 09:00 PM",
  ];


  // Check if a date is unavailable due to holiday or closed day
  const isDateUnavailable = (date) => {
    if (!schedule) return false;
    const chosen = new Date(date).toDateString();

    // Doctor's holiday dates
    const isHoliday = schedule.holidayDates?.some(
      (d) => new Date(d).toDateString() === chosen
    );

    // Doctor closed today
    if (!schedule.isOpenToday && new Date().toDateString() === chosen) {
      return true;
    }

    return isHoliday;
  };


  const getSlotsWithAvailability = (selectedDate) => {
    const now = new Date();
    const selected = new Date(selectedDate);

    return slots.map((slot) => {
      let disabled = false;

      if (selected.toDateString() === now.toDateString()) {
        const currentHour = now.getHours();

        if (slot === "09:00 AM - 12:00 PM" && currentHour >= 12) disabled = true;
        if (slot === "12:00 PM - 03:00 PM" && currentHour >= 15) disabled = true;
        if (slot === "03:00 PM - 06:00 PM" && currentHour >= 18) disabled = true;
        if (slot === "06:00 PM - 09:00 PM" && currentHour >= 21) disabled = true;
      }

      return { slot, disabled };
    });
  };

  // Auto-clear success message after 4s
  useEffect(() => {
    if (status.type === "success") {
      const timer = setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/schedule");
        setSchedule(res.data);
      } catch (err) {
        console.error("Error fetching schedule:", err);
      }
    };
    fetchSchedule();
  }, []);

  const onSubmit = async (data) => {
    if (isDateUnavailable(data.date)) {
  setStatus({
    type: "error",
    message: "❌ Clinic is closed on this date. Please select another day.",
  });
  return;
}

    try {
      setStatus({ type: "", message: "" });
      setLoading(true);

      const formattedData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date,
        timeSlot: data.timeSlot,
        reason: data.reason,
        notes: data.notes || "",
      };

      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      let result = {};
      try {
        result = await res.json();
      } catch (_) { }

      if (res.ok && result?.success) {
        setStatus({
          type: "success",
          message:
            "Appointment booked successfully ✅  We will contact you shortly.",
        });
        reset();
      } else {
        setStatus({
          type: "error",
          message: result?.message || "Failed to book appointment ❌",
        });
      }
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      setStatus({ type: "error", message: "Something went wrong ❌" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="bookappointment" className="py-14 md:py-20 bg-[#f5fafc]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm mb-3 hover:bg-blue-200 transition"
          >
            <ClipboardList size={16} /> Schedule Consultation
          </motion.button>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold mb-3"
          >
            Book Your <span className="text-blue-600">Appointment</span>
          </motion.h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Take the first step towards better health. Schedule your consultation
            with Dr. Shivkumar Patel and receive personalized medical care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2 hover:shadow-xl transition duration-300 "
          >
            <h3 className="font-semibold text-xl md:text-2xl mb-2 text-center">
              Book an <span className="text-blue-600">Appointment</span>
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-5">
              Get the right care at the right time. Fill the form below and we’ll
              contact you shortly.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name", { required: true, minLength: 2 })}
                  aria-invalid={errors.name ? "true" : "false"}
                  className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    Name must be at least 2 characters
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Enter your email (optional)"
                  {...register("email", {
                    validate: (value) =>
                      !value ||
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "Please enter a valid email",
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                  className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  {...register("phone", {
                    required: true,
                    pattern: /^[0-9]{10}$/,
                  })}
                  aria-invalid={errors.phone ? "true" : "false"}
                  className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    Mobile number must be exactly 10 digits
                  </p>
                )}
              </div>

              {/* Date + Time Slot */}
              <div className="flex flex-col md:flex-row md:space-x-4 gap-2">
                {/* Date Picker */}
                <div className="flex-1 relative">
                  <input
                    type="date"
                    min={today}
                    {...register("date", { required: true })}
                    aria-invalid={errors.date ? "true" : "false"}
                    ref={dateInputRef}
                    onChange={(e) => setValue("date", e.target.value)}
                    className="w-full border rounded-lg px-3 py-3 text-base focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                  <CalendarDays
                    size={20}
                    className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                    onClick={openDatePicker}
                  />
                  {/* Show red warning if date is unavailable */}
                  {watch("date") && isDateUnavailable(watch("date")) && (
                    <p className="text-red-500 text-xs mt-1">
                      ❌ Clinic is closed on this date
                    </p>
                  )}
                  {errors.date && !isDateUnavailable(watch("date")) && (
                    <p className="text-red-500 text-xs mt-1">Please select a valid date</p>
                  )}

                </div>

                {/* Time Slot Dropdown */}
                <div className="flex-1 relative">
                  <select
                    {...register("timeSlot", { required: "Please select a time slot" })}
                    defaultValue=""
                    disabled={!watch("date") || isDateUnavailable(watch("date"))}
                    className="w-full border rounded-lg px-4 py-3 text-base appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>
                      {watch("date")
                        ? isDateUnavailable(watch("date"))
                          ? "Clinic closed on this date"
                          : "Select a time slot"
                        : "Pick a date first"}
                    </option>

                    {watch("date") &&
                      getSlotsWithAvailability(watch("date")).map(({ slot, disabled }) => (
                        <option key={slot} value={slot} disabled={disabled}>
                          {slot} {disabled ? "(Unavailable)" : ""}
                        </option>
                      ))}
                  </select>


                  <ChevronDown
                    size={20}
                    className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                  />

                  {errors.timeSlot && (
                    <p className="text-red-500 text-xs mt-1">{errors.timeSlot.message}</p>
                  )}
                </div>

              </div>

              {/* Reason */}
              <div className="relative">
                <select
                  {...register("reason", { required: true })}
                  aria-invalid={errors.reason ? "true" : "false"}
                  className="w-full border rounded-lg px-4 py-3 text-base appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition"
                >
                  <option value="">Select reason for visit</option>
                  <option>Consultation</option>
                  <option>Follow-up</option>
                  <option>New symptoms</option>
                </select>
                <ChevronDown
                  size={20}
                  className="absolute right-3 top-3 text-gray-400"
                />
                {errors.reason && (
                  <p className="text-red-500 text-xs mt-1">
                    Please select a reason
                  </p>
                )}
              </div>

              {/* Notes */}
              <textarea
                rows="3"
                placeholder="Any specific symptoms or concerns..."
                {...register("notes")}
                className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
              ></textarea>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 font-semibold text-base transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Booking..." : "BOOK NOW"}
              </motion.button>
            </form>

            {/* Success/Error Message */}
            <AnimatePresence>
              {status.message && (
                <motion.p
                  key={status.message}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className={`mt-4 text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {status.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info Section (right side) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
              <h3 className="font-semibold text-lg md:text-xl mb-3 flex items-center gap-2">
                <CalendarDays size={20} className="text-blue-600" /> Clinic Hours
              </h3>
              <div className="flex justify-between text-base mb-2">
                <span>Monday - Saturday</span>
                <span className="font-medium text-gray-700">9:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between text-base text-red-500 font-medium mb-3">
                <span>Sunday</span>
                <span>Emergency Only</span>
              </div>
              <div className="bg-red-100 text-red-600 rounded-md text-base px-3 py-2 flex items-center gap-2">
                <PhoneCall size={18} /> For emergencies, call immediately:{" "}
                <span className="font-semibold">9850318850</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
              <h3 className="font-semibold text-lg md:text-xl mb-3">
                Why Choose Dr. Shivkumar Patel?
              </h3>
              <ul className="space-y-3 text-gray-700">
                {[
                  "Same-day appointments available",
                  "Personalized treatment plans",
                  "Comprehensive health assessments",
                  "Follow-up care included",
                  "Patient-centered approach",
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="text-blue-600" size={18} />
                    <span className="text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointmentSection;
