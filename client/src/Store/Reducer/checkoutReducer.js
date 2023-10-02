import { CHECKOUT, CHECKOUT_SUCCESS, CHECKOUT_FAILED } from "../Action/action";

const initState = {
    message: null,
    lastestOrder: null,
};

const checkoutReducer = (state = initState, action) => {
    let newState;
    const { type, payload } = action;

    switch (type) {
        case (CHECKOUT_SUCCESS, CHECKOUT_FAILED):
            newState = {
                message: payload.message,
                lastestOrder: payload.lastestOrder,
                url: payload.url,
            };

            break;
        default:
            newState = { ...state };
    }
    return newState;
};

export default checkoutReducer;
