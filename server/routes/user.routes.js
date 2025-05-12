const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post("/", async (req, res) => {
  try {
    const { userID, userFirstName, userMiddleName, userLastName, userEmail, userPassword } = req.body;

    const existingEmail = await User.findOne({ userEmail });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new User({
      userID,
      userFirstName,
      userLastName,
      userMiddleName,
      userEmail,
      userPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { userEmail, userPassword } = req.body;

  try {
    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (user.userPassword !== userPassword) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        userID: user.userID,
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        userMiddleName: user.userMiddleName,
        userEmail: user.userEmail,
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.put("/:userID", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ userID: req.params.userID }, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user" });
  }
});

router.delete("/:userID", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ userID: req.params.userID });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

router.put("/:userID/password", async (req, res) => {
  const { userID } = req.params;
  const { userPassword } = req.body;

  if (!userPassword) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const user = await User.findOne({ userID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.userPassword = userPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Error updating password" });
  }
});


module.exports = router;
