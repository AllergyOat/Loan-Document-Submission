const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.get("/user", userController.getUser);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
