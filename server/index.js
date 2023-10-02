// Import
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");

const connectDB = require("./config/mongodb");

// Import router
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const reviewRouter = require("./routes/review");
const uploadImageRouter = require("./routes/cloudinary");
const checkoutRouter = require("./routes/stripe");

// Database
connectDB();

// App
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/review", reviewRouter);
app.use("/api/uploadImage", uploadImageRouter);
app.use("/api/checkout", checkoutRouter);

const PORT = process.env.PORT || process.env.LOCALHOST_PORT;

server.listen(PORT, () => console.log("Server started on port:", PORT));

module.exports = { server };
