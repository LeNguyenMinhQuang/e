import { take, fork, call, put, all } from "redux-saga/effects";
import { getUser } from "../../Api/Api/userApi";
import * as type from "../Action/action";

// Worker

function* handleGetUser(payload) {
    try {
        const response = yield call(getUser, payload);
        if (response.success) {
            yield put({
                type: type.GET_USER_SUCCESS,
                payload: { message: response.message, user: response.user },
            });
        } else {
            yield put({
                type: type.GET_USER_FAILED,
                payload: { message: response.message },
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: type.GET_USER_FAILED,
            payload: { message: "Get user Failed!" },
        });
    }
}

// Watcher

function* watchGetUser() {
    while (true) {
        const action = yield take(type.GET_USER);
        yield fork(handleGetUser, action.payload);
    }
}

// Saga

function* userSaga() {
    yield all([fork(watchGetUser)]);
}

export default userSaga;
