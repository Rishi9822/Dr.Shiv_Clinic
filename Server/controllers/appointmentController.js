// Server/controllers/appointmentController.js
import Appointment from "../models/Appointment.js";

// Small helpers
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());

const isValidPhone = (phone) =>
  /^\d{10}$/.test(String(phone || "").trim());

export const createAppointment = async (req, res) => {
  try {
    console.log("📥 Incoming request body:", req.body);

    let { name, email, phone, date, timeSlot, reason, notes } = req.body || {};

    // Normalize/trim
    name = (name || "").trim();
    email = (email || "").trim().toLowerCase();
    phone = (phone || "").trim();
    reason = (reason || "").trim();
    notes = (notes || "").trim();

    // Validate required fields
    if (!name || !phone || !date || !timeSlot || !reason) {
      return res.status(400).json({
        success: false,
        message:
          "All required fields (name, phone, date, reason) must be provided",
      });
    }

    // Field-specific validation
    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone must be exactly 10 digits",
      });
    }

    // Convert date safely
    // Frontend sends "YYYY-MM-DD"; convert here to Date.
    const dateObj = new Date(date);
    if (Number.isNaN(dateObj.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD.",
      });
    }

    const appointment = new Appointment({
      name,
      email,
      phone,
      date: dateObj,      // store as Date
      timeSlot,
      reason,
      notes,
    });

    await appointment.save();

    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    console.error("❌ Error creating appointment:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    return res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Confirmed", "Cancelled", "Completed"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.json({ success: true, message: "Status updated", appointment });
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};