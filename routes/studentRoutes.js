const express = require("express");
const router = express.Router();

// Import controllers and middleware
const studentController = require("../controllers/studentController");
const verifyToken = require("../middleware/authMiddleware");

// PUBLIC ROUTES (No token needed - anyone can read the menu)
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);

// PROTECTED ROUTES (Requires token - only VIPs can change data)
// Notice how we put `verifyToken` right in the middle!
router.post("/", verifyToken, studentController.createStudent);
router.put("/:id", verifyToken, studentController.updateStudent);

// NEW: PATCH Route (Also protected)
router.patch("/:id", verifyToken, studentController.updateStudent); 

router.delete("/:id", verifyToken, studentController.deleteStudent);

module.exports = router;