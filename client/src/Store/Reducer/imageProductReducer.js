import {
    REMOVE_IMAGE_PRODUCT_SUCCESS,
    REMOVE_IMAGE_PRODUCT_FAILED,
    UPLOAD_IMAGE_PRODUCT_SUCCESS,
    UPLOAD_IMAGE_PRODUCT_FAILED,
} from "../Action/action";

const initState = {
    image: null,
    message: null,
};

const imageProductReducer = (state = initState, action) => {
    let newState;
    const { type, payload } = action;
    switch (type) {
        case UPLOAD_IMAGE_PRODUCT_SUCCESS:
            newState = {
                ...state,
                image: payload.image,
                message: payload.message,
            };
            break;
        case (REMOVE_IMAGE_PRODUCT_SUCCESS,
        REMOVE_IMAGE_PRODUCT_FAILED,
        UPLOAD_IMAGE_PRODUCT_FAILED):
            newState = {
                ...state,
                message: payload.message,
            };
            break;
        default:
            newState = { ...state };
    }
    return newState;
};

export default imageProductReducer;
