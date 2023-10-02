// Import
const Product = require("../model/product");

// New product
const create = async (req, res) => {
    try {
        const newProduct = new Product({ ...req.body, vendor: req.userId });
        await newProduct.save();
        res.json({
            success: true,
            message: "Product has created!",
            product: newProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};

// Update product
const update = async (req, res) => {
    try {
        const _product = await Product.findById(req.params.id).populate(
            "vendor"
        );
        if (!_product.vendor._id.equals(req.userId)) {
            return res.status(403).json({
                success: false,
                message: "Can't update product of other people!",
            });
        }
        const update = { ...req.body };
        const condition = { _id: req.params.id };
        const updated = await Product.findOneAndUpdate(condition, update, {
            new: true,
        });
        res.json({
            success: true,
            message: "Product has updated!",
            product: updated,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};

// Get all product
const getAll = async (req, res) => {
    const { text, page, sortby, sort, userId, limit } = req.query;
    const _page = page * 1 || 1;
    const _limit = limit || 9;
    const skip = _limit * (_page - 1);
    const _sortby = sortby || null;
    const _sort = sort || "-createdAt";
    let condition = {};
    function createCondition(userId) {
        if (userId) {
            condition.vendor = userId;
        } else {
            return;
        }
    }
    function textCondition(text) {
        if (text) {
            condition.name = { $regex: text, $options: "i" };
        } else {
            return;
        }
    }
    createCondition(userId);
    textCondition(text);

    try {
        const products = await Product.find(condition)
            .populate("vendor", "username")
            .select(["-description"])
            .limit(_limit)
            .skip(skip)
            .sort(_sortby ? { [_sortby]: _sort } : _sort);
        const totalPro = await Product.find(condition);
        res.json({
            success: true,
            message: "Get all!",
            products: products,
            total: totalPro.length,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};

// Get a product
const get = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            "vendor"
        );
        // console.log(product);
        res.json({
            success: true,
            message: "Get!",
            product: product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};

// Export
module.exports = { create, update, getAll, get };
