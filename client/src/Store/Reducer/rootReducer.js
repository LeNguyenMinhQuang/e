import { combineReducers } from "redux";

import authReducer from "./authReducer";
import productReducer from "./productReducer";
import reviewsReducer from "./reviewsReducer";
import userReducer from "./userReducer";
// import checkoutReducer from "./checkoutReducer";

const rootReducer = combineReducers({
    authReducer: authReducer,
    productReducer: productReducer,
    reviewsReducer: reviewsReducer,
    userReducer: userReducer,
    // checkoutReducer: checkoutReducer,
});

export default rootReducer;
