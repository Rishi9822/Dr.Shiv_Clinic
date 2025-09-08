// src/components/SettingsPage.jsx
import React, { useState } from "react";
import ScheduleSettings from "./ScheduleSettings";
import Reports from "./Reports";


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
      <ScheduleSettings />
    </div>
  );
}

if (activeSetting === "reports") {
  return (
    <div>
      <button
        onClick={() => setActiveSetting(null)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Settings
      </button>
      <Reports />
    </div>
  );
}


    // 🔹 Default view: list of available settings
    return (
       <div>
  <h2 className="text-2xl font-bold mb-6">Settings</h2>
  <div className="grid gap-4">
    {/* Schedule Settings */}
    <button
      onClick={() => setActiveSetting("schedule")}
      className="bg-white shadow-md p-4 rounded-lg text-left hover:shadow-lg transition"
    >
      <h3 className="text-lg font-semibold">📅 Schedule</h3>
      <p className="text-gray-600 text-sm">
        Manage clinic open/close status and holidays.
      </p>
    </button>

    {/* Theme Settings */}
    <button
      onClick={() => setActiveSetting("theme")}
      className="bg-white shadow-md p-4 rounded-lg text-left hover:shadow-lg transition"
    >
      <h3 className="text-lg font-semibold">🎨 Theme</h3>
      <p className="text-gray-600 text-sm">Customize the look & feel.</p>
    </button>

    {/* Reports & Exports Settings */}
    <button
      onClick={() => setActiveSetting("reports")}
      className="bg-white shadow-md p-4 rounded-lg text-left hover:shadow-lg transition"
    >
      <h3 className="text-lg font-semibold">📊 Reports & Exports</h3>
      <p className="text-gray-600 text-sm">
        View reports and export appointment data.
      </p>
    </button>
  </div>
</div>

    );
};

export default SettingsPage;
