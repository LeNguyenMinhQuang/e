import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

function CheckoutSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("cart");
    }, []);

    return (
        <Wrapper className="d-flex">
            <div className="wrapper d-flex">
                <div className="text">
                    Your shopping cart has been checked out
                </div>
                <button className="button" onClick={() => navigate("/")}>
                    Go to Homepage
                </button>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin-block: 80px 301px;
    background-color: var(--theme2);
    justify-content: center;

    .wrapper {
        width: 1200px;
        padding: 40px 15px;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .text {
            font-size: 30px;
            font-weight: 500;
            margin-bottom: 24px;
        }

        .button {
            cursor: pointer;
            height: 40px;
            line-height: 40px;
            text-align: center;
            padding-inline: 24px;
            background-color: var(--theme2);
            border: 1px solid var(--theme);
            color: var(--theme);
            transition: 0.2s ease-in;
            font-size: 13px;

            &:hover {
                background-color: var(--theme);
                border: 1px solid var(--theme);
                color: var(--theme2);
            }
        }
    }
`;

export default CheckoutSuccess;
