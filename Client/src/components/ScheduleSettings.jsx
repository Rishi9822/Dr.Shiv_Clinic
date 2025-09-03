// Client/src/pages/ScheduleSettings.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// ✅ Custom replacements (instead of shadcn/ui)
const Card = ({ children, className }) => (
  <div
    className={`bg-white shadow-md p-4 sm:p-6 rounded-lg w-full max-w-4xl mx-auto ${className || ""}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-3 sm:mb-4 border-b pb-2">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{children}</h2>
);

const CardContent = ({ children }) => <div>{children}</div>;

const Switch = ({ checked, onCheckedChange }) => (
  <button
    onClick={onCheckedChange}
    className={`w-12 sm:w-14 h-7 sm:h-8 flex items-center rounded-full p-1 transition ${
      checked ? "bg-green-600" : "bg-gray-300"
    }`}
  >
    <div
      className={`bg-white w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md transform transition ${
        checked ? "translate-x-5 sm:translate-x-6" : ""
      }`}
    />
  </button>
);

const ScheduleSettings = () => {
  const [schedule, setSchedule] = useState(null);

  // ✅ Fetch schedule from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/schedule").then((res) => {
      setSchedule({
        ...res.data,
        holidayDates: res.data.holidayDates || [],
      });
    });
  }, []);

  if (!schedule) return <p className="p-6">Loading...</p>;

  // ✅ Toggle clinic open/close
  const toggleOpenToday = async () => {
    try {
      const updated = { ...schedule, isOpenToday: !schedule.isOpenToday };
      const res = await axios.put("http://localhost:5000/api/schedule", updated);
      setSchedule(res.data);
    } catch (err) {
      console.error("Error toggling clinic status:", err);
    }
  };

  // ✅ Handle holiday dates
  const handleDayClick = async (day, { selected }) => {
    let updatedDates;
    if (selected) {
      updatedDates = schedule.holidayDates.filter(
        (d) => new Date(d).toDateString() !== day.toDateString()
      );
    } else {
      updatedDates = [...schedule.holidayDates, day];
    }

    try {
      const res = await axios.put("http://localhost:5000/api/schedule", {
        ...schedule,
        holidayDates: updatedDates,
      });
      setSchedule(res.data);
    } catch (err) {
      console.error("Error updating holiday dates:", err);
    }
  };

  return (
    <div className="p-3 sm:p-6 space-y-6 sm:space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Clinic Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <span className="text-base sm:text-lg font-medium text-gray-700">
              Clinic Status (Today)
            </span>
            <Switch
              checked={schedule.isOpenToday}
              onCheckedChange={toggleOpenToday}
            />
          </div>
          <p className="text-sm text-gray-500 mb-6 text-center sm:text-left">
            {schedule.isOpenToday
              ? "✅ Clinic is open today"
              : "❌ Clinic is closed today"}
          </p>

          {/* Future Holidays */}
          <div className="space-y-3">
            <span className="block text-base sm:text-lg font-medium text-gray-700">
              Mark Future Holidays
            </span>
            <div className="overflow-x-auto">
              <DayPicker
                mode="multiple"
                selected={(schedule.holidayDates || []).map((d) => new Date(d))}
                onDayClick={handleDayClick}
                className="rounded-md border mx-auto"
              />
            </div>
            <p className="text-sm text-gray-500 break-words">
              Selected Holidays:{" "}
              {schedule.holidayDates && schedule.holidayDates.length > 0
                ? schedule.holidayDates
                    .map((d) => new Date(d).toDateString())
                    .join(", ")
                : "None"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleSettings;
