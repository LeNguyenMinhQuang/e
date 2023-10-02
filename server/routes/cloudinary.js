const express = require("express");
const router = express.Router();
const multer = require("multer");

const { uploadImage, removeImage } = require("../controller/cloudinary");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), (req, res) => uploadImage(req, res));

router.delete("/", (req, res) => removeImage(req, res));

module.exports = router;
