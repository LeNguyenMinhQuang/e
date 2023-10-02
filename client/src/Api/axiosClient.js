import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL:
        process.env.NODE_ENV === "production"
            ? "abcdef"
            : "http://localhost:5000/api/",
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) =>
        queryString.stringify({
            ...params,
        }),
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        throw error;
    }
);

export default axiosClient;
