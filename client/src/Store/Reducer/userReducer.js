import { GET_USER, GET_USER_SUCCESS, GET_USER_FAILED } from "../Action/action";

const initState = {
    isLoading: false,
    user: null,
    message: null,
};

const userReducer = (state = initState, action) => {
    let newState;
    const { type, payload } = action;
    switch (type) {
        case GET_USER_SUCCESS:
            newState = {
                ...state,
                message: payload.message,
                user: payload.user,
            };

            break;
        case GET_USER_FAILED:
            newState = { ...state, message: payload.message };
            break;
        default:
            newState = { ...state };
    }
    return newState;
};

export default userReducer;
