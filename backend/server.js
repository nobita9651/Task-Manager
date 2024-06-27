// server.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");
const authMiddleware = require("./middleware/auth");

const app = express(); // Initialize express app here

// CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Allow only this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow only these methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Use CORS with the specified options

// Apply middleware to protect routes
app.use("/api/tasks", authMiddleware, taskRoutes);
app.use("/api/users", userRoutes); // Ensure this line is correct

// Connect to the database
mongoose
  .connect("mongodb://localhost:27017/taskmanager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
