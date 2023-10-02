// Import
const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const { create, update, getAll, get } = require("../controller/product");

// Create
router.post("/", verifyToken, (req, res) => create(req, res));

// Update
router.put("/:id", verifyToken, (req, res) => update(req, res));

// GetAll
router.get("/", (req, res) => getAll(req, res));

// Get
router.get("/:id", (req, res) => get(req, res));

// Export
module.exports = router;
