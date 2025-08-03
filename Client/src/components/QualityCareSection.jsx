import React from 'react';

const steps = [
    {
        id: 1,
        title: 'Consultation',
        description: 'Detailed discussion about your health concerns',
        color: 'bg-sky-600',
    },
    {
        id: 2,
        title: 'Diagnosis',
        description: 'Thorough examination and accurate diagnosis',
        color: 'bg-cyan-500',
    },
    {
        id: 3,
        title: 'Treatment',
        description: 'Personalized treatment plan implementation',
        color: 'bg-red-500',
    },
    {
        id: 4,
        title: 'Follow-up',
        description: 'Continuous monitoring and care adjustment',
        color: 'bg-sky-600',
    },
];

const QualityCareSection = () => {
    return (
        <section className="bg-[#F5FDFF] py-10 px-4 md:px-12 lg:px-24 text-center">
            <div className="max-w-6xl mx-auto px-4 text-center animate-fadeUp">

                {/* Heading */}
                <h2 className="text-2xl md:text-5xl font-bold mb-2">
                    How We Ensure <span className="text-cyan-600">Quality Care</span>
                </h2>
                <p className="text-gray-600 text-xl md:text-xl mb-8">
                    Our systematic approach ensures every patient receives the best possible care
                </p>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {steps.map(step => (
                        <div
                            key={step.id}
                            className="flex flex-col items-center text-center bg-white rounded-lg p-4 shadow-sm 
                transform hover:scale-105 hover:shadow-md transition duration-300 ease-in-out"
                        >
                            <div className={`w-12 h-12 md:w-14 md:h-14 ${step.color} text-white rounded-full flex items-center justify-center text-sm font-semibold mb-3`}>
                                {step.id}
                            </div>
                            <h3 className="font-semibold text-xl md:text-xl mb-1">{step.title}</h3>
                            <p className="text-sm md:text-sm text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QualityCareSection;
