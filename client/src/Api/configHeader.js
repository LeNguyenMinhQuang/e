import axiosClient from "./axiosClient";

const configHeader = (token) => {
    if (token) {
        axiosClient.defaults.headers.common[
            "Authorization"
        ] = `BEARER ${token}`;
    } else {
        delete axiosClient.defaults.headers.common["Authorization"];
    }
};

export default configHeader;
