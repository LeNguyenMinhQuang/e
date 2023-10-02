import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import createSagaMiddle from "redux-saga";
import rootReducer from "../Reducer/rootReducer";
import rootSaga from "../Saga/rootSaga";

const sagaMiddleware = createSagaMiddle();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
