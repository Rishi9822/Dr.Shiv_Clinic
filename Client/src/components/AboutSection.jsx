import React from 'react';
import { Award, Users, CheckCircle, Shield } from 'lucide-react';

const AboutSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-start">

            {/* Left: About Text & Highlights */}
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    About <span className="text-blue-600">Dr. Shivkumar Patel</span>
                </h2>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                    Dr. Shivkumar Patel is a well-known <span className="font-semibold">General & Family Physician</span> based in Nagpur.
                    Holding degrees in <span className="font-semibold">B.A.M.S.</span> and <span className="font-semibold">C.C.H.</span>, he has dedicated his career to providing trusted, compassionate, and personalized medical care.
                </p>
                <p className="text-gray-700 mb-6 text-sm md:text-base">
                    From everyday illnesses to chronic conditions, Dr. Shivkumar ensures each patient receives timely attention and effective treatment.
                    His holistic approach combines traditional medical wisdom with modern healthcare practices.
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { icon: <Award size={20} />, text: '10+ years of experience' },
                        { icon: <Users size={20} />, text: 'Personalized care for all ages' },
                        { icon: <CheckCircle size={20} />, text: 'Accurate diagnosis & treatment' },
                        { icon: <Shield size={20} />, text: 'Trusted by hundreds of families' },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-blue-500/90 text-white rounded-md p-4 flex items-center space-x-3 shadow-md transform hover:scale-105 transition duration-300 ease-in-out animate-fadeUp"
                        >
                            {item.icon}
                            <span className="text-xs md:text-sm font-medium">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Professional Qualifications & Mission */}
            <div className="space-y-6">
                {/* Qualifications box */}
                <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 animate-fadeUp">
                    <h3 className="font-semibold text-center mb-4">Professional Qualifications</h3>
                    <div className="space-y-2">
                        <div className="flex items-center bg-blue-100 rounded-md p-3 hover:bg-blue-200 transition">
                            <Award className="text-blue-600 mr-2" size={18} />
                            <div>
                                <p className="font-semibold text-sm">B.A.M.S.</p>
                                <p className="text-xs">Bachelor of Ayurvedic Medicine & Surgery</p>
                            </div>
                        </div>
                        <div className="flex items-center bg-red-100 rounded-md p-3 hover:bg-red-200 transition">
                            <Award className="text-red-600 mr-2" size={18} />
                            <div>
                                <p className="font-semibold text-sm">C.C.H.</p>
                                <p className="text-xs">Certificate Course in Homeopathy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission */}
                <div>
                    <h4 className="font-semibold mb-1">Our Mission</h4>
                    <p className="text-gray-700 text-xs md:text-xl">
                        "To provide accessible, compassionate, and comprehensive healthcare to every family, ensuring that quality medical care is never beyond reach."
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
