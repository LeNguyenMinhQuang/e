import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {
    Black,
    White,
    Love,
    Loved,
    Cart,
    Close,
    Prev,
    Next,
} from "../Icon/Icon";
function ProductCard({ product }) {
    // Ref
    const imgRef = useRef(null);
    // State
    const [colorIndex, setColorIndex] = useState(0);
    const [sizeP, setSizeP] = useState(null);
    const [love, setLove] = useState(false);
    const [imageInView, setImageInView] = useState(false);

    // Check product in love list
    useEffect(() => {
        if (localStorage.getItem("love")?.includes(product?._id)) {
            setLove(true);
        }
    }, [product]);

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

    // Add to cart
    const handleCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (product?.image[colorIndex].stock && sizeP) {
            let item = {
                id: product?._id + product?.image[colorIndex].color + sizeP,
                product: product,
                color: product?.image[colorIndex].color,
                size: sizeP,
            };
            let newCart;
            const cartLength = cart.length;
            if (cartLength === 0) {
                console.log("cart length = 0 ");
                item.quantity = 1;
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
                    item.quantity = existItem.quantity + 1;
                    let temp = cart.filter((e) => e?.id !== item.id);
                    newCart = JSON.stringify([...temp, item]);
                } else {
                    console.log("product not in cart");
                    item.quantity = 1;
                    newCart = JSON.stringify([...cart, item]);
                }
            }
            localStorage.setItem("cart", newCart);
            console.log(cart);
        }
    };

    // ChangeColorIndex

    const handleChangeColorIndex = (type) => {
        const length = product?.image.length;
        // console.log("length", length);
        // console.log("count", colorIndex);
        switch (type) {
            case "minus":
                if (colorIndex <= 0) {
                    setColorIndex(length - 2);
                } else {
                    setColorIndex((prev) => prev - 1);
                }
            case "plus":
                if (colorIndex >= length - 1) {
                    setColorIndex(0);
                } else {
                    setColorIndex((prev) => prev + 1);
                }
        }
    };

    // Lazyload img
    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setImageInView(true);
                    obs.disconnect();
                }
            }
        }, {});
        observer.observe(imgRef.current);
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <Wrapper className="d-flex" style={{ textDecoration: "none" }}>
            {product?.new && <div className="new">New</div>}
            {product?.sale && <div className="sale">Sale</div>}
            <Link to={`/products/${product?._id}`}>
                <img
                    ref={imgRef}
                    src={imageInView ? product?.image[colorIndex].url : ""}
                    alt="image"
                />
            </Link>

            <div className="prevnext d-flex space-between">
                <div onClick={() => handleChangeColorIndex("minus")}>
                    <Prev />
                </div>
                <div onClick={() => handleChangeColorIndex("plus")}>
                    <Next />
                </div>
            </div>
            <div className="text">
                <Link
                    to={`/user/${product?.vendor._id}`}
                    className="vendor"
                    style={{ textDecoration: "none" }}
                >
                    {product?.vendor.username}
                </Link>
                <div className="name">{product?.name}</div>
                <div className="price">${product?.price}</div>
                <div className="colors">
                    {product?.image.map((image, index) => (
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
                <div className="sizes">
                    {product?.size.map((size) => (
                        <div
                            key={size[0]}
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
                    <div
                        className="addCart d-flex center"
                        onClick={() => handleCart()}
                    >
                        <Cart />
                        <p>ADD TO CART</p>
                    </div>

                    <div
                        className="love d-flex center"
                        onClick={() => {
                            handleLove();
                        }}
                    >
                        {love ? <Loved /> : <Love />}
                    </div>
                </div>
                <div className="rating">
                    {product?.rating >= 1 ? <Black /> : <White />}
                    {product?.rating >= 2 ? <Black /> : <White />}
                    {product?.rating >= 3 ? <Black /> : <White />}
                    {product?.rating >= 4 ? <Black /> : <White />}
                    {product?.rating >= 5 ? <Black /> : <White />}
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 600px;
    width: 270px;
    flex-direction: column;
    margin-inline: 15px;
    position: relative;

    .new {
        position: absolute;
        padding: 4px;
        font-size: 13px;
        background-color: var(--theme9);
        top: 8px;
        left: 8px;
        color: var(--theme2);
    }

    .sale {
        position: absolute;
        padding: 4px;
        font-size: 13px;
        background-color: var(--theme8);
        top: 33px;
        left: 8px;
        color: var(--theme2);
    }

    .prevnext {
        position: absolute;
        opacity: 0;
        height: 20px;
        width: 100%;
        top: 300px;
        padding: 8px;
        transition: 0.2s ease-in;

        &:hover {
            opacity: 1;
        }

        div {
            height: 20px;
        }

        svg {
            width: 20px;
            height: 20px;
            cursor: pointer;
            fill: var(--theme);
        }
    }

    img {
        width: 100%;
        height: 345px;
        cursor: pointer;
        animation: imgSwift 0.2s ease-in;
        transition: 0.2s;

        &:hover ~ .prevnext {
            opacity: 1;
        }
    }

    .text {
        margin-top: 15px;

        .vendor {
            font-size: 13px;
            color: var(--theme3);
            margin-bottom: 4px;
            cursor: pointer;
        }

        .name {
            font-size: 13px;
            color: var(--theme);
            margin-bottom: 4px;
            cursor: pointer;
        }

        .price {
            font-size: 17px;
            color: var(--theme);
            margin-bottom: 10px;
        }

        .colors,
        .sizes {
            display: flex;
            height: 27px;

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

        .buttons {
            margin-block: 10px;

            .addCart {
                cursor: pointer;
                height: 40px;
                width: 60%;
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

        .rating {
            display: flex;

            svg {
                height: 20px;
                width: 20px;
            }
        }
    }
`;

export default ProductCard;
