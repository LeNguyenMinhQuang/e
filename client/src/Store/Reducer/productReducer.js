import {
    GET_ALL_PRODUCT,
    GET_ALL_PRODUCT_SUCCESS,
    GET_ALL_PRODUCT_FAILED,
    GET_A_PRODUCT,
    GET_A_PRODUCT_SUCCESS,
    GET_A_PRODUCT_FAILED,
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILED,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILED,
    GET_PRODUCT_LIST,
    GET_PRODUCT_LIST_SUCCESS,
    GET_PRODUCT_LIST_FAILED,
    RESET_PRODUCT_LIST,
} from "../Action/action";

const initState = {
    isLoading: false,
    message: null,
    products: null,
    product_list: [],
    product: null,
    total: null,
};

const productReducer = (state = initState, action) => {
    let newState;
    const { type, payload } = action;
    switch (type) {
        // case (GET_ALL_PRODUCT,
        // GET_PRODUCT_LIST,
        // GET_A_PRODUCT,
        // CREATE_PRODUCT,
        // UPDATE_PRODUCT):
        //     console.log("Loading...");
        //     newState = { ...state, isLoading: true };
        //     break;
        case RESET_PRODUCT_LIST:
            newState = { ...initState };
            break;
        case GET_PRODUCT_LIST_SUCCESS:
            newState = {
                ...state,
                isLoading: false,
                message: payload.message,
                product_list: [...state.product_list, ...payload.products],
                total: payload.total,
            };
            break;
        case GET_PRODUCT_LIST_FAILED:
            newState = {
                ...state,
                isLoading: false,
                message: payload.message,
                product_list: [],
            };
            break;
        case GET_ALL_PRODUCT_SUCCESS:
            newState = {
                ...state,
                isLoading: false,
                products: payload.products,
                message: payload.message,
            };
            break;
        case GET_ALL_PRODUCT_FAILED:
            newState = {
                ...state,
                isLoading: false,
                products: null,
                message: payload.message,
            };
            break;
        case GET_A_PRODUCT_SUCCESS:
            newState = {
                ...state,
                isLoading: false,
                product: payload.product,
                message: payload.message,
            };
            break;
        case GET_A_PRODUCT_FAILED:
            newState = {
                ...state,
                isLoading: false,
                product: null,
                message: payload.message,
            };
            break;
        case (CREATE_PRODUCT_SUCCESS,
        CREATE_PRODUCT_FAILED,
        UPDATE_PRODUCT_SUCCESS,
        UPDATE_PRODUCT_FAILED):
            newState = { ...state, message: payload.message };
            break;
        default:
            newState = { ...state };
    }
    return newState;
};

export default productReducer;
