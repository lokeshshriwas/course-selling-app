import courseModel from "../models/course.model.js";
import purchaseModel from "../models/purchase.model.js";
import {
  coursePurchaseValidation,
  myPurchasedCoursesValidation,
} from "../utils/inputValidation.js";

export const getAllCourses = async (req, res) => {
  try {
    const response = await courseModel.find({});
    res.status(200).json({
      courses: response,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const coursePurchase = async (req, res) => {
  const { userId, courseId } = req.body;
  console.log(req.body)
  try {
    coursePurchaseValidation.parse({ courseId, userId });
    await purchaseModel.create({ courseId, userId });
    res.status(200).json({ message: "Course successfully purchased" });
  } catch (error) {
    if (error) {
      return res.status(400).json({ message: "Validation failed" });
    }
    // General error handling
    res.status(500).json({ message: "Internal server error" });
  }
};

export const myPurchasedCourses = async (req, res) => {
  const { userId } = req.body;
  try {
    myPurchasedCoursesValidation.parse({ userId });
    const response = await purchaseModel.find({ userId }).populate('courseId')
    res.status(200).json({ myCourses: response });
  } catch (error) {
    if (error) {
      return res.status(400).json({ message: "Validation failed" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
