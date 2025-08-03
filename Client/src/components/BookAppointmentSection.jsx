import React from 'react';
import { useForm } from 'react-hook-form';
import { CalendarDays, PhoneCall, ChevronDown, ClipboardList, CheckCircle } from 'lucide-react';

const BookAppointmentSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Here, you can handle API or logic
  };

  return (
    <section id= "book"className="py-14 md:py-20 bg-[#f5fafc]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Top heading */}
        <div className="text-center mb-10">
          <button className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm mb-3 hover:bg-blue-200 transition">
            <ClipboardList size={16} /> Schedule Consultation
          </button>
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            Book Your <span className="text-blue-600">Appointment</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Take the first step towards better health. Schedule your consultation with Dr. Shivkumar Patel and receive personalized medical care.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Booking form - visually larger */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:col-span-1 hover:shadow-xl transition duration-300">
            <h3 className="font-semibold text-xl md:text-2xl mb-2">
              Book an <span className="text-blue-600">Appointment</span>
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-5">
              Get the right care at the right time. Fill the form below and we’ll contact you shortly.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Full Name */}
              <div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register('name', { required: true, minLength: 2 })}
                  className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">Name must be at least 2 characters</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  {...register('mobile', { required: true, pattern: /^[0-9]{10}$/ })}
                  className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1">Mobile number must be exactly 10 digits</p>
                )}
              </div>

              {/* Date */}
              <div className="relative">
                <input
                  type="date"
                  min={today}
                  {...register('date', { required: true })}
                  className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                <CalendarDays size={20} className="absolute right-3 top-3 text-gray-400" />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">Please select a valid date</p>
                )}
              </div>

              {/* Reason */}
              <div className="relative">
                <select
                  {...register('reason', { required: true })}
                  className="w-full border rounded-lg px-4 py-3 text-base appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition"
                >
                  <option value="">Select reason for visit</option>
                  <option>Consultation</option>
                  <option>Follow-up</option>
                  <option>New symptoms</option>
                </select>
                <ChevronDown size={20} className="absolute right-3 top-3 text-gray-400" />
                {errors.reason && (
                  <p className="text-red-500 text-xs mt-1">Please select a reason</p>
                )}
              </div>

              {/* Notes */}
              <textarea
                rows="3"
                placeholder="Any specific symptoms or concerns..."
                {...register('notes')}
                className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 font-semibold text-base transition transform hover:scale-105"
              >
                BOOK NOW
              </button>
            </form>
          </div>

          {/* Clinic hours & Why choose */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Clinic Hours */}
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
                <PhoneCall size={18} /> For emergencies, call immediately: <span className="font-semibold">9850318850</span>
              </div>
            </div>

            {/* Why choose */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
              <h3 className="font-semibold text-lg md:text-xl mb-3">Why Choose Dr. Shivkumar Patel?</h3>
              <ul className="space-y-3 text-gray-700">
                {[
                  "Same-day appointments available",
                  "Personalized treatment plans",
                  "Comprehensive health assessments",
                  "Follow-up care included",
                  "Insurance claims assistance",
                  "Patient-centered approach"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="text-blue-600 " size={18} />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointmentSection;
