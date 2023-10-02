// Import
import axiosClient from "../axiosClient";

// Checkout
const checkout = async (payload) => {
    try {
        const url = "/checkout/create-checkout-session";
        const response = await axiosClient.request({
            method: "post",
            url,
            data: payload,
        });
        if (response.data.success) {
            return response.data;
        }
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
};

export { checkout };
