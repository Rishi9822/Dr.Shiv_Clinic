import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#1e293b] text-gray-300 pt-10 pb-4">
            <div className="max-w-7xl mx-auto px-4 grid gap-8 md:grid-cols-3">

                {/* Left - About */}
                <div>
                    <h2 className="text-lg md:text-xl font-semibold text-white mb-2">Dr. Shivkumar Patel</h2>
                    <p className="text-sm md:text-base font-semibold mb-1">B.A.M.S., C.C.H.</p>
                    <p className="text-xs md:text-sm mb-3">General & Family Physician</p>
                    <p className="text-xs md:text-sm mb-4">
                        Providing comprehensive, compassionate healthcare to families in Nagpur with over 10 years of medical expertise.
                    </p>

                    <div className="bg-red-600 hover:bg-red-700 text-white rounded-md py-2 px-4 flex items-center space-x-2 transition">
                        <span className="text-xs font-semibold">Emergency Contact</span>
                        <div className="flex items-center space-x-1 font-bold text-sm md:text-base">
                            <Phone size={14} />
                            <span>9850318850</span>
                        </div>
                    </div>
                </div>

                {/* Middle - Quick Contact */}
                <div>
                    <h2 className="text-lg md:text-xl font-semibold text-white mb-3">Quick Contact</h2>
                    <div className="flex items-center space-x-2 mb-2">
                        <Phone size={16} className="text-teal-400" />
                        <div className="text-sm">9850318850</div>
                    </div>
                    <div className="flex items-start space-x-2 mb-2">
                        <MapPin size={16} className="text-teal-400 mt-0.5" />
                        <div className="text-sm">
                            Plot No. 121, Gurudatta Society,<br />
                            Adarsh Nagar, Wadi,<br />
                            Nagpur - 440023
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-teal-400" />
                        <div className="text-sm">
                            Mon - Sat: 9 AM - 8 PM<br />
                            Sunday: Emergency Only
                        </div>
                    </div>
                </div>

                {/* Right - Quick Links */}
                <div>
                    <h2 className="text-lg md:text-xl font-semibold text-white mb-3">Quick Links</h2>
                    <ul className="space-y-1 mb-4">
                        <li><a href="/" className="hover:text-teal-400 transition text-sm">Home</a></li>
                        <li><a href="#about" className="hover:text-teal-400 transition text-sm">About Dr. Shivkumar</a></li>
                        <li><a href="#services" className="hover:text-teal-400 transition text-sm">Services</a></li>
                       
                    </ul>
                    <a
                        href="#book"
                        className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm md:text-base px-4 py-2 rounded-md transition"
                    >
                        Book Appointment
                    </a>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-600 mt-8 pt-3 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm px-4 max-w-7xl mx-auto">
                <p className="mb-1 md:mb-0 md:mx-auto">
                    Designed and Developed with ❤️ by <a href="https://www.google.com">Sellestial Devs Team</a>
                </p>
            </div>

        </footer>
    );
};

export default Footer;
