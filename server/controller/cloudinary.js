const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "quangcloud",
    api_key: "829274137712742",
    api_secret: "Bp41M0D0jNcqo28vxCf028CClf0",
});

const uploadImage = async (req, res) => {
    try {
        const response = await cloudinary.uploader.upload(req.file.path, {
            folder: "ShellaProduct",
        });
        res.json({
            success: true,
            public_id: response.public_id,
            url: response.url,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};

const removeImage = async (req, res) => {
    const { publicId } = req.body;
    try {
        await cloudinary.uploader.destroy(publicId);
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
};

module.exports = { uploadImage, removeImage };
