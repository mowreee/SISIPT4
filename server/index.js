const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/school")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const studentSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: false },
  course: { type: String, required: true },
  year: { type: String, required: true }
});

const Student = mongoose.model("Student", studentSchema);

app.post("/addstudentmongo", async (req, res) => {
  try {
    const { idNumber, firstName, lastName, middleName, course, year } = req.body;

    const newStudent = new Student({
      idNumber,
      firstName,
      lastName,
      middleName,
      course,
      year
    });

    await newStudent.save();
    return res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
