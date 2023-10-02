import { take, fork, call, put, all } from "redux-saga/effects";
import { create, get } from "../../Api/Api/reviewApi";
import * as type from "../Action/action";

// Worker
function* handleCreate(payload) {
    try {
        const response = yield call(create, payload);
        if (response.success) {
            yield put({
                type: type.CREATE_REVIEW_SUCCESS,
                payload: {
                    message: response.message,
                },
            });
        } else {
            yield put({
                type: type.CREATE_REVIEW_FAILED,
                payload: {
                    message: response.message,
                },
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: type.CREATE_PRODUCT_FAILED,
            payload: {
                message: "Can't create reviews!",
            },
        });
    }
}

function* handleGet(payload) {
    try {
        const response = yield call(get, payload);
        if (response.success) {
            yield put({
                type: type.GET_REVIEW_SUCCESS,
                payload: {
                    product: response.product,
                    reviews: response.reviews,
                },
            });
        } else {
            yield put({
                type: type.GET_REVIEW_FAILED,
                payload: {
                    message: response.message,
                },
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: type.GET_A_PRODUCT_FAILED,
            payload: {
                message: "Can't get reviews!",
            },
        });
    }
}

// Watcher
function* watchCreate() {
    while (true) {
        const action = yield take(type.CREATE_REVIEW);

        yield fork(handleCreate, action.payload);
    }
}

function* watchGet() {
    while (true) {
        const action = yield take(type.GET_REVIEW);
        yield fork(handleGet, action.payload);
    }
}

// Saga
function* reviewSaga() {
    yield all([fork(watchCreate), fork(watchGet)]);
}

export default reviewSaga;
