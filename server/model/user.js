// Import
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

// Export
module.exports = mongoose.model("users", UserSchema);
