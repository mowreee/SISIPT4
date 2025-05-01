// Import necessary packages
const express = require("express");   // Web server framework
const mongoose = require("mongoose"); // MongoDB database connection
const bodyParser = require("body-parser"); // Parse incoming request bodies
const cors = require("cors");         // Enable Cross-Origin Resource Sharing

// Import route files - these contain the API endpoints
const studentRoutes = require("./routes/student.routes");
const userRoutes = require("./routes/user.routes");

// Import models - these define the data structure
const Student = require("./models/student.models");

// Create Express application
const app = express();

// Register API routes
app.use("/api/students", studentRoutes); // All student-related endpoints will start with /api/students
app.use("/api/users", userRoutes);       // All user-related endpoints will start with /api/users

// Legacy endpoint - kept for backward compatibility
// This is an older way to add students; new code should use the /api/students endpoint instead
app.post("/addstudentmongo", async (req, res) => {
  try {
    // Extract student information from request body
    const { idNumber, firstName, lastName, middleName, course, year } = req.body;

    // Create new student object
    const newStudent = new Student({
      idNumber,
      firstName,
      lastName,
      middleName,
      course,
      year
    });

    // Save to database
    await newStudent.save();
    
    // Send successful response
    return res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error adding student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`📝 Students API: http://localhost:${port}/api/students`);
  console.log(`👤 Users API: http://localhost:${port}/api/users`);
});
