const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../server");
require("dotenv").config();

const router = express.Router();

// Register
router.post("/register", (req, res) => {
    const { name, birthday, tel, faculty, major, email, password } = req.body;

    db.query("SELECT * FROM user WHERE email = ?", [email], async (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database query error" }); }

        if (result.length > 0) return res.status(400).json({ message: "User already exists" });
        
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            db.query(
                "INSERT INTO user (name, birthday, tel, faculty, major, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [name, birthday, tel, faculty, major, email, hashedPassword, "student"],
                (insertErr, insertResult) => {
                    if (insertErr) {
                        console.error("Insert error:", insertErr);
                        return res.status(500).json({ message: "Database insert error" });
                    }
                    res.status(201).json({ message: "User registered successfully" });
                }
            );
        } catch (hashError) {
            console.error("Hashing error:", hashError);
            res.status(500).json({ message: "Password hashing failed" });
        }
    });
});


// Login 
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM user WHERE email = ?", [email], async (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Database query failed" }); }

        if (!result || result.length === 0) return res.status(400).json({ message: "Invalid Email" });
        
        const user = result[0];
        try {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid Password" }); 

            // Generate JWT Token (DO NOT store in the database)
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.json({ token });

        } catch (error) {
            console.error("Password Comparison Error:", error);
            return res.status(500).json({ message: "Login failed" });
        }
    });
});




// Middleware for authentication
const auth = (req, res, next) => {
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
const checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

router.get("/admin", auth, checkRole(["admin"]), (req, res) => {
    res.json({ message: "Welcome Admin" });
});

router.get("/student", auth, checkRole(["student", "admin"]), (req, res) => {
    res.json({ message: "Welcome Student" });
});

module.exports = router;
