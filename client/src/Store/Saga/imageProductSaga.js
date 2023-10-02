import { take, fork, call, put, all } from "redux-saga/effects";
import { upload, remove } from "../../Api/Api/upImageApi";
import * as type from "../Action/action";

// Worker
function* handleUpload(payload) {
    console.log("upload");
    try {
        const response = yield call(upload, payload);
        console.log(response);
        if (response.success) {
            yield put({
                type: type.UPLOAD_IMAGE_PRODUCT_SUCCESS,
                payload: { image: response.image, message: "Upload Success" },
            });
        } else {
            yield put({
                type: type.UPLOAD_IMAGE_PRODUCT_FAILED,
                payload: { message: "Upload Failed" },
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: type.UPLOAD_IMAGE_PRODUCT_FAILED,
            payload: { message: "Upload Failed!" },
        });
    }
}

function* handleRemove(payload) {
    console.log("upload");
    try {
        const response = yield call(remove, payload);
        console.log(response);
        if (response.success) {
            yield put({
                type: type.REMOVE_IMAGE_PRODUCT_SUCCESS,
                payload: { message: "Remove Success" },
            });
        } else {
            yield put({
                type: type.REMOVE_IMAGE_PRODUCT_FAILED,
                payload: { message: "Remove Failed" },
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: type.UPLOAD_IMAGE_PRODUCT_FAILED,
            payload: { message: "Remove Failed!" },
        });
    }
}

// Watcher
function* watchUploadImageProduct() {
    while (true) {
        const action = yield take(type.UPLOAD_IMAGE_PRODUCT);
        yield fork(handleUpload, action.payload);
    }
}

function* watchRemoveImageProduct() {
    while (true) {
        const action = yield take(type.REMOVE_IMAGE_PRODUCT);
        yield fork(handleRemove, action.payload);
    }
}

function* imageProductSaga() {
    yield all([fork(watchRemoveImageProduct), fork(watchUploadImageProduct)]);
}

export default imageProductSaga;
