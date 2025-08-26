import express from "express";
const router = express.Router();

// hardcoded credentials
const ADMIN_USER = "admin";
const ADMIN_PASS = "password123";

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ success: true, message: "Login successful" });
  }
  return res.status(401).json({ success: false, message: "Invalid credentials" });
});

export default router;
