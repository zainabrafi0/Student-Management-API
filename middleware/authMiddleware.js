const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // 1. EXTRACT: hands us their badge via the "Authorization" header
    const authHeader = req.headers.authorization;

    // 2. CHECK IF EXISTS: Did they even bring a badge?
    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied: No token provided!" });
    }

    // 3. FORMAT CHECK: Tokens usually look like this: "Bearer eyJhbGciOiJIUzI1..."
    // We need to split that string and grab just the token part (the second item).
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ message: "Invalid token format. Use 'Bearer <token>'" });
    }
    
    const token = authHeader.split(" ")[1];

    try {
        // 4. VERIFY: We check if the badge is real using our secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 5. ATTACH: If it's real, we attach their info to the request so the kitchen knows who is ordering
        req.user = decoded;
        
        // 6. NEXT: Open the door and let them into the route!
        next();
        
    } catch (error) {
        // If the token is fake, expired, or tampered with, the verify() function throws an error.
        return res.status(403).json({ message: "Invalid or expired token!" });
    }
};

module.exports = verifyToken;