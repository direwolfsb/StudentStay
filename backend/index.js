import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Function to connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO); // Connect to the MongoDB database
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error; // Throw an error if the connection fails
  }
};

// Event listener for MongoDB disconnection
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(cookieParser()); // Parse cookies from incoming requests

// Route setup
app.use("/api/auth", authRoute); // Authentication routes
app.use("/api/users", usersRoute); // User management routes
app.use("/api/rooms", roomsRoute); // Room management routes
app.use("/api/hotels", hotelsRoute); // Hotel management routes

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack, // Stack trace for debugging purposes
  });
});

// Start the server and connect to the database
app.listen(8800, () => {
  connect(); // Establish MongoDB connection
  console.log("Connected to backend"); // Confirm that the server is running
});

// Simple test route
app.get("/", (req, res) => {
  res.send("Hello, World!"); // Respond with a simple message
});
