import axiosClient from "../axiosClient";

const upload = async (payload) => {
    try {
        const url = "/uploadImage";
        const response = await axiosClient.request({
            method: "post",
            url,
            data: payload,
        });

        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
};

const remove = async (payload) => {
    try {
        const url = "/uploadImage";
        await axiosClient.request({
            method: "delete",
            url,
            data: { publicId: payload },
        });
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
};

export { upload, remove };
