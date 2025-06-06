const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  idNumber: {
    type: String,
    required: true,
    unique: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  middleName: String,

  course: {
    type: String,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },
},

  { collection: "students-data" });

module.exports = mongoose.model("student-data", studentSchema);
