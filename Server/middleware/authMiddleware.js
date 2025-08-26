import { ADMIN } from "../config/adminConfig.js";

export const verifyHardcodedAuth = (req, res, next) => {
  const { username, password } = req.headers;

  if (username === ADMIN.username && password === ADMIN.password) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
