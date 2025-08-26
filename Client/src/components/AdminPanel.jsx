import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/appointments");
      const result = await res.json();
      if (res.ok) {
        setAppointments(result.appointments);
      } else {
        console.error("Error fetching:", result.message);
      }
    } catch (err) {
      console.error("❌ Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update appointment status
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((appt) => (appt._id === id ? { ...appt, status } : appt))
        );
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error("❌ Error updating status:", err);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-green-700">📅 All Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-100 text-gray-800">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Reason</th>
                <th className="p-3 border">Notes</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-green-50 transition">
                  <td className="p-3 border font-medium">{appt.name}</td>
                  <td className="p-3 border">{appt.email}</td>
                  <td className="p-3 border">{appt.phone}</td>
                  <td className="p-3 border">
                    {new Date(appt.date).toLocaleDateString()}{" "}
                    {new Date(appt.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="p-3 border">{appt.reason}</td>
                  <td className="p-3 border">{appt.notes || "—"}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        appt.status === "Pending"
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
