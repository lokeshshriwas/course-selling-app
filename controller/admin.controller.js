import jwt from "jsonwebtoken";
import adminModel from "../models/admin.model.js";
import {
  userInputValidation,
  userLoginInputValidation,
  createCourseValidation,
  updateCourseValidation,
} from "../utils/inputValidation.js";
import { JWT_ADMIN_SECRET, ROUNDS } from "../config/env.js";
import bcrypt from "bcryptjs";
import courseModel from "../models/course.model.js";

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
    const userExists = await adminModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, parseInt(ROUNDS));
    // Create the user
    const newUser = await adminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      country,
      state,
    });

    // Optionally generate JWT token here
    const token = jwt.sign({ userId: newUser._id }, JWT_ADMIN_SECRET, {
      expiresIn: "1d",
    });

    // Send response with token (optional)
    res.status(201).json({ message: "Admin registered successfully", token });
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
    const userExists = await adminModel.findOne({ email });
    if (!userExists) {
      res.status(404).json({ message: "User not found" });
    } else {
      const isMatched = await bcrypt.compare(password, userExists.password);
      if (isMatched) {
        const token = jwt.sign({ userId: userExists._id }, JWT_ADMIN_SECRET, {
          expiresIn: "1d",
        });
        res.status(201).json({ message: "Admin successfully loggedIn", token });
      } else {
        res.send(200).json({ message: "Password Incorrect" });
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

export const createCourse = async (req, res) => {
  const { title, description, price, imageUrl, creatorId } = req.body;
  try {
    createCourseValidation.parse({
      title,
      description,
      price,
      imageUrl,
      creatorId,
    });
    await courseModel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId,
    });

    res.status(202).json({ message: "Course added successfuly" });
  } catch (error) {
    if (error) {
      return res.status(400).json({ message: "Validation failed" });
    }
    // General error handling
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCourse = async (req, res) => {
  const { title, description, price, imageUrl, creatorId, _id } = req.body;

  try {
    updateCourseValidation.parse({
      title,
      description,
      price,
      imageUrl,
      creatorId,
      _id,
    });

    const response = await courseModel.updateOne(
      { creatorId: creatorId, _id: _id },
      { title, description, price, imageUrl }
    );

    if (response.matchedCount != 0) {
      res.status(200).json({ message: "Course successfuly updated" });
    } else {
      res.status(404).json({ message: "Wrong credentials" });
    }
  } catch (error) {
    if (error) {
      return res.status(400).json({ message: "Validation failed" });
    }
    // General error handling
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCourses = async (req, res) => {
  const { creatorId } = req.body;
  try {
    const response = await courseModel.find({ creatorId: creatorId });
    res.status(200).json({ message: "Request successful", data: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
