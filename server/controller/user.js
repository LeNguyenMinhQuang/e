// Import
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

// Register
const register = async (req, res) => {
    const { username, password, image } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: "Missing username or password!" });
    }

    try {
        const existUser = await User.findOne({ username });
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "Username already taken!",
            });
        }

        const hashedPassword = await argon2.hash(password);

        const newUser = new User({
            username,
            password: hashedPassword,
            image,
        });

        await newUser.save();

        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.SECURITY_TOKEN
        );

        res.json({
            success: true,
            message: "Register successfully!",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};

// Login
const login = async (req, res) => {
    const { username, password } = req.body;
    // Simple check
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing username and/or password!",
        });
    }
    try {
        // Check existing user
        const existUser = await User.findOne({ username });
        if (!existUser) {
            return res
                .status(400)
                .json({ success: false, message: "Incorrect username!" });
        }
        // Existing user found
        const passwordValid = await argon2.verify(existUser.password, password);
        if (!passwordValid) {
            return res
                .status(400)
                .json({ success: false, message: "Incorrect password!" });
        }
        // Password correct then return token
        const accessToken = jwt.sign(
            { userId: existUser._id },
            process.env.SECURITY_TOKEN
        );
        res.json({
            success: true,
            message: "Login succesfully!",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};

// Check logged
const isLogged = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select(["-password"]);
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "User not found!" });
        }
        res.json({ success: true, message: "User is logged in", user });
    } catch (error) {
        res.status(500).message({ success: false, message: "Server error" });
    }
};

// Update information
const changeInfo = async (req, res) => {
    if (req.params.id != req.userId) {
        return res.status(401).json({
            success: false,
            message: "Cannot change information of other people!",
        });
    }
    try {
        const existUser = await User.findById(req.params.id);
        if (!existUser) {
            return res
                .status(400)
                .json({ success: false, message: "User doens't exist!" });
        }

        const updateContent = { ...req.body };
        const updateCondition = { _id: req.userId };
        const updateInfo = await User.findOneAndUpdate(
            updateCondition,
            updateContent,
            {
                new: true,
            }
        );
        if (!updateInfo) {
            return res
                .status(401)
                .json({ success: false, message: "Can't change information!" });
        }
        res.json({
            success: true,
            message: "Information changed!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};

// Change Password
const changePassword = async (req, res) => {
    const { password, newPassword } = req.body;
    try {
        let existUser = await User.findById(req.userId);
        if (!existUser) {
            return res
                .status(400)
                .json({ success: false, message: "User doens't exist!" });
        }
        const passwordValid = await argon2.verify(existUser.password, password);
        if (!passwordValid) {
            return res
                .status(400)
                .json({ success: false, message: "Incorect password!" });
        }
        const updateContent = { password: await argon2.hash(newPassword) };
        const updateCondition = { _id: req.userId };
        let updatePass = await User.findOneAndUpdate(
            updateCondition,
            updateContent,
            { new: true }
        );

        if (!updatePass) {
            return res
                .status(401)
                .json({ success: false, message: "Can't change password!" });
        }
        res.json({
            success: true,
            message: "Password changed!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};

// Get user
const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select(
            "-password -createdAt -updatedAt"
        );
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found!" });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};

// Export
module.exports = {
    register,
    login,
    isLogged,
    changeInfo,
    changePassword,
    getUser,
};
