// Import
import axiosClient from "../axiosClient";

// Getall
const getAll = async (payload) => {
    const { text, page, sortby, sort, userId, limit } = payload;
    try {
        const url = `/product`;
        const response = await axiosClient.request({
            method: "get",
            url,
            params: {
                text: text || null,
                page: page || 1,
                sortby: sortby || null,
                sort: sort || null,
                userId: userId || null,
                limit: limit || 9,
            },
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
const getProduct = async (id) => {
    try {
        const url = `/product/${id}`;
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

// Create
const create = async (payload) => {
    try {
        const url = `/product`;
        const response = await axiosClient.request({
            method: "post",
            url,
            data: payload,
        });
        console.log("create", response.data);
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
};

// Update
const update = async (payload, id) => {
    try {
        const url = `/product/${id}`;
        const response = await axiosClient.request({
            method: "put",
            url,
            data: payload,
        });
        console.log("update", response.data);
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
};

export { getAll, getProduct, create, update };
