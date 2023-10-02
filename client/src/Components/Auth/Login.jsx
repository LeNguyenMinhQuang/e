import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { USER_LOGIN, USER_REGISTER } from "../../Store/Action/action";

function Login({ handleClose }) {
    // Setup
    const dispatch = useDispatch();

    // Store
    const { isAuthenticated, message } = useSelector(
        (state) => state.authReducer
    );

    // State
    const [regiShow, setRegiShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loginForm, setLoginForm] = useState({ username: "", password: "" });
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        repassword: "",
    });

    // Change Login and Register Form
    const handleChangeLoginForm = (e) => {
        setLoginForm((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleChangeRegisterForm = (e) => {
        setRegisterForm((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    // Error Message
    const handleErrorMessage = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 3000);
    };

    // Login and register
    const handleLogin = () => {
        if (loginForm.username === "" || loginForm.password === "") {
            handleErrorMessage("Missing username and/or password!");
            return;
        }
        dispatch({ type: USER_LOGIN, payload: loginForm });
        handleErrorMessage(message);
    };

    const handleRegister = () => {
        if (registerForm.username === "" || registerForm.password === "") {
            handleErrorMessage("Missing username and/or password!");
            return;
        } else if (registerForm.password !== registerForm.repassword) {
            handleErrorMessage("Passwords do not match!");
            return;
        }
        dispatch({ type: USER_REGISTER, payload: registerForm });
        handleClose();
    };

    useEffect(() => {
        if (isAuthenticated === true) {
            handleClose();
        }
        // return () => {
        //     clearTimeout(timerRef.current);
        // };
    }, [isAuthenticated, handleClose]);

    return (
        <Wrapper>
            {!regiShow && (
                <div className="form">
                    <label htmlFor="username">USERNAME</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Your username here..."
                        value={loginForm.username}
                        onChange={(e) => {
                            handleChangeLoginForm(e);
                        }}
                    />
                    <label htmlFor="password">PASSWORD</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="And the password..."
                        value={loginForm.password}
                        onChange={(e) => {
                            handleChangeLoginForm(e);
                        }}
                    />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <div
                        className="button d-flex center"
                        onClick={() => {
                            handleLogin();
                        }}
                    >
                        LOGIN
                    </div>
                    <div className="forget">Forgot your password?</div>
                    <div className="signup">Doesn't have an account?</div>

                    <div
                        className="button d-flex center"
                        onClick={() => setRegiShow(true)}
                    >
                        SIGNUP NOW!
                    </div>
                </div>
            )}

            {regiShow && (
                <div className="form">
                    <label htmlFor="username">USERNAME</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Your username here..."
                        value={registerForm.username}
                        onChange={(e) => {
                            handleChangeRegisterForm(e);
                        }}
                    />
                    <label htmlFor="password">PASSWORD</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="And the password..."
                        value={registerForm.password}
                        onChange={(e) => {
                            handleChangeRegisterForm(e);
                        }}
                    />
                    <label htmlFor="repassword">CONFIRM PASSWORD</label>
                    <input
                        type="password"
                        name="repassword"
                        id="repassword"
                        placeholder="Confirm password..."
                        value={registerForm.repassword}
                        onChange={(e) => {
                            handleChangeRegisterForm(e);
                        }}
                    />
                    <div
                        className="button d-flex center"
                        onClick={() => handleRegister()}
                    >
                        SIGNUP
                    </div>
                    <div className="signup">Already have an account?</div>

                    <div
                        className="button d-flex center"
                        onClick={() => setRegiShow(false)}
                    >
                        LOGIN NOW!
                    </div>
                </div>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .form {
        label {
            font-size: 13px;
            margin-bottom: 2px;
        }
        input {
            width: 100%;
            height: 40px;
            margin-bottom: 20px;
            outline: none;
            border: 1px solid var(--theme5);
            background-color: var(--theme13);
            color: var(--theme3);
            padding-inline: 15px;
            transition: 0.2s ease-in;

            &::placeholder {
                color: var(--theme3);
            }

            &:hover,
            &:focus {
                background-color: var(--theme2);
                &::placeholder {
                    color: var(--theme);
                }
            }
        }

        .error {
            margin-bottom: 20px;
            font-size: 13px;
            color: var(--theme8);
        }

        .button {
            cursor: pointer;
            height: 40px;
            width: 100%;
            background-color: var(--theme);
            border: 1px solid var(--theme);
            color: var(--theme2);
            transition: 0.2s ease-in;
            font-size: 13px;

            &:hover {
                background-color: var(--theme2);
                border: 1px solid var(--theme);
                color: var(--theme);
            }
        }

        .forget,
        .signup {
            margin-block: 20px;
            font-size: 13px;
            color: var(--theme3);
        }

        .forget {
            border-bottom: 1px solid var(--theme5);
            padding-bottom: 20px;
            cursor: pointer;
            transition: 0.2s ease-in;

            &:hover {
                color: var(--theme);
            }
        }
    }
`;

export default Login;
