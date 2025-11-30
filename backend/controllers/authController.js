import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { fullName, phone, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      phone,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

// ME
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("fullName phone email role createdAt");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ME
export const updateMe = async (req, res) => {
  try {
    const { fullName, phone, email } = req.body;

    const update = {};
    if (fullName !== undefined) update.fullName = fullName;
    if (phone !== undefined) update.phone = phone;
    if (email !== undefined) {
      const exists = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (exists) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
      update.email = email;
    }

    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select("fullName phone email role createdAt");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
