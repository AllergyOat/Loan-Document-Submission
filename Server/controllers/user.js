const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../server");
dotenv.config();

// Get all user
const getUser = (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database query error" });
        }
        res.json(result);
    });
}

// Get user by ID
const getUserById = (req, res) => {
    const userId = parseInt(req.params.id, 10);
    db.query("SELECT * FROM user WHERE UserID = ?", [userId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database query error" });
        }
        res.json(result);
    });
};

// Update user
const updateUser = async (req, res) => {
    const userId = parseInt(req.params.id, 10); 
    if (isNaN(userId)) return res.status(400).json({ message: "Invalid user ID format" });
    let { name, birthday, tel, faculty, major, email, password, studentID } = req.body;

    try {
        if (password) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
        }

        db.query(
            "UPDATE user SET name = ?, birthday = ?, tel = ?, faculty = ?, major = ?, email = ?, password = COALESCE(?, password), studentID = ? WHERE UserID = ?",
            [name, birthday, tel, faculty, major, email, password || null, studentID, userId],
            (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: "Database query error" });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "User not found or no changes made" });
                }

                res.json({ message: "User updated successfully" });
            }
        );
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user" });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id, 10); 

    if (isNaN(userId)) return res.status(400).json({ message: "Invalid user ID format" });
    
    try {
        const [result] = await db.promise().query("DELETE FROM user WHERE UserID = ?", [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found or already deleted" });
        }

        res.json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database query error" });
    }
};

module.exports = { getUser, getUserById, updateUser, deleteUser };