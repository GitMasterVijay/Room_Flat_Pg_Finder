import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role)
      return res.status(403).json({ message: "Access denied" });

    next();
  };
};
