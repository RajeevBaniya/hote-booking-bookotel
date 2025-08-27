import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserData,
  storeRecentSearchedCities,
  setUserIntent,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUserData);
userRouter.post("/intent", protect, setUserIntent);
userRouter.post("/store-recent-search", protect, storeRecentSearchedCities);

export default userRouter;
