// Client/src/pages/Reports.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import drlogo from "../assets/drlogo.jpg";


const Reports = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState({ from: "", to: "" });

    // ✅ Fetch appointments from backend
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/appointments");
                setAppointments(res.data.appointments || []);
            } catch (err) {
                console.error("Error fetching reports:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // ✅ Filtered data based on date range
    const filteredAppointments = appointments.filter((a) => {
        if (!dateRange.from || !dateRange.to) return true;
        const apptDate = new Date(a.date);
        return (
            apptDate >= new Date(dateRange.from) &&
            apptDate <= new Date(dateRange.to)
        );
    });

    // ✅ Export to CSV
    const exportToCSV = () => {
        const header = ["Patient Name", "Date", "Time", "Status"];
        const rows = filteredAppointments.map((a) => [
            a.name,
            new Date(a.date).toLocaleDateString(),
            a.timeSlot,
            a.status,
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [header, ...rows].map((row) => row.join(",")).join("\n");

        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.download = "appointments_report.csv";
        link.click();
    };


    // ✅ Export to Excel (Full Patient Details + Styled Header)
    const exportToExcel = async () => {
        const xlsx = await import("xlsx");

        // Prepare data rows (all patient details from DB)
        const rows = filteredAppointments.map((a) => ({
            "Patient Name": a.name,
            "Email": a.email || "-",
            "Phone": a.phone,
            "Date": new Date(a.date).toLocaleDateString(),
            "Time Slot": a.timeSlot,
            "Reason": a.reason,
            "Notes": a.notes || "-",
            "Status": a.status,
            "Created At": new Date(a.createdAt).toLocaleString(),
            "Updated At": new Date(a.updatedAt).toLocaleString(),
        }));

        // Add title row + blank row before actual data
        const title = [["Dr. Shiv Clinic - Appointments Report"]];
        const worksheet = xlsx.utils.json_to_sheet(rows, { origin: "A3" });

        // Insert title at the top
        xlsx.utils.sheet_add_aoa(worksheet, title, { origin: "A1" });

        // Auto column widths
        const colWidths = Object.keys(rows[0] || {}).map((key) => ({
            wch: Math.max(
                key.length,
                ...rows.map((r) => (r[key] ? r[key].toString().length : 0))
            ) + 2,
        }));
        worksheet["!cols"] = colWidths;

        // Freeze the header row (row 3)
        worksheet["!freeze"] = { xSplit: 0, ySplit: 3 };

        // Create workbook & save
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Appointments");

        xlsx.writeFile(workbook, "Appointments_Report.xlsx");
    };



    // ✅ PDF Export (with optional clinic logo + letterhead)
    const exportToPDF = async () => {
        const jsPDF = (await import("jspdf")).default;
        const autoTable = (await import("jspdf-autotable")).default;

        const doc = new jsPDF();

        // Add Logo (imported from assets)
        if (drlogo) {
            doc.addImage(drlogo, "JPEG", 14, 10, 20, 20);
        }

        // Clinic Info
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Dr. Shiv Clinic", 40, 18);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Dr. Shiv Patel (BAMS, MD, CCH)", 40, 26);
        doc.text("Gurudatta Society Wadi, Nagpur", 40, 32);
        doc.text("+91 9876543210    clinic@example.com", 40, 38);

        // Line separator
        doc.setLineWidth(0.5);
        doc.line(14, 42, 200, 42);

        // Report Title
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Patient Appointment Report", 14, 50);

        // Report Date
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text("Report Generated: " + new Date().toLocaleDateString(), 14, 58);

        // Table
        autoTable(doc, {
            startY: 65,
            head: [["Name", "Phone", "Date", "Time", "Reason", "Notes", "Status"]],
            body: filteredAppointments.map((a) => [
                a.name || "N/A",
                a.phone || "N/A",
                new Date(a.date).toLocaleDateString(),
                a.timeSlot || "N/A",
                a.reason || "N/A",
                a.notes || "N/A",
                a.status || "Pending",
            ]),
            styles: {
                fontSize: 9,
                cellWidth: "wrap",
                valign: "middle",
            },
            columnStyles: {
                4: { cellWidth: 40 }, // Reason
                5: { cellWidth: 50 }, // Notes
            },
            headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            didDrawPage: () => {
                const pageCount = doc.internal.getNumberOfPages();
                doc.setFontSize(10);
                doc.text(
                    `Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`,
                    doc.internal.pageSize.width - 40,
                    doc.internal.pageSize.height - 10
                );
            },
        });

        // Save PDF
        doc.save("appointments_report.pdf");
    };




    if (loading) return <p className="p-4">Loading reports...</p>;

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">📊 Reports & Exports</h2>

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        From
                    </label>
                    <input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) =>
                            setDateRange({ ...dateRange, from: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">To</label>
                    <input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) =>
                            setDateRange({ ...dateRange, to: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                    />
                </div>


                {/* Export Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={exportToCSV}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md transition"
                    >
                        ⬇ Export CSV
                    </button>

                    <button
                        onClick={exportToExcel}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md transition"
                    >
                        📗 Export Excel
                    </button>

                    <button
                        onClick={exportToPDF}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md transition"
                    >
                        📄 Export PDF
                    </button>
                </div>



            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-200 px-4 py-2 text-left">
                                Patient Name
                            </th>
                            <th className="border border-gray-200 px-4 py-2">Date</th>
                            <th className="border border-gray-200 px-4 py-2">Time</th>
                            <th className="border border-gray-200 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((a, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="border border-gray-200 px-4 py-2">
                                        {a.name}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">{new Date(a.date).toLocaleDateString()}</td>
                                    <td className="border border-gray-200 px-4 py-2">{a.timeSlot}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        {a.status}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center text-gray-500 py-4 border"
                                >
                                    No records found for this date range.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;
