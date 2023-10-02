import React, { useState, useEffect } from "react";

import styled from "styled-components";

import {
    upload as uploadImage,
    remove as removeImage,
} from "../../../../Api/Api/upImageApi";

import { Close } from "../../../Icon/Icon";

function UploadImageCard({ setColor }) {
    // State

    const [imageInput, setImageInput] = useState("");
    const [colorInput, setColorInput] = useState("");
    const [stockInput, setStockInput] = useState("");
    const [imageData, setImageData] = useState([]);
    const [saveButton, setSaveButton] = useState("Save")

    const handleInputChange = (e, type) => {
        setSaveButton("Save")
        switch (type) {
            case "image":
                setImageInput(e.target.files[0]);
                break;
            case "color":
                setColorInput(e.target.value);
                break;
            case "stock":
                setStockInput(e.target.value);
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (imageInput && stockInput) {
            const formData = new FormData();
            formData.append("image", imageInput);
            const response = await uploadImage(formData);
            setImageData((state) => [
                ...state,
                {
                    url: response.url,
                    public_id: response.public_id,
                    color: colorInput,
                    stock: stockInput,
                },
            ]);
            setColorInput("");
            setStockInput("");
            setImageInput("")
        }
    };

    const handleRemove = async (payload) => {
        const newImageData = imageData.filter(
            (item) => item.public_id !== payload
        );
        setImageData(newImageData);
        await removeImage(payload);
    };

    const handleSave = () => {
        setColor([...imageData]);
        setSaveButton("Saved")
    };

    useEffect(() => {}, []);

    return (
        <Wrapper>
            <div className="inputs d-flex">
                <input
                    type="text"
                    className="inputColorName"
                    placeholder="Input Color name"
                    onChange={(e) => {
                        handleInputChange(e, "color");
                    }}
                    value={colorInput}
                />
                <input
                    type="number"
                    className="inputStock"
                    placeholder="Stock"
                    onChange={(e) => {
                        handleInputChange(e, "stock");
                    }}
                    value={stockInput}
                />
                <form
                    className="imageForm d-flex"
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                    // encType="multipart/form-data"
                >
                    <label htmlFor="image" className="button">
                        {!imageInput ? "Add an Image" : "Change Image"}
                    </label>
                    <input
                        type="file"
                        className="inputImage"
                        id="image"
                        onChange={(e) => {
                            handleInputChange(e, "image");
                        }}
                    />
                    <button className="button add" type="submit">
                        Add
                    </button>
                </form>
            </div>
            <div className="list d-flex">
                {imageData.map((item) => {
                    return (
                        <div className="box d-flex" key={item.color}>
                            <div
                                className="color"
                                style={{ backgroundColor: `${item.color}` }}
                            ></div>
                            <div
                                className="close d-flex"
                                onClick={() => {
                                    handleRemove(item.public_id);
                                }}
                            >
                                <Close />
                            </div>
                        </div>
                    );
                })}
                {imageData?.length > 0 && (
                    <button
                        className="button"
                        onClick={() => {
                            handleSave();
                        }}
                    >
                        {saveButton}
                    </button>
                )}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .inputs {
        gap: 12px;
        width: 100%;

        .inputColorName,
        .inputStock {
            height: 40px;
            width: 200px;
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

        .imageForm {
            input {
                display: none;
            }

            .button {
                display: block;
                cursor: pointer;
                height: 40px;
                line-height: 40px;
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

            .add {
                margin-left: 12px;
                background-color: var(--theme);
                border: 1px solid var(--theme);
                color: var(--theme2);
                &:hover {
                    background-color: var(--theme2);
                    border: 1px solid var(--theme);
                    color: var(--theme);
                }
            }
        }
    }

    .list {
        margin-top: 24px;
        gap: 12px;

        .button {
            cursor: pointer;
            height: 40px;
            padding-inline: 24px;
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

        .box {
            height: 40px;
            width: 80px;

            border: 1px solid var(--theme);
            align-items: center;

            .color,
            .close {
                height: 39px;
                width: 39px;
                cursor: pointer;
            }

            .color {
                opacity: 1;
            }

            .close {
                justify-content: center;
                align-items: center;

                svg {
                    height: 20px;
                    width: 20px;
                    fill: var(--theme5);
                    transition: 0.2s ease-in;
                }

                &:hover {
                    svg {
                        fill: var(--theme);
                    }
                }
            }
        }
    }
`;

export default UploadImageCard;
