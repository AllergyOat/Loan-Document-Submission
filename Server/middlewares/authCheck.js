const jwt = require("jsonwebtoken");
const db = require("../server");

// Middleware for authentication
exports.auth = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        console.log("No token provided");
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    console.log("Received Token:", token);

    if (!token) {
        console.log("Invalid token format");
        return res.status(401).json({ message: "Access denied. Invalid token format." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT Verification Error:", err.message);
        res.status(400).json({ message: "Invalid token" });
    }
};

// Role-based authorization
exports.checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

