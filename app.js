require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); // NEW: Import Mongoose
const app = express();

const studentRoutes = require("./routes/studentRoutes");
const authController = require("./controllers/authController");

app.use(express.json());

// NEW: Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("📦 Connected to MongoDB successfully!"))
    .catch((err) => console.error("Database connection failed:", err));

app.post("/login", authController.login);
app.use("/students", studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running securely on port ${PORT}`);
});