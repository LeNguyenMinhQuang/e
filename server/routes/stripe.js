const express = require("express");
const router = express.Router();

const { checkout } = require("../controller/stripe");

router.post("/create-checkout-session", (req, res) => checkout(req, res));

module.exports = router;
