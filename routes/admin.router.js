import { Router } from "express";
import { createCourse, getAllCourses, signin, signup, updateCourse} from "../controller/admin.controller.js";
import {authenticateAdmin} from "../middleware/auth.middleware.js";

const adminRouter = Router();

adminRouter.post("/signup", signup)
adminRouter.post("/signin", signin)
adminRouter.get('/bulk', authenticateAdmin, getAllCourses);
adminRouter.post('/course',authenticateAdmin, createCourse)
adminRouter.put('/course',authenticateAdmin, updateCourse)

export default adminRouter;