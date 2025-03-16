import { Router } from "express";
import { getAllCourses, coursePurchase, myPurchasedCourses } from "../controller/course.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const courseRouter = Router();

courseRouter.get("/allcourses", getAllCourses)
courseRouter.get("/mycourses", authenticateUser, myPurchasedCourses)
courseRouter.post("/purchase", authenticateUser, coursePurchase)

export default courseRouter;