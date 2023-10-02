// Import
const express = require("express");
const router = express.Router();

const { create, getFromId } = require("../controller/review");

// create
router.post("/", (req, res) => create(req, res));

// get
router.get("/:id", (req, res) => getFromId(req, res));

// Module
module.exports = router;
