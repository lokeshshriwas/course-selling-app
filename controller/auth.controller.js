import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import {
  userInputValidation,
  userLoginInputValidation,
} from "../utils/inputValidation.js";
import { JWT_SECRET, ROUNDS } from "../config/env.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, country, state } = req.body;

  try {
    // Input validation using Zod
    userInputValidation.parse({
      email,
      password,
      firstName,
      lastName,
      country,
      state,
    });

    // Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, parseInt(ROUNDS));
    // Create the user
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      country,
      state,
    });

    // Optionally generate JWT token here
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send response with token (optional)
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    if (error) {
      return res.status(400).json({ message: "Validation failed" });
    }
    // General error handling
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    userLoginInputValidation.parse({
      email,
      password,
    });
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      res.status(404).json({ message: "User not found" });
    } else {
      const isMatched = await bcrypt.compare(password, userExists.password);
      if (isMatched) {
        const token = jwt.sign({ userId: userExists._id }, JWT_SECRET, {
            expiresIn: "1d",
          });
        res.status(201).json({ message: "User successfully loggedIn", token });
      } else{
        res.send(200).json({message : "Password Incorrect"})
      }
    }
  } catch (error) {
    if (error) {
      return res.status(400).json({ message: "Validation failed" });
    }
    // General error handling
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = (req, res) => {
  res.send("logout");
};
