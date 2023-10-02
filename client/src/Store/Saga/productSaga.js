import { take, fork, call, put, all } from "redux-saga/effects";
import { getAll, getProduct, create, update } from "../../Api/Api/productApi";
import * as type from "../Action/action";

// Worker
function* handleGetAll(payload) {
    try {
        const response = yield call(getAll, payload);
        if (response.success) {
            yield put({
                type: type.GET_ALL_PRODUCT_SUCCESS,
                payload: {
                    products: response.products,
                    message: response.message,
                    total: response.total,
                },
            });
        } else {
            yield put({
                type: type.GET_ALL_PRODUCT_FAILED,
                payload: {
                    message: response.message,
                },
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: type.GET_ALL_PRODUCT_FAILED,
            payload: {
                message: "Can't get all product!",
            },
        });
    }
}

function* handleGetList(payload) {
    try {
        const response = yield call(getAll, payload);
        if (response.success) {
            yield put({
                type: type.GET_PRODUCT_LIST_SUCCESS,
                payload: {
                    products: response.products,
                    message: response.message,
                    total: response.total,
                },
            });
        } else {
            yield put({
                type: type.GET_PRODUCT_LIST_FAILED,
                payload: {
                    message: response.message,
                },
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: type.GET_PRODUCT_LIST_FAILED,
            payload: {
                message: "Can't get all product!",
            },
        });
    }
}

function* handleGet(payload) {
    try {
        const response = yield call(getProduct, payload);
        if (response.success) {
            yield put({
                type: type.GET_A_PRODUCT_SUCCESS,
                payload: {
                    product: response.product,
                    message: response.message,
                },
            });
        } else {
            yield put({
                type: type.GET_A_PRODUCT_FAILED,
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
                message: "Can't get product!",
            },
        });
    }
}

function* handleCreate(payload) {
    try {
        const response = yield call(create, payload);
        if (response.success) {
            put({
                type: type.CREATE_PRODUCT_SUCCESS,
                payload: {
                    message: response.message,
                },
            });
        } else {
            yield put({
                type: type.CREATE_PRODUCT_FAILED,
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
                message: "Can't create product!",
            },
        });
    }
}

function* handleUpdate(payload) {
    console.log(`update ${payload.name}`);
    try {
        const response = yield call(update, payload);
        console.log(response);
        if (response.success) {
            put({
                type: type.UPDATE_PRODUCT_SUCCESS,
                payload: {
                    message: response.message,
                },
            });
        } else {
            yield put({
                type: type.UPDATE_PRODUCT_FAILED,
                payload: {
                    message: response.message,
                },
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: type.UPDATE_PRODUCT_FAILED,
            payload: {
                message: "Can't create product!",
            },
        });
    }
}

// Watcher
function* watchGetAll() {
    while (true) {
        const action = yield take(type.GET_ALL_PRODUCT);
        yield fork(handleGetAll, action.payload);
    }
}

function* watchGetList() {
    while (true) {
        const action = yield take(type.GET_PRODUCT_LIST);
        yield fork(handleGetList, action.payload);
    }
}

function* watchGet() {
    while (true) {
        const action = yield take(type.GET_A_PRODUCT);
        yield fork(handleGet, action.payload);
    }
}

function* watchCreate() {
    while (true) {
        const action = yield take(type.CREATE_PRODUCT);
        yield fork(handleCreate, action.payload);
    }
}

function* watchUpdate() {
    while (true) {
        const action = yield take(type.UPDATE_PRODUCT);
        yield fork(handleUpdate, action.payload);
    }
}

// Saga
function* productSaga() {
    yield all([
        fork(watchGetAll),
        fork(watchGetList),
        fork(watchCreate),
        fork(watchGet),
        fork(watchUpdate),
    ]);
}

export default productSaga;
