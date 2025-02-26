const db = require("../server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Login
const login = (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM user WHERE email = ?", [email], async (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Database query failed" });
        }

        if (!result || result.length === 0) return res.status(400).json({ message: "Invalid Email" });

        const user = result[0];
        try {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

            // Generate JWT Token
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.json({
                token,
                user: { UserID: user.UserID, name: user.name, role: user.role }
            });

        } catch (error) {
            console.error("Password Comparison Error:", error);
            return res.status(500).json({ message: "Login failed" });
        }
    });
}

// Register
const register = (req, res) => {
    const { name, birthday, tel, faculty, major, email, password, studentID } = req.body;
    db.query("SELECT * FROM user WHERE email = ?", [email], async (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database query error" });
        }

        if (result.length > 0) return res.status(400).json({ message: "User already exists" });

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            db.query(
                "INSERT INTO user (name, birthday, tel, faculty, major, email, password, role, studentID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [name, birthday, tel, faculty, major, email, hashedPassword, "student", studentID],
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
};

module.exports = { login, register };