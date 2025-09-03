// Server/controllers/scheduleController.js
import Schedule from "../models/Schedule.js";

// Get schedule
export const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findOne();
    if (!schedule) {
      const newSchedule = new Schedule();
      await newSchedule.save();
      return res.json(newSchedule);
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedule", error });
  }
};

// Update schedule
export const updateSchedule = async (req, res) => {
  try {
    const { isOpenToday, holidayDates, workingHours } = req.body;
    let schedule = await Schedule.findOne();

    if (!schedule) {
      schedule = new Schedule({ isOpenToday, holidayDates, workingHours });
    } else {
      if (isOpenToday !== undefined) schedule.isOpenToday = isOpenToday;
      if (holidayDates) schedule.holidayDates = holidayDates;
      if (workingHours) schedule.workingHours = workingHours;
    }

    await schedule.save();
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error updating schedule", error });
  }
};
