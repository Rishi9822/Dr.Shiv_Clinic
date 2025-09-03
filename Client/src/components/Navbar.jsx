import React, { useState, useRef, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);       // Ref for mobile dropdown
    const toggleRef = useRef(null);     // Ref for hamburger button

    useEffect(() => {
        const handleClickOutside = (e) => {
            // if click is outside menuRef AND outside toggleRef
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

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <header className="sticky top-0 z-50 bg-[#f5fafc] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Left - Logo & Name */}
                <div className="flex flex-col xs:flex-row xs:items-center space-y-0 xs:space-x-2">
                    <span className="text-base md:text-lg font-semibold text-blue-600">
                        Dr. Shiv Clinic
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">
                        B.A.M.S., C.C.H.
                    </span>
                </div>

                {/* Center - Navigation (hidden on small) */}
                <nav className="hidden md:flex space-x-4 lg:space-x-9">
                    <a href="/" className="text-gray-800 hover:text-blue-600 font-medium text-sm lg:text-base">Home</a>
                    <a href="#about" className="text-gray-800 hover:text-blue-600 font-medium text-sm lg:text-base">About</a>
                    <a href="#services" className="text-gray-800 hover:text-blue-600 font-medium text-sm lg:text-base">Services</a>
                    <a href="#book" className="text-gray-800 hover:text-blue-600 font-medium text-sm lg:text-base">Book Appointment</a>
                </nav>

                {/* Right - Call Now & Hamburger */}
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
                        ref={toggleRef}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-800 hover:text-blue-600 transition"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {isOpen && (
                <nav
                    ref={menuRef}
                    className="
            md:hidden flex flex-col items-center space-y-2 
            px-4 pb-3 animate-slideDown
          "
                >
                    <a href="/" onClick={() => setIsOpen(false)} className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300">Home</a>
                    <a href="#about" onClick={() => setIsOpen(false)} className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300">About</a>
                    <a href="#services" onClick={() => setIsOpen(false)} className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300">Services</a>
                    <a href="#book" onClick={() => setIsOpen(false)} className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300">Book Appointment</a>
                </nav>
            )}
        </header>
    );
};

export default Navbar;
