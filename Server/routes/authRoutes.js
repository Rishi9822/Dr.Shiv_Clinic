import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Missing credentials" });
  }

  if (username !== process.env.ADMIN_USER) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASS);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  // Create JWT
  const token = jwt.sign(
  { role: "admin", username },
  process.env.JWT_SECRET,
  { expiresIn: "15m" } // JWT expires in 15 minutes
);


  // Send as HttpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 1h
  });

  return res.json({ success: true, message: "Login successful" });
});

// GET /api/auth/check
router.get("/check", (req, res) => {
  // console.log("Cookies received:", req.cookies); // 👀 debug
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ success: false });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ success: true });
  } catch {
    return res.status(401).json({ success: false });
  }
});


// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
});

export default router;
