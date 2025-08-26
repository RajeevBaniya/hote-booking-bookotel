import mongoose from "mongoose";

// Reuse a single connection across serverless invocations
let cached = global.mongooseConnection;
if (!cached) {
  cached = { conn: null, promise: null };
  global.mongooseConnection = cached;
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.connection.on("connected", () =>
      console.log("Connected to MongoDB")
    );

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: "hotel-booking",
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default connectDB;
