const mongoose = require("mongoose");

// MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://quang:${process.env.DB_PASSWORD}@cluster0.6iqsuao.mongodb.net/shella?retryWrites=true&w=majority`
        );
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
