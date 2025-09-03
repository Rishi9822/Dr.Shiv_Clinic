import React, { useState, useRef, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clinicStatus, setClinicStatus] = useState(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Fetch clinic status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/schedule");
        const today = new Date().toDateString();
        const isHoliday = res.data.holidayDates.some(
          (d) => new Date(d).toDateString() === today
        );

        if (!res.data.isOpenToday || isHoliday) {
          setClinicStatus("Closed");
        } else {
          setClinicStatus("Open");
        }
      } catch (err) {
        console.error("Error fetching clinic status:", err);
      }
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#f5fafc]/80 backdrop-blur-md shadow-md transition">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left - Logo & Name */}
        <div className="flex flex-col xs:flex-row xs:items-center space-y-0 xs:space-x-2">
          <span className="text-lg md:text-xl font-bold text-blue-600 tracking-wide">
            Dr. Shiv Clinic
          </span>
          <span className="text-xs md:text-sm text-gray-500 font-medium">
            B.A.M.S., C.C.H.
          </span>
        </div>

        {/* Center - Nav links */}
        <nav className="hidden md:flex space-x-6 lg:space-x-10">
          {["Home", "About", "Services", "Book Appointment"].map((item, i) => (
            <a
              key={i}
              href={item === "Home" ? "/" : `#${item.toLowerCase().replace(" ", "")}`}
              className="relative text-gray-800 hover:text-blue-600 font-medium text-sm lg:text-base transition group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right - Call & Status */}
        <div className="flex items-center space-x-3">
          {/* Clinic Status */}
          {clinicStatus && (
            <span
              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-sm transition 
                ${
                  clinicStatus === "Open"
                    ? "bg-green-100 text-green-700 animate-pulse"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {clinicStatus}
            </span>
          )}

          <button
            className="flex items-center space-x-1 sm:space-x-2 
              bg-gradient-to-r from-teal-500 to-blue-500 
              hover:from-teal-600 hover:to-blue-600 
              text-white font-semibold 
              py-1.5 px-3 sm:py-2 sm:px-4 rounded-full shadow-lg 
              transition transform hover:scale-105 hover:shadow-xl text-xs sm:text-sm"
          >
            <Phone className="size-4 sm:size-5" />
            <span>CALL NOW</span>
          </button>

          <button
            ref={toggleRef}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 hover:text-blue-600 transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <nav
          ref={menuRef}
          className="md:hidden flex flex-col items-center space-y-3 px-4 pb-4 animate-slideDown bg-white/95 backdrop-blur-md shadow-md rounded-b-lg"
        >
          {["Home", "About", "Services", "Book Appointment"].map((item, i) => (
            <a
              key={i}
              href={item === "Home" ? "/" : `#${item.toLowerCase().replace(" ", "")}`}
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-blue-600 font-medium text-sm transition"
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
