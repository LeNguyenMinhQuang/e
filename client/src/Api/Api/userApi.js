// Import module
import axiosClient from "../axiosClient";

// Api
const getUser = async (payload) => {
    try {
        const url = `/user/${payload}`;
        const response = await axiosClient.request({
            method: "get",
            url,
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

// export
export { getUser };
