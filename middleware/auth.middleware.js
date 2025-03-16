import { JWT_SECRET, JWT_ADMIN_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: "Token must be provided" });
    }

    const verified = jwt.verify(token, JWT_SECRET);

    if (verified) {
      req.body.userId = verified.userId;
      next();
    } else {
      return res.status(403).json({ message: "You're not signed in" });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token has expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res
        .status(500)
        .json({ message: "Server error while verifying token" });
    }
  }
};

export const authenticateAdmin = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: "Token must be provided" });
    }

    const verified = jwt.verify(token, JWT_ADMIN_SECRET);

    if (verified) {
      req.body.creatorId = verified.userId;
      next();
    } else {
      return res.status(403).json({ message: "You're not signed in" });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token has expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res
        .status(500)
        .json({ message: "Server error while verifying token" });
    }
  }
};
