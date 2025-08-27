import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserData,
  storeRecentSearchedCities,
  becomeHost,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUserData);
userRouter.post("/store-recent-search", protect, storeRecentSearchedCities);
userRouter.post("/become-host", protect, becomeHost);

export default userRouter;
