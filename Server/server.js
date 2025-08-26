// Server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/setup.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // ✅ Load environment variables from .env

const app = express();

// ✅ Middleware
app.use(express.json()); // Parse JSON bodies

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Allow frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ API Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);

// ✅ Health Check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Backend is running!",
  });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message || err.stack);

  // If response not already set, send generic error
  if (!res.headersSent) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
});

// ✅ Start server only after DB connects
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();
