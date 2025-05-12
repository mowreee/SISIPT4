const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const userRoutes = require("./routes/user.routes");
const studentRoutes = require("./routes/student.routes");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/SIS", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
