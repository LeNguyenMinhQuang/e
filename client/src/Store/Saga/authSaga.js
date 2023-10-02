import { take, fork, call, put, all } from "redux-saga/effects";
import { login, register, isLogged } from "../../Api/Api/authApi";
import * as type from "../Action/action";

// Worker

function* checkAccessToken() {
    console.log("check access token");
    try {
        const response = yield call(isLogged);
        console.log(response);
        if (response.success) {
            yield put({
                type: type.USER_LOGGED,
                payload: {
                    isAuthenticated: true,
                    user: response.user,
                    message: response.message,
                },
            });
        } else {
            yield put({
                type: type.USER_LOGGED,
                payload: {
                    isAuthenticated: false,
                    user: null,
                    message: response?.message,
                },
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: type.USER_LOGGED,
            payload: {
                isAuthenticated: false,
                user: null,
                message: "Failed!",
            },
        });
    }
}

function* handleLogin(payload) {
    console.log("login");
    try {
        const response = yield call(login, payload);
        console.log(response);
        if (response.success) {
            yield put({
                type: type.USER_LOGIN_SUCCESS,
                payload: { message: response.message },
            });
            yield call(checkAccessToken);
        } else {
            yield put({
                type: type.USER_LOGIN_FAILED,
                payload: { message: response.message },
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: type.USER_LOGIN_FAILED,
            payload: { message: "Login Failed!" },
        });
    }
}

function* handleLogout() {
    console.log("logout");
    function clear() {
        try {
            localStorage.removeItem("userToken");
        } catch (error) {
            console.log(error);
        }
    }
    yield call(clear);
}
function* handleRegister(payload) {
    console.log("register");
    try {
        const response = yield call(register, payload);
        console.log(response);
        if (response.success) {
            yield put({
                type: type.USER_REGISTER_SUCCESS,
                payload: { message: response.message },
            });
            yield call(checkAccessToken);
        } else {
            yield put({
                type: type.USER_REGISTER_FAILED,
                payload: { message: response.message },
            });
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: type.USER_LOGIN_FAILED,
            payload: { message: "Login Failed!" },
        });
    }
}

// Watcher

function* watchLogin() {
    while (true) {
        const action = yield take(type.USER_LOGIN);
        yield fork(handleLogin, action.payload);
    }
}

function* watchRegister() {
    while (true) {
        const action = yield take(type.USER_REGISTER);
        yield fork(handleRegister, action.payload);
    }
}

function* watchLogout() {
    while (true) {
        yield take(type.USER_LOGOUT);
        yield fork(handleLogout);
    }
}

// Saga

function* authSaga() {
    yield all([fork(watchLogin), fork(watchRegister), fork(watchLogout)]);
}

export default authSaga;
