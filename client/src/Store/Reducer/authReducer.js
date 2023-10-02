import {
    USER_LOGGED,
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGOUT,
    USER_REGISTER,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILED,
} from "../Action/action";

const initState = {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    message: null,
};

const authReducer = (state = initState, action) => {
    let newState;
    const { type, payload } = action;
    switch (type) {
        case USER_LOGGED:
            newState = {
                ...state,
                isLoading: false,
                isAuthenticated: payload.isAuthenticated,
                user: payload.user,
                message: payload.message,
            };
            break;
        case USER_LOGIN:
            newState = {
                ...state,
                isLoading: true,
            };
            break;
        case USER_REGISTER:
            newState = {
                ...state,
                isLoading: true,
            };
            break;
        case USER_LOGIN_SUCCESS:
            newState = {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: null,
                message: payload.message,
            };
            break;
        case USER_REGISTER_SUCCESS:
            newState = {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: null,
                message: payload.message,
            };
            break;
        case USER_LOGIN_FAILED:
            newState = {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: null,
                message: payload.message,
            };
            break;
        case USER_REGISTER_FAILED:
            newState = {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: null,
                message: payload.message,
            };
            break;
        case USER_LOGOUT:
            newState = {
                isLoading: false,
                isAuthenticated: false,
                user: null,
                message: "Log Out Successfully!",
            };
            break;
        default:
            newState = { ...state };
    }
    return newState;
};

export default authReducer;
