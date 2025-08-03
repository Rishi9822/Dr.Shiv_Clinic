import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-[#f5fafc] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                <div className="flex flex-col xs:flex-row xs:items-center space-y-0 xs:space-x-2">
                    <span className="text-base md:text-lg font-semibold text-blue-600">
                        Dr. Shivkumar Patel
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">B.A.M.S., C.C.H.</span>
                </div>

                <nav className="hidden md:flex space-x-4 lg:space-x-6">
                    <a href="#home" className="text-gray-800 hover:text-blue-600 font-medium text-sm lg:text-base">
                        Home
                    </a>
                    <a href="#about" className="text-gray-800 hover:text-blue-600 font-medium text-sm lg:text-base">
                        About
                    </a>
                    <a href="#services" className="text-gray-800 hover:text-blue-600 font-medium text-sm lg:text-base">
                        Services
                    </a>
                    <a href="#appointment" className="text-gray-800 hover:text-blue-600 font-medium text-sm lg:text-base">
                        Book Appointment
                    </a>
                </nav>

                <div className="flex items-center space-x-3">
                    <button
                        className="
              flex items-center space-x-1 md:space-x-2 
              bg-teal-500 hover:bg-teal-600 text-white font-semibold 
              py-1.5 px-3 md:py-2 md:px-4 
              rounded-full shadow-md 
              transition transform hover:scale-105
              text-xs md:text-sm
            "
                    >
                        <Phone className="md:size-5" />
                        <span>CALL NOW</span>
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-800 hover:text-blue-600 transition"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <nav
                    className="
            md:hidden flex flex-col items-center space-y-2 
            px-4 pb-3 
            animate-slideDown
          "
                >
                    <a href="#home" className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300">
                        Home
                    </a>
                    <a href="#about" className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300">
                        About
                    </a>
                    <a href="#services" className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300">
                        Services
                    </a>
                    <a href="#appointment" className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300">
                        Book Appointment
                    </a>
                </nav>
            )}
        </header>
    );
};

export default Navbar;
