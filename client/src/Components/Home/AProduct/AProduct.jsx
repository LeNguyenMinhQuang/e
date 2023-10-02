import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { GET_A_PRODUCT, GET_REVIEW } from "../../../Store/Action/action";
import { Black, White, Close, Cart, Love, Loved } from "../../Icon/Icon";
import Reviews from "./Reviews";

function AProduct() {
    // Setup and store
    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.productReducer);
    const { user } = useSelector((state) => state.authReducer);

    // Get id
    const { id: itemId } = useParams();
    // State
    const [item, setItem] = useState(null);
    const [image, setImage] = useState(null);
    const [colorIndex, setColorIndex] = useState(0);
    const [sizeP, setSizeP] = useState(null);
    const [love, setLove] = useState(
        localStorage.getItem("love")?.includes(itemId) || false
    );
    const [quantity, setQuantity] = useState(1);

    const [editModal, setEditModal] = useState(false);
    // Get product
    const getProduct = useCallback(
        (payload) => {
            const run = (payload) => {
                dispatch({ type: GET_A_PRODUCT, payload });
            };
            run(payload);
        },
        [dispatch]
    );

    // getReviews
    const getReviews = useCallback(
        (payload) => {
            const run = (payload) => {
                dispatch({ type: GET_REVIEW, payload });
            };
            run(payload);
        },
        [dispatch]
    );

    useEffect(() => {
        getProduct(itemId);
        getReviews(itemId);
    }, [itemId]);

    useEffect(() => {
        setItem(product);
    }, [product]);

    // Image
    useEffect(() => {
        setImage(item?.image[colorIndex].url);
    }, [item, colorIndex]);

    // Add to love list
    const handleLove = () => {
        let list = JSON.parse(localStorage.getItem("love")) || [];
        console.log("list", list);
        let newList = [];
        if (list.includes(product?._id)) {
            newList = JSON.stringify(list.filter((e) => e !== product?._id));
            console.log("new", newList);
            localStorage.setItem("love", newList);
            setLove(false);
        } else {
            newList = JSON.stringify([...list, product?._id]);
            console.log("new", newList);
            localStorage.setItem("love", newList);
            setLove(true);
        }
    };

    useEffect(() => {
        console.log(sizeP);
    }, [sizeP]);

    // Add to cart
    const handleCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartLength = cart.length;
        if (product?.image[colorIndex].stock && sizeP) {
            let item = {
                id: product?._id + product?.image[colorIndex].color + sizeP,
                product: product,
                color: product?.image[colorIndex].color,
                size: sizeP,
            };
            let newCart;
            if (cartLength === 0) {
                console.log("cart length = 0 ");
                item.quantity = quantity;
                newCart = JSON.stringify([...cart, item]);
            } else {
                console.log("cart length != 0 ");
                const existItem = cart.find(
                    (e) =>
                        // e?.product._id === item.product._id &&
                        // e?.color === item.color &&
                        // e?.size == item.size
                        e?.id === item.id
                );
                if (existItem) {
                    console.log("product in cart");
                    item.quantity = existItem.quantity + quantity;
                    let temp = cart.filter((e) => e?.id !== item.id);
                    newCart = JSON.stringify([...temp, item]);
                } else {
                    console.log("product not in cart");
                    item.quantity = 1;
                    newCart = JSON.stringify([...cart, item]);
                }
            }
            localStorage.setItem("cart", newCart);
        }
    };

    // HandleQuantity
    const HandleQuantity = (type) => {
        switch (type) {
            case "minus":
                if (quantity <= 0) {
                    break;
                } else {
                    setQuantity((prev) => prev - 1);
                }
                break;
            case "plus":
                setQuantity((prev) => prev + 1);
                break;
        }
    };

    // Handle edit information

    return (
        <Wrapper className="d-flex">
            <div className="wrapper d-flex">
                <div className="imagebox d-flex">
                    <div className="imagelist d-flex">
                        {product?.image.map((img, index) => (
                            <img
                                key={img.color}
                                src={img.url}
                                alt="image"
                                onClick={() => {
                                    setColorIndex(index);
                                }}
                                style={{
                                    border:
                                        index == colorIndex
                                            ? "1px solid var(--theme)"
                                            : "none",
                                }}
                            />
                        ))}
                    </div>
                    <div className="image">
                        <img src={image} alt="image" />
                    </div>
                </div>
                <div className="textbox">
                    <div className="top d-flex">
                        {item?.new && <div className="new">New</div>}
                        {item?.sale && <div className="sale">Sale</div>}
                    </div>
                    <p className="name">{item?.name}</p>
                    <div className="rating d-flex">
                        {item?.rating >= 1 ? <Black /> : <White />}
                        {item?.rating >= 2 ? <Black /> : <White />}
                        {item?.rating >= 3 ? <Black /> : <White />}
                        {item?.rating >= 4 ? <Black /> : <White />}
                        {item?.rating >= 5 ? <Black /> : <White />}
                    </div>
                    <p className="sku">SKU: {item?.sku}</p>
                    <p className="vendor">Vendor: {item?.vendor.username}</p>
                    <p className="stock">Stock: {item?.stock}</p>
                    <p className="price">{item?.price}$</p>
                    <p className="ind">
                        Color: {item?.image[colorIndex].color}
                    </p>
                    <div className="colors">
                        {item?.image.map((image, index) => (
                            <div
                                key={image.color}
                                className="color"
                                onClick={() => {
                                    if (image.stock) {
                                        setColorIndex(index);
                                    }
                                }}
                            >
                                {image.stock === 0 && <Close />}
                                <div
                                    style={{
                                        backgroundColor: image.color,
                                        outline: `1px solid ${
                                            product?.image[colorIndex].color ===
                                            image.color
                                                ? "var(--theme)"
                                                : "var(--theme2)"
                                        }`,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <p className="ind">Size: {sizeP}</p>
                    <div className="sizes">
                        {product?.size.map((size) => (
                            <div
                                key={size}
                                className="size"
                                onClick={() => {
                                    if (size[1]) {
                                        setSizeP(size[0]);
                                    }
                                }}
                            >
                                {size[1] === false && <Close />}
                                <div
                                    className="d-flex center"
                                    style={{
                                        outline: `1px solid ${
                                            sizeP === size[0]
                                                ? "var(--theme)"
                                                : "var(--theme2)"
                                        }`,
                                    }}
                                >
                                    {size[0]}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="buttons d-flex">
                        <div className="quantity d-flex">
                            <div
                                className="minus"
                                onClick={() => {
                                    HandleQuantity("minus");
                                }}
                            >
                                -
                            </div>
                            <div className="number">{quantity}</div>
                            <div
                                className="plus"
                                onClick={() => {
                                    HandleQuantity("plus");
                                }}
                            >
                                +
                            </div>
                        </div>
                        <div
                            className="addCart d-flex center"
                            onClick={() => handleCart()}
                        >
                            <Cart />
                            <p>ADD TO CART</p>
                        </div>

                        {product?.vendor?._id != user?._id ? (
                            <div
                                className="love d-flex center"
                                onClick={() => {
                                    handleLove();
                                }}
                            >
                                {love ? <Loved /> : <Love />}
                            </div>
                        ) : (
                            <div
                                className="edit d-flex center"
                                onClick={() => handleCart()}
                            >
                                <p>EDIT</p>
                            </div>
                        )}
                    </div>
                    <div className="description">
                        <div className="dtitle">Description</div>
                        <div className="dtext">{item?.description}</div>
                    </div>
                </div>
            </div>
            <Reviews id={itemId} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin-block: 80px 301px;
    background-color: var(--theme2);
    ${"" /* justify-content: center; */}
    align-items: center;
    flex-direction: column;

    .wrapper {
        width: 1200px;
        padding: 40px 15px;
        gap: 25px;

        .imagebox {
            gap: 10px;

            .imagelist {
                flex-direction: column;
                gap: 10px;
                height: 600px;
                overflow-y: scroll;
                img {
                    height: 100px;
                }

                &::-webkit-scrollbar {
                    display: none;
                }
            }

            .image {
                img {
                    height: 600px;
                }
            }
        }

        .textbox {
            .top {
                gap: 4px;
                align-items: center;
                margin-bottom: 15px;

                .new {
                    padding: 4px;
                    font-size: 13px;
                    background-color: var(--theme9);
                    top: 8px;
                    left: 8px;
                    color: var(--theme2);
                }

                .sale {
                    padding: 4px;
                    font-size: 13px;
                    background-color: var(--theme8);
                    top: 33px;
                    left: 8px;
                    color: var(--theme2);
                }
            }

            .name {
                font-size: 25px;
                margin-bottom: 15px;
            }

            .rating {
                margin-left: -4px;
                margin-bottom: 20px;

                svg {
                    width: 25px;
                }
            }

            .sku,
            .vendor,
            .stock,
            .ind {
                font-size: 13px;
                color: var(--theme3);
            }

            .ind {
                font-size: 14px;
                margin-bottom: 10px;
            }

            .colors,
            .sizes {
                display: flex;
                height: 27px;
                margin-bottom: 15px;

                .color,
                .size {
                    height: 27px;
                    width: 27px;
                    position: relative;

                    & > div {
                        height: 20px;
                        width: 20px;
                        border-radius: 10px;
                        border: 1px solid var(--theme5);

                        &:hover {
                            cursor: pointer;
                        }

                        &:target {
                            border: 1px solid var(--theme);
                        }
                    }

                    svg {
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        fill: var(--theme3);
                    }
                }

                .size {
                    & > div {
                        height: 25px;
                        width: 25px;
                        border-radius: 0;
                        font-size: 11px;
                    }

                    svg {
                        height: 25px;
                        width: 25px;
                    }
                }
            }

            .price {
                margin-block: 15px;
                font-size: 24px;
            }

            .quantity {
                background-color: var(--theme5);
                width: 200px;
                height: 40px;
                justify-content: space-between;
                border: 1px solid var(--theme6);
                align-items: center;
                padding-inline: 16px;
                margin-right: 16px;

                .minus,
                .plus {
                    cursor: pointer;
                    font-size: 16px;
                    color: var(--theme3);
                    &:hover {
                        color: var(--theme);
                    }
                }
            }
        }

        .buttons {
            margin-block: 10px 30px;

            .edit {
                cursor: pointer;
                height: 40px;
                width: 10%;
                background-color: var(--theme2);
                border: 1px solid var(--theme);
                transition: 0.2s ease-in;
                margin-left: 16px;

                p {
                    color: var(--theme);
                    font-size: 13px;
                    transition: 0.2s ease-in;
                }

                &:hover {
                    background-color: var(--theme);
                    border: 1px solid var(--theme);

                    p {
                        color: var(--theme2);
                    }
                }
            }

            .addCart {
                cursor: pointer;
                height: 40px;
                width: 40%;
                background-color: var(--theme);
                border: 1px solid var(--theme);
                transition: 0.2s ease-in;
                overflow: hidden;
                position: relative;

                svg {
                    position: absolute;
                    height: 20px;
                    width: 20px;
                    fill: var(--theme2);
                    bottom: -50px;
                    left: 10px;
                    transition: 0.2s ease-in;
                }

                p {
                    color: var(--theme2);
                    font-size: 13px;
                    transition: 0.2s ease-in;
                }

                &:hover {
                    background-color: var(--theme2);
                    border: 1px solid var(--theme);

                    p {
                        color: var(--theme);
                        transform: translateX(10px);
                    }

                    svg {
                        bottom: 10px;
                        left: 25px;
                        fill: var(--theme);
                    }
                }
            }

            .love {
                width: 40px;
                height: 40px;
                transition: 0.2s ease-in;
                margin-left: 10px;
                border: 1px solid var(--theme2);

                svg {
                    width: 25px;
                    height: 25px;
                }

                &:hover {
                    border: 1px solid var(--theme);
                }
            }
        }

        .description {
            border-top: 1px solid var(--theme3);
            .dtitle {
                font-size: 20px;
                color: var(--theme);
                margin-block: 10px;
            }
            .dtext {
                font-size: 13px;
                color: var(--theme3);
            }
        }
    }
`;

export default AProduct;
