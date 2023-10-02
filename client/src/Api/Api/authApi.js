// Import module
import axiosClient from "../axiosClient";
import configHeader from "../configHeader";

// Api
const isLogged = async () => {
    if (localStorage["userToken"]) {
        configHeader(localStorage["userToken"]);
    }
    try {
        const url = "/user/logged";
        const response = await axiosClient.get(url);
        if (response.data.success) {
            return response.data;
        }
    } catch (error) {
        localStorage.removeItem("userToken");
        configHeader(null);
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
};

const login = async (payload) => {
    try {
        const url = "/user/login";
        const response = await axiosClient.request({
            method: "post",
            url,
            data: payload,
        });
        console.log("login:", response.data);
        if (response.data.success) {
            localStorage.setItem("userToken", response.data.accessToken);
        }
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
};

const register = async (payload) => {
    try {
        const url = `/user/register`;
        const response = await axiosClient.request({
            method: "post",
            url,
            data: payload,
        });
        console.log("register:", response.data);
        if (response.data.success) {
            localStorage.setItem("userToken", response.data.accessToken);
        }
        return response.data;
    } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
    }
};

const changePassword = async (payload) => {
    try {
        const url = "/user/resetpassword";
        const response = await axiosClient.request({
            method: "put",
            url,
            data: payload,
        });
        if (response.data.success) {
            return response.data;
        }
    } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
    }
};

const changeInformation = async (userId, payload) => {
    try {
        const url = `/user/${userId}/update`;
        const response = await axiosClient.request({
            method: "put",
            url,
            data: payload,
        });
        if (response.data.success) {
            return response.data;
        }
    } catch (error) {
        if (error.response.data) return error.response.data;
        else return { success: false, message: error.message };
    }
};

export { isLogged, login, register, changePassword, changeInformation };
