// Import required packages
const express = require("express");
const router = express.Router();

// Import user model (defines the structure of user data)
const User = require("../models/user.model");

/**
 * USER API
 * 
 * This file contains all the endpoints (URLs) for managing users:
 * - Create (POST /): Add a new user
 * - Read (GET /): Get all users
 * - Read One (GET /:id): Get a single user by ID
 * - Update (PUT /:id): Update a user's information
 * - Update Password (PUT /:id/password): Change a user's password
 * - Delete (DELETE /:id): Remove a user
 * 
 * These routes together make up what's known as a "CRUD" API
 * (Create, Read, Update, Delete) with an additional password update feature
 */

// ========== CREATE: Add a new user ==========
router.post("/", async (req, res) => {
  try {
    // Get user data from request body (sent by frontend)
    const { userID, userFirstName, userLastName, userMiddleName, userEmail, userPassword } = req.body;
    
    // Check if a user with this ID already exists to avoid duplicates
    const existingUser = await User.findOne({ userID });
    if (existingUser) {
      return res.status(400).json({ message: "User with this ID already exists" });
    }

    // Check if email is already registered by another user
    const existingEmail = await User.findOne({ userEmail });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create a new user object with the data
    const newUser = new User({
      userID,
      userFirstName,
      userLastName,
      userMiddleName,
      userEmail,
      userPassword // Note: In a real application, you should hash this password for security
    });

    // Save the user to the database
    await newUser.save();
    
    // Return success message
    return res.status(201).json({ 
      message: "User created successfully", 
      user: newUser 
    });
  } catch (error) {
    // If anything goes wrong, log the error and return a server error
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ========== READ: Get all users ==========
router.get("/", async (req, res) => {
  try {
    // Find all users in the database, but don't include passwords in the response
    const users = await User.find().select("-userPassword"); 
    
    // Return the list of users
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ========== READ ONE: Get a user by ID ==========
router.get("/:id", async (req, res) => {
  try {
    // Find user with matching ID (from URL parameter), but don't include password
    const user = await User.findOne({ userID: req.params.id }).select("-userPassword");
    
    // If no user is found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Return the user data
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ========== UPDATE: Modify a user's information ==========
router.put("/:id", async (req, res) => {
  try {
    // Get updated information from request body
    const { userFirstName, userLastName, userMiddleName, userEmail } = req.body;
    
    // If email is being updated, check if the new email already exists for another user
    if (userEmail) {
      // Find if email exists but belongs to a different user (not the one we're updating)
      const existingEmail = await User.findOne({ 
        userEmail, 
        userID: { $ne: req.params.id } // $ne means "not equal"
      });
      
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use by another user" });
      }
    }
    
    // Find and update the user
    // The { new: true } option returns the updated document
    const updatedUser = await User.findOneAndUpdate(
      { userID: req.params.id }, // Find by ID
      { userFirstName, userLastName, userMiddleName, userEmail }, // Update these fields
      { new: true } // Return the updated document
    ).select("-userPassword"); // Don't include password in response

    // If no user with that ID was found
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success message and updated user
    return res.status(200).json({ 
      message: "User updated successfully", 
      user: updatedUser 
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ========== UPDATE PASSWORD: Change a user's password ==========
router.put("/:id/password", async (req, res) => {
  try {
    // Get the new password from request body
    const { userPassword } = req.body;
    
    // Validate that password was provided
    if (!userPassword) {
      return res.status(400).json({ message: "Password is required" });
    }
    
    // Find and update only the password field
    const updatedUser = await User.findOneAndUpdate(
      { userID: req.params.id },
      { userPassword }, // In a real app, you'd hash this password
      { new: true }
    ).select("-userPassword"); // Don't include password in response

    // If no user with that ID was found
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success message
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ========== DELETE: Remove a user ==========
router.delete("/:id", async (req, res) => {
  try {
    // Find and delete the user
    const deletedUser = await User.findOneAndDelete({ userID: req.params.id });
    
    // If no user with that ID was found
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success message
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Export the router so it can be used in index.js
module.exports = router; 