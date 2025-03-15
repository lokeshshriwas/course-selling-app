import express from "express";
import authRouter from "./routes/auth.router.js";
import courseRouter from "./routes/course.router.js";
import adminRouter from "./routes/admin.router.js";
import mongoose from "mongoose";
import { MONGO_URI, PORT } from "./config/env.js";
const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`);
    });
  } catch (error) {
    console.log(`DB not connected: ${error}`);
  }
}

main();
