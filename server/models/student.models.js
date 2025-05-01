// Import mongoose - the library we use to interact with MongoDB
const mongoose = require("mongoose");

/**
 * Student Schema
 * 
 * This defines the structure of student data in our database.
 * Think of this as the blueprint for what information we store about each student.
 * 
 * Each field has:
 * - type: What kind of data (String, Number, Date, etc.)
 * - required: Whether the field must be provided (true/false)
 * - unique: Whether the value must be unique across all students
 */
const studentSchema = new mongoose.Schema({
  // ID Number - unique identifier for each student (like a school ID)
  idNumber: {
    type: String,
    required: true,  // Must be provided when creating a student
    unique: true,    // No two students can have the same ID
  },
  
  // Student's first name
  firstName: {
    type: String,
    required: true,
  },
  
  // Student's last name
  lastName: {
    type: String,
    required: true,
  },
  
  // Student's middle name (optional - no required property)
  middleName: String,
  
  // Student's course or program (e.g., "Computer Science")
  course: {
    type: String,
    required: true,
  },
  
  // Year level (e.g., "1st Year", "2nd Year")
  year: {
    type: String,
    required: true,
  },
}, 
// This tells MongoDB to store our data in a collection called "students-data"
{ collection: "students-data" });

// Create and export the model so we can use it in other files
// The first parameter "student-data" is the model name used internally by Mongoose
module.exports = mongoose.model("student-data", studentSchema);
