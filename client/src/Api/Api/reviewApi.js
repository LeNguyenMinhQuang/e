// Import
import axiosClient from "../axiosClient";

// Create
const create = async (payload) => {
    try {
        const url = `/review`;
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

// Get
const get = async (payload) => {
    try {
        const url = `/review/${payload}`;
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

export { create, get };
