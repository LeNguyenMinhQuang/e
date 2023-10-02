// Import
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const ProductSchema = new Schema(
    {
        name: {
            type: String,
        },
        image: {
            type: [
                {
                    url: String,
                    color: String,
                    stock: Number,
                },
            ],
        },
        price: {
            type: Number,
        },
        sku: {
            type: String,
        },
        vendor: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        stock: {
            type: Number,
        },
        sold: {
            type: Number,
            default: 0,
        },
        size: {
            type: Array,
        },
        description: {
            type: String,
        },
        rating: {
            type: Number,
            default: 5,
        },
        new: {
            type: Boolean,
        },
        sale: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

// Export
module.exports = mongoose.model("products", ProductSchema);
