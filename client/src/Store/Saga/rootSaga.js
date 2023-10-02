import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import productSaga from "./productSaga";
import reviewSaga from "./reviewSaga";
import userSaga from "./userSaga";
import checkoutSaga from "./checkoutSaga";

function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(productSaga),
        fork(reviewSaga),
        fork(userSaga),
        fork(checkoutSaga),
    ]);
}

export default rootSaga;
