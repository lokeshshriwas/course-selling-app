import { config } from "dotenv";

config({ path: `.env.config` })

export const { PORT, MONGO_URI, JWT_SECRET, ROUNDS, JWT_ADMIN_SECRET } = process.env;