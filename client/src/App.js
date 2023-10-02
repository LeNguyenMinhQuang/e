// Import
import React, { useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { USER_LOGGED } from "./Store/Action/action";
import { isLogged } from "./Api/Api/authApi";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Products from "./Components/Home/Product/Products";
import User from "./Components/User/User";
import AProduct from "./Components/Home/AProduct/AProduct";
import CheckoutSuccess from "./Components/Payment/CheckoutSuccess";

function App() {
    // Setup
    const dispatch = useDispatch();

    // Check authenticated
    const checkAccessToken = useCallback(() => {
        const run = async () => {
            try {
                const response = await isLogged();
                if (response.success === true) {
                    dispatch({
                        type: USER_LOGGED,
                        payload: {
                            isAuthenticated: true,
                            user: response.user,
                            message: response.message,
                        },
                    });
                } else {
                    dispatch({
                        type: USER_LOGGED,
                        payload: {
                            isAuthenticated: false,
                            user: null,
                            message: response.message,
                        },
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        run();
    }, [dispatch]);

    useEffect(() => {
        checkAccessToken();
    }, [checkAccessToken]);

    return (
        <React.Fragment>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product" element={<Products />} />
                <Route path="/product/:params" element={<Products />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/products/:id" element={<AProduct />} />
                <Route path="/checkout-success" element={<CheckoutSuccess />} />
            </Routes>
            <Footer />
        </React.Fragment>
    );
}

export default App;
