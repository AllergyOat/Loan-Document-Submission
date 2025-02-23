const express = require("express");
const authController = require("../controllers/auth");
const { auth, checkRole } = require("../middlewares/authCheck");
const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);

router.get("/admin", auth, checkRole(["admin"]), (req, res) => {
    res.json({ message: "Welcome Admin" });
});
router.get("/student", auth, checkRole(["student", "admin"]), (req, res) => {
    res.json({ message: "Welcome Student" });
});

module.exports = router;