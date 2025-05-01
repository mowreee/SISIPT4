// Import mongoose - the library we use to interact with MongoDB
const mongoose = require("mongoose");

/**
 * User Schema
 * 
 * This defines the structure of user data in our database.
 * Think of this as the blueprint for what information we store about each user.
 * 
 * Each field has:
 * - type: What kind of data (String, Number, Date, etc.)
 * - required: Whether the field must be provided (true/false)
 * - unique: Whether the value must be unique across all users
 */
const userSchema = new mongoose.Schema({
  // User ID - unique identifier for each user (like a username or employee ID)
  userID: {
    type: String,
    required: true,  // Must be provided when creating a user
    unique: true,    // No two users can have the same ID
  },
  
  // User's first name
  userFirstName: {
    type: String,
    required: true,
  },
  
  // User's last name
  userLastName: {
    type: String,
    required: true,
  },
  
  // User's middle name
  userMiddleName: {
    type: String,
    required: true,
  },
  
  // User's email address
  userEmail: {
    type: String,
    required: true,
    // Note: In a real app, you might want to add 'unique: true' here
    // and add validation to ensure it's a valid email format
  },
  
  // User's password
  userPassword: {
    type: String,
    required: true,
    // Note: In a real app, you should NEVER store plain text passwords!
    // Passwords should be hashed using a library like bcrypt
  },
}, 
// This tells MongoDB to store our data in a collection called "user-data"
{ collection: "user-data" });

// Create and export the model so we can use it in other files
// The first parameter "user-data" is the model name used internally by Mongoose
module.exports = mongoose.model("user-data", userSchema);