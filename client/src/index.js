import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import ScrollToTop from "./Utils/ScrollToTop";
import RESETPRODUCTLIST from "./Utils/ResetProductList";
import store from "./Store/Store/store";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ScrollToTop>
                <Provider store={store}>
                    <RESETPRODUCTLIST>
                        <App />
                    </RESETPRODUCTLIST>
                </Provider>
            </ScrollToTop>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
