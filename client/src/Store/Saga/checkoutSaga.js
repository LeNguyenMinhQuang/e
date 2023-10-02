import { take, fork, call, put, all } from "redux-saga/effects";
import { checkout } from "../../Api/Api/checkoutApi";
import * as type from "../Action/action";

// Worker

function* handleCheckout(payload) {
    try {
        const response = yield call(checkout, payload);
        console.log(response);
        if (response.success) {
            window.location.href = response.url;
            //     yield put({
            //         type: type.CHECKOUT_SUCCESS,
            //         payload: {
            //             message: "Success",
            //             lastestOrder: payload.itemList,
            //         },
            //     });
            // } else {
            //     yield put({
            //         type: type.CHECKOUT_FAILED,
            //         payload: {
            //             message: "Failed",
            //             lastestOrder: payload.itemList,
            //         },
            //     });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: type.CHECKOUT_FAILED,
            payload: {
                message: "Failed",
                lastestOrder: payload,
            },
        });
    }
}

// Watcher

function* watchCheckout() {
    while (true) {
        const action = yield take(type.CHECKOUT);
        yield fork(handleCheckout, action.payload);
    }
}

// Saga

function* checkoutSaga() {
    yield all([fork(watchCheckout)]);
}

export default checkoutSaga;
