// 1. Import our database model
const Student = require("../models/studentModel");

// GET ALL & SEARCH
const getAllStudents = async (req, res) => {
    try {
        const { name, course, batch } = req.query;
        let query = {}; // Start with an empty search filter

        // MongoDB has built-in search tools!
        // $regex allows partial matching (like typing "al" to find "Ali")
        // $options: "i" makes it case-insensitive
        if (name) query.name = { $regex: name, $options: "i" };
        if (course) query.course = course;
        if (batch) query.batch = batch;

        // "Await" tells JS to pause and wait for the database to fetch the data
        const students = await Student.find(query);
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// GET BY ID
const getStudentById = async (req, res) => {
    try {
        // Mongoose has a built in function to find by ID!
        const student = await Student.findById(req.params.id);
        
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ message: "Invalid ID format" });
    }
};

// POST (Create)
const createStudent = async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save(); // Save it permanently to MongoDB!
        
        res.status(201).json({ message: "Student created successfully", student: newStudent });
    } catch (error) {
        res.status(400).json({ message: "Error creating student", error :error.message});
    }
};

// PUT / PATCH (Update)
const updateStudent = async (req, res) => {
    try {
        // findByIdAndUpdate finds the user and applies req.body instantly.
        // { new: true } tells Mongoose to return the UPDATED data, not the old data.
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ message: "Student updated", student: updatedStudent });
    } catch (error) {
        res.status(400).json({ message: "Error updating student", error });
    }
};

// DELETE
const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        
        if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting student", error });
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};