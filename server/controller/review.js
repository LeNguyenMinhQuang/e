// Import
const Reviews = require("../model/review");
const User = require("../model/user");

// New
const create = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        const { username } = user;
        const newReview = new Reviews({ ...req.body, username });
        await newReview.save();
        res.json({
            success: true,
            message: "Success",
            review: newReview,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};

// Get
const getFromId = async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await Reviews.find({ itemId: id }).sort({
            createdAt: "desc",
        });
        const returnReviews = reviews.slice(0, 4);
        res.json({
            success: true,
            message: "Success",
            reviews: returnReviews,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};

// Export
module.exports = { create, getFromId };
