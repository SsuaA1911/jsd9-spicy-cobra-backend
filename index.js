import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import limiter from "./middleware/rateLimiter.js";
import errorHandler from "./middleware/errorHandler.js";
import router from "./api/v1/routes/routes.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(limiter)
app.use("/",router)

// Centralized error handling
app.use(errorHandler);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo Database✅");
  } catch (error) {
    console.log(`MongoDB connection error ${error}`);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}✅`);
});

//Handle unhandled promise rejections globally
process.on("unhandledRejection", (err) => {
  console.error("💥 Unhandled Rejection:", err.message);
  process.exit(1);
});
