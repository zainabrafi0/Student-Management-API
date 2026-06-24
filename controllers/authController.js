const jwt = require("jsonwebtoken");

const login = (req, res) => {
    // In a real app, you would check a database for a username/password here.
    // For now, we will just give a token to anyone who hits this endpoint.
    
    // 1. Create the payload (the data hidden inside the badge)
    const payload = { role: "admin" };
    
    // 2. Generate the token using our secret key from the .env file!
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    // 3. Hand the token to the customer
    res.status(200).json({ 
        message: "Login successful! Here is your token.",
        token: token 
    });
};

module.exports = { login };