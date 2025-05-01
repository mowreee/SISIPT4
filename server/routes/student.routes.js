// Import required packages
const express = require("express");
const router = express.Router();

// Import student model (defines the structure of student data)
const Student = require("../models/student.models");

/**
 * STUDENT API
 * 
 * This file contains all the endpoints (URLs) for managing students:
 * - Create (POST /): Add a new student
 * - Read (GET /): Get all students
 * - Read One (GET /:id): Get a single student by ID
 * - Update (PUT /:id): Update a student's information
 * - Delete (DELETE /:id): Remove a student
 * 
 * These routes together make up what's known as a "CRUD" API
 * (Create, Read, Update, Delete)
 */

// ========== CREATE: Add a new student ==========
router.post("/", async (req, res) => {
  try {
    // Get student data from request body (sent by frontend)
    const { idNumber, firstName, lastName, middleName, course, year } = req.body;
    
    // Check if a student with this ID already exists to avoid duplicates
    const existingStudent = await Student.findOne({ idNumber });
    if (existingStudent) {
      // If found, return an error
      return res.status(400).json({ message: "Student with this ID number already exists" });
    }

    // Create a new student object from the data
    const newStudent = new Student({
      idNumber,
      firstName,
      lastName,
      middleName,
      course,
      year
    });

    // Save the student to the database
    await newStudent.save();
    
    // Return success message
    return res.status(201).json({ 
      message: "Student added successfully", 
      student: newStudent 
    });
  } catch (error) {
    // If anything goes wrong, log the error and return a server error
    console.error("Error adding student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ========== READ: Get all students ==========
router.get("/", async (req, res) => {
  try {
    // Find all students in the database
    const students = await Student.find();
    
    // Return the list of students
    return res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ========== READ ONE: Get a student by ID number ==========
router.get("/:id", async (req, res) => {
  try {
    // Find student with matching ID (from URL parameter)
    const student = await Student.findOne({ idNumber: req.params.id });
    
    // If no student is found, return a 404 error
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    // Return the student data
    return res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ========== UPDATE: Modify a student's information ==========
router.put("/:id", async (req, res) => {
  try {
    // Get the updated information from request body
    const { firstName, lastName, middleName, course, year } = req.body;
    
    // Find and update the student in one operation
    // The { new: true } option returns the updated document
    const updatedStudent = await Student.findOneAndUpdate(
      { idNumber: req.params.id }, // Find by ID number
      { firstName, lastName, middleName, course, year }, // Update these fields
      { new: true } // Return the updated document
    );

    // If no student with that ID was found
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return success message and the updated student
    return res.status(200).json({ 
      message: "Student updated successfully", 
      student: updatedStudent 
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ========== DELETE: Remove a student ==========
router.delete("/:id", async (req, res) => {
  try {
    // Find and delete the student
    const deletedStudent = await Student.findOneAndDelete({ idNumber: req.params.id });
    
    // If no student with that ID was found
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return success message
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Export the router so it can be used in index.js
module.exports = router; 