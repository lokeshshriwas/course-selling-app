import { Router } from "express";

const courseRouter = Router();

courseRouter.get("/allcourses", function(){})
courseRouter.get("/mycourses", function(){})
courseRouter.post("/purchase", function(){})

export default courseRouter;