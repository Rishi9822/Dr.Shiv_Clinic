// src/components/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Parse ISO-like strings safely
const parseTs = (d) => {
  if (!d) return 0;
  const t = Date.parse(d);
  return Number.isFinite(t) ? t : 0;
};

// Detect 24-char hex Mongo ObjectId
const isHexObjectId = (s) =>
  typeof s === "string" && s.length === 24 && /^[0-9a-fA-F]+$/.test(s);

// Extract creation time (ms) from Mongo ObjectId
const objectIdToTs = (id) => (isHexObjectId(id) ? parseInt(id.slice(0, 8), 16) * 1000 : 0);

// Get the *submission* timestamp for an appointment
// Priority: submittedAt → createdAt → other common keys → ObjectId time → fallback to date
const getSubmissionTs = (appt) => {
  if (!appt) return 0;
  const candidates = [
    "submittedAt",
    "createdAt",
    "created_on",
    "created_date",
    "createdDate",
    "submissionTime",
  ];
  for (const key of candidates) {
    const ts = parseTs(appt[key]);
    if (ts) return ts;
  }
  const idTs = objectIdToTs(appt._id);
  if (idTs) return idTs;
  // final fallback (not preferred, but prevents crashes)
  return parseTs(appt.date);
};

// Sort by submission time (newest first by default)
const sortBySubmitted = (arr = [], order = "desc") =>
  arr
    .slice()
    .sort((a, b) =>
      order === "asc" ? getSubmissionTs(a) - getSubmissionTs(b) : getSubmissionTs(b) - getSubmissionTs(a)
    );

/* ---------- Component ---------- */
const AdminPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // "desc" => newest first (default), "asc" => oldest first
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    // initial fetch
    fetchAppointments(true);
  }, [sortOrder]);

  // lightweight polling so new submissions pop in without refresh
  useEffect(() => {
    const id = setInterval(() => fetchAppointments(false), 12000);
    return () => clearInterval(id);
  }, [sortOrder]);

  // fetch + sort by submission time
  const fetchAppointments = async (showLoader = false) => {
    if (showLoader) setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/appointments");
      const result = await res.json();

      if (res.ok) {
        const list = Array.isArray(result.appointments)
          ? result.appointments
          : Array.isArray(result)
            ? result
            : [];

        setAppointments(sortBySubmitted(list, sortOrder)); // 🔥 key line (submission time)
      } else {
        console.error("Error fetching appointments:", result?.message || result);
        setAppointments([]);
      }
    } catch (err) {
      console.error("❌ Error fetching appointments:", err);
      setAppointments([]);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  // Update appointment status and keep current order (based on submission time)
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();

      if (res.ok) {
        const updatedFromServer = result.appointment || result.updatedAppointment || null;

        setAppointments((prev) =>
          sortBySubmitted(
            prev.map((appt) =>
              appt._id === id ? (updatedFromServer ? updatedFromServer : { ...appt, status }) : appt
            ),
            sortOrder
          )
        );
      } else {
        console.error("Error updating status:", result?.message || result);
      }
    } catch (err) {
      console.error("❌ Error updating status:", err);
    }
  };

  const handleToggleSort = () => {
    const next = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(next);
    setAppointments((prev) => sortBySubmitted(prev, next));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <svg
          className="animate-spin h-8 w-8 text-green-600"
          xmlns="http://www.w3.org/2000/svg" 
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="ml-2 text-gray-600">Loading appointments...</span>
      </div>
    );
  }


  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-green-700">📅 All Appointments</h2>

        {/* Sort toggle */}
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">Sort:</span>
          <button
            onClick={handleToggleSort}
            className="px-3 py-1 border rounded-lg text-sm font-medium hover:bg-gray-50"
            aria-label="Toggle sort newest or oldest"
            title={sortOrder === "desc" ? "Newest first (Currently)" : "Oldest first (Currently)"}
          >
            {sortOrder === "desc" ? "Newest ↑" : "Oldest ↓"}
          </button>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <img
            src="/empty-appointments.svg"   // put an illustration in /public
            alt="No appointments"
            className="w-40 h-40 mb-4 opacity-80"
          />
          <p className="text-lg font-medium">No appointments yet</p>
          <p className="text-sm text-gray-400">
            New patient bookings will appear here.
          </p>
        </div>
      ) : (

        <div className="overflow-x-auto">
          <table className="w-full border-collapse" aria-label="Appointments">
            <thead>
              <tr className="bg-green-100 text-gray-800">
                <th scope="col" className="p-3 border">Sr No.</th>
                <th scope="col" className="p-3 border">Name</th>
                <th scope="col" className="p-3 border">Email</th>
                <th scope="col" className="p-3 border">Phone</th>
                <th scope="col" className="p-3 border">Date & Time</th>
                <th scope="col" className="p-3 border">Reason</th>
                <th scope="col" className="p-3 border">Notes</th>
                <th scope="col" className="p-3 border">Status</th>
                <th scope="col" className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={appt._id} className="hover:bg-green-50 transition">
                  {/* Serial number based on current sort */}
                  <td className="p-3 border text-center">{index + 1}</td>

                  <td className="p-3 border font-medium">{appt.name}</td>
                  <td className="p-3 border">{appt.email}</td>
                  <td className="p-3 border">{appt.phone}</td>
                  <td className="p-3 border">
                    {appt.date
                      ? `${new Date(appt.date).toLocaleDateString([], { dateStyle: "medium" })} | ${appt.timeSlot || "Not Selected"}`
                      : "—"}
                  </td>

                  <td className="p-3 border">{appt.reason}</td>
                  <td className="p-3 border">{appt.notes || "—"}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${appt.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : appt.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : appt.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="p-3 border space-x-2">
                    <button
                      onClick={() => updateStatus(appt._id, "Confirmed")}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(appt._id, "Cancelled")}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => updateStatus(appt._id, "Completed")}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Complete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
