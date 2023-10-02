// Import
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const ReviewsSchema = new Schema(
    {
        itemId: {
            type: String,
        },
        userId: {
            type: String,
        },
        content: {
            type: String,
        },
        username: {
            type: String,
        },
    },
    { timestamps: true }
);

// Export
module.exports = mongoose.model("reviews", ReviewsSchema);
