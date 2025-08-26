import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import bodyParser from "body-parser";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// Initialize services (Cloudinary does internal caching; safe to call)
connectCloudinary();

const app = express();
app.use(cors()); // enable cross origin resoursce sharing

// api to listen to stripe webhooks
app.post('/api/stripe', express.raw({type: "application/json"}), stripeWebhooks);


// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// Ensure DB is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "Database connection failed" });
  }
});

// API to listen to Clerk Webhooks
app.post("/api/clerk", bodyParser.raw({ type: "*/*" }), clerkWebhooks);

app.get("/", (req, res) => res.send("API is running"));
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

// Export for Vercel serverless
export default app;

// Enable local development with `node server.js`
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
