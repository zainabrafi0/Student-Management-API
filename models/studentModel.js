const mongoose = require("mongoose");

// Define the blueprint for a student
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    course: { type: String, required: true },
    batch: { type: String, required: true }
});

// We DO NOT need to add 'id'. MongoDB automatically generates a unique '_id' for every item!

// Export the model so the controller can use it
module.exports = mongoose.model("Student", studentSchema);