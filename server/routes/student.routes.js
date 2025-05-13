const express = require("express");
const router = express.Router();
const Student = require("../models/student.models");

router.post("/", async (req, res) => {
  try {
    const { idNumber, firstName, lastName, middleName, course, year } = req.body;

    const existingStudent = await Student.findOne({ idNumber });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this ID number already exists" });
    }    

    const newStudent = new Student({ idNumber, firstName, lastName, middleName, course, year });
    await newStudent.save();

    return res.status(201).json({
      message: "Student added successfully",
      student: newStudent
    });
  } catch (error) {
    console.error("Error adding student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ idNumber: req.params.id });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { firstName, lastName, middleName, course, year } = req.body;
    const updatedStudent = await Student.findOneAndUpdate(
      { idNumber: req.params.id },
      { firstName, lastName, middleName, course, year },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ idNumber: req.params.id });
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
