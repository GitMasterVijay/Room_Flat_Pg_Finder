import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const secret = process.env.JWT_SECRET || "dev_secret";
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // user info (id + role)

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const ownerOnly = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "owner") {
      return res.status(403).json({ message: "Owner access required" });
    }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Owner access required" });
  }
};
