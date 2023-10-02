import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import UploadImageCard from "./SellCard/UploadImageCard";
import SizeCard from "./SellCard/SizeCard";
import { CREATE_PRODUCT } from "../../../Store/Action/action";

function Sell({ pageId }) {
    // setup
    const dispatch = useDispatch();

    // State
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([
        ["XS", false],
        ["S", false],
        ["M", false],
        ["L", false],
        ["XL", false],
    ]);
    const [isNew, setIsNew] = useState(true);
    const [isSale, setIsSale] = useState(false);
    const [item, setItem] = useState({
        name: "",
        price: "",
        sku: "",
        description: "",
    });
    const [uploadButton, setUploadButton] = useState("Upload");

    const handleItem = (e) => {
        const { value, name } = e.target;
        setItem((state) => {
            return { ...state, [name]: value };
        });
    };

    const handleCreateProduct = useCallback(
        (payload) => {
            const run = () => {
                dispatch({
                    type: CREATE_PRODUCT,
                    payload,
                });
            };
            run();
        },
        [dispatch]
    );

    const handleChoose = (type) => {
        switch (type) {
            case "new":
                setIsNew(!isNew);
                break;
            case "sale":
                setIsSale(!isSale);
                break;
            default:
                return;
        }
    };

    const handleSell = () => {
        const stock = color.reduce(
            (total, value) =>
                Number.parseFloat(total) + Number.parseFloat(value.stock),
            [0]
        );
        const product = {
            ...item,
            image: color,
            size,
            stock,
            vendor: pageId,
            sale: isSale,
            new: isNew,
        };
        handleCreateProduct(product);
        setUploadButton("Uploaded");
    };

    useEffect(() => {
        console.log(size);
    }, [size]);

    return (
        <Wrapper>
            <div className="inputbox d-flex">
                <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Name"
                    value={item.name}
                    onChange={(e) => {
                        handleItem(e);
                    }}
                />
                <input
                    type="number"
                    name="price"
                    className="input"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => {
                        handleItem(e);
                    }}
                />
                <input
                    type="text"
                    name="sku"
                    className="input"
                    placeholder="Sku"
                    value={item.sku}
                    onChange={(e) => {
                        handleItem(e);
                    }}
                />
            </div>
            <UploadImageCard setColor={setColor} />
            <SizeCard size={size} setSize={setSize} />
            <div className="newsale d-flex">
                <div
                    className={isNew ? "new selected" : "new"}
                    onClick={() => {
                        handleChoose("new");
                    }}
                >
                    New
                </div>
                <div
                    className={isSale ? "sale selected" : "sale"}
                    onClick={() => {
                        handleChoose("sale");
                    }}
                >
                    Sale
                </div>
            </div>
            <textarea
                type="text"
                name="description"
                className="input"
                placeholder="Description"
                value={item.description}
                onChange={(e) => {
                    handleItem(e);
                }}
            />
            <div
                className="sell"
                onClick={() => {
                    handleSell();
                }}
            >
                {uploadButton}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin-top: 40px;

    .inputbox {
        gap: 12px;
    }

    .inputbox > .input,
    textarea {
        height: 40px;
        width: 200px;
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

    textarea {
        margin-top: 24px;
        padding-block: 10px;
        height: 200px;
        width: 635px;
        margin-bottom: 0;
    }

    .newsale {
        gap: 16px;

        .selected {
            background-color: var(--theme);
            border: 1px solid var(--theme);
            color: var(--theme2);
        }
    }

    .sell,
    .new,
    .sale {
        cursor: pointer;
        width: 200px;
        height: 40px;
        padding-inline: 24px;
        background-color: var(--theme2);
        border: 1px solid var(--theme);
        color: var(--theme);
        transition: 0.2s ease-in;
        font-size: 13px;
        line-height: 40px;
        text-align: center;
        margin-top: 24px;

        &:hover {
            background-color: var(--theme);
            border: 1px solid var(--theme);
            color: var(--theme2);
        }
    }
`;

export default Sell;
