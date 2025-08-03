import React from 'react';
import { Phone } from 'lucide-react'; // lightweight icon library

const Navbar = () => {
    return (
        <header className="bg-[#f5fafc] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Left - Logo & Name */}
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-blue-600">Dr. Shivkumar Patel</span>
                    <span className="text-sm text-gray-500">B.A.M.S., C.C.H.</span>
                </div>

                {/* Center - Navigation */}
                <nav className="flex space-x-6">
                    <a href="#home" className="text-gray-800 hover:text-blue-600 font-medium">Home</a>
                    <a href="#about" className="text-gray-800 hover:text-blue-600 font-medium">About</a>
                    <a href="#services" className="text-gray-800 hover:text-blue-600 font-medium">Services</a>
                    <a href="#appointment" className="text-gray-800 hover:text-blue-600 font-medium">Book Appointment</a>
                </nav>

                {/* Right - Call Now Button */}
                <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition">
                    <Phone size={16} />
                    <span>CALL NOW</span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
