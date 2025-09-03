// Server/models/Schedule.js
import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  isOpenToday: {
    type: Boolean,
    default: true,
  },
  holidayDates: [
    {
      type: Date,
    },
  ],
  workingHours: {
    monday: { open: String, close: String, closed: { type: Boolean, default: false } },
    tuesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    wednesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    thursday: { open: String, close: String, closed: { type: Boolean, default: false } },
    friday: { open: String, close: String, closed: { type: Boolean, default: false } },
    saturday: { open: String, close: String, closed: { type: Boolean, default: false } },
    sunday: { open: String, close: String, closed: { type: Boolean, default: true } },
  },
}, { timestamps: true });

export default mongoose.model("Schedule", scheduleSchema);
