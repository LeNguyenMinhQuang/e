import {
    CREATE_REVIEW,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAILED,
    GET_REVIEW,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAILED,
} from "../Action/action";

const initState = {
    isLoading: false,
    message: null,
    reviews: null,
};

const reviewsReducer = (state = initState, action) => {
    let newState;
    const { type, payload } = action;

    switch (type) {
        case GET_REVIEW_SUCCESS:
            newState = {
                ...state,
                isLoading: false,
                message: payload.message,
                reviews: payload.reviews,
            };
            break;
        case (CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAILED, GET_REVIEW_FAILED):
            newState = { ...state, isLoading: false, message: payload.message };
            break;
        default:
            newState = { ...state };
    }
    return newState;
};

export default reviewsReducer;
