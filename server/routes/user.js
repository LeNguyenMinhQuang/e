// Import
const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const {
    register,
    login,
    isLogged,
    changeInfo,
    changePassword,
    getUser,
} = require("../controller/user.js");

// Register
router.post("/register", (req, res) => register(req, res));

// Login
router.post("/login", (req, res) => login(req, res));

// Is Logged?
router.get("/logged", verifyToken, (req, res) => isLogged(req, res));

// Change Information
router.put("/:id/update", verifyToken, (req, res) => changeInfo(req, res));

// Change Password
router.put("/resetpassword", verifyToken, (req, res) =>
    changePassword(req, res)
);

// Get user
router.get("/:id", (req, res) => getUser(req, res));

// Export
module.exports = router;
