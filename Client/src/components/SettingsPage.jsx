// src/components/SettingsPage.jsx
import React, { useState } from "react";
import ScheduleSettings from "./ScheduleSettings";

const SettingsPage = () => {
    const [activeSetting, setActiveSetting] = useState(null);

    // 🔹 If "Schedule" is selected, show ScheduleSettings
    if (activeSetting === "schedule") {
        return (
            <div>
                <button
                    onClick={() => setActiveSetting(null)}
                    className="mb-4 text-blue-600 hover:underline"
                >
                    ← Back to Settings
                </button>
                <h2 className="text-2xl font-bold mb-4">Schedule</h2>
                <ScheduleSettings />
            </div>
        );
    }

    // 🔹 Default view: list of available settings
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="grid gap-4">
                <button
                    onClick={() => setActiveSetting("schedule")}
                    className="bg-white shadow-md p-4 rounded-lg text-left hover:shadow-lg transition"
                >
                    <h3 className="text-lg font-semibold">📅 Schedule</h3>
                    <p className="text-gray-600 text-sm">
                        Manage clinic open/close status and holidays.
                    </p>
                </button>

                {/* 🔹 Future settings can be added here */}
                <button className="bg-white shadow-md p-4 rounded-lg text-left hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold">🎨 Theme</h3>
                    <p className="text-gray-600 text-sm">Customize the look & feel.</p>
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
