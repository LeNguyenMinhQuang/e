import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import CartItem from "./CartItem/CartItem";
import { CHECKOUT } from "../../../Store/Action/action";

function Cart({ handleClose }) {
    // setup
    const dispatch = useDispatch();

    // store
    const { user } = useSelector((state) => state.authReducer);

    const [cartList, setCartList] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );
    const [price, setPrice] = useState(
        cartList.reduce((total, current) => {
            return total + current.product.price * current.quantity;
        }, 0)
    );
    const navigate = useNavigate();

    const handleCheckout = useCallback(
        (payload) => {
            const run = (payload) => {
                dispatch({ type: CHECKOUT, payload });
            };
            run(payload);
            console.log(payload);
        },
        [dispatch]
    );

    const handleOrder = () => {
        let userId = user._id;
        handleCheckout({
            itemList: cartList,
            userId,
        });

        handleClose();
    };

    return (
        <Wrapper className="d-flex">
            <div className="cartlist">
                {cartList.map((item, index) => (
                    <CartItem
                        item={item}
                        key={item.id}
                        index={index}
                        cart={cartList}
                        setCartList={setCartList}
                        setPrice={setPrice}
                    />
                ))}
            </div>
            {cartList.length > 0 && (
                <div className="price">Total: {price}$</div>
            )}
            {cartList.length > 0 && (
                <div
                    className="orderButton"
                    onClick={() => {
                        handleOrder();
                    }}
                >
                    Order
                </div>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin-top: 40px;
    flex-direction: column;

    .cartlist {
        overflow-y: scroll;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .price {
        font-weight: 500;
        text-align: right;
        margin-bottom: 12px;
    }

    .orderButton {
        width: 120px;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        text-align: center;
        align-self: end;
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
`;

export default Cart;
