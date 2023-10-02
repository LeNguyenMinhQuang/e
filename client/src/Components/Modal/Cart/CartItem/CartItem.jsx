import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

function CardItem({ item, setCartList, index, cart, setPrice }) {
    // State

    const [quantity, setQuantity] = useState(item.quantity);
    const [image] = useState(
        item.product.image.filter((item2) => {
            return item2.color == item.color;
        })[0].url
    );

    const handleChangeQuantity = (type) => {
        let tempCart = [...cart];
        let newItem;
        let newQuantity;
        switch (type) {
            case "plus":
                newQuantity = quantity + 1;
                newItem = { ...item, quantity: newQuantity };
                tempCart[index] = newItem;
                localStorage.setItem("cart", JSON.stringify(tempCart));
                setQuantity(newQuantity);
                setPrice((prev) => prev + item.product.price);
                break;
            case "minus":
                if (quantity > 0) {
                    newQuantity = quantity - 1;
                    newItem = { ...item, quantity: newQuantity };
                    tempCart[index] = newItem;
                    localStorage.setItem("cart", JSON.stringify(tempCart));
                    setQuantity(newQuantity);
                    setPrice((prev) => prev - item.product.price);
                } else {
                    let tempCart2 = tempCart.filter(
                        (value) => value.id !== item.id
                    );
                    localStorage.setItem("cart", JSON.stringify(tempCart2));
                    setCartList([...tempCart2]);
                }

                break;
        }
    };
    return (
        <Wrapper>
            <div className="item d-flex">
                <div className="image">
                    <img src={image} alt="" />
                </div>

                <div className="info">
                    <Link
                        to={`/products/${item.product._id}`}
                        className="name"
                        style={{ textDecoration: "none" }}
                    >
                        {item.product.name}
                    </Link>
                    <div className="details d-flex">
                        <div className="detail">Color: {item.color}</div>
                        <div className="detail">Size: {item.size}</div>
                    </div>
                    <div className="quantity d-flex">
                        {quantity > 0 ? (
                            <div
                                className="button d-flex"
                                onClick={() => handleChangeQuantity("minus")}
                            >
                                -
                            </div>
                        ) : (
                            <div
                                className="button d-flex rotate"
                                onClick={() => handleChangeQuantity("minus")}
                            >
                                +
                            </div>
                        )}

                        <div className="number">{quantity}</div>
                        <div
                            className="button d-flex"
                            onClick={() => handleChangeQuantity("plus")}
                        >
                            +
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    border-bottom: 1px solid var(--theme5);
    height: 80px;
    margin-bottom: 18px;

    .item {
        width: 230px;

        &:hover {
            .info .name {
                color: var(--theme);
            }
        }

        .image img {
            height: 80px;
        }

        .info {
            margin-top: -4px;
            margin-left: 18px;
            height: 80px;
            flex-direction: column;
            flex-grow: 2;

            .name {
                font-size: 12px;
                font-weight: 500;
                color: var(--theme3);
                transition: 0.3s ease-in;
            }

            .details {
                margin-block: 6px 10px;
                font-size: 10px;
                gap: 12px;

                .detail {
                    color: var(--theme3);
                }
            }

            .quantity {
                height: 20px;
                line-height: 20px;
                width: 70px;
                justify-content: space-between;
                background-color: var(---theme3);

                .button {
                    width: 20px;
                    border: 1px solid var(--theme3);
                    border-radius: 50%;
                    justify-content: center;
                    cursor: pointer;
                }

                .rotate {
                    transform: rotate(45deg);
                }

                .number {
                    font-size: 12px;
                }
            }
        }
    }
`;

export default CardItem;
