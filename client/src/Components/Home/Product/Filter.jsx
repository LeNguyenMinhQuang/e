import React, { useState, useEffect } from "react";

function Filter({ setFilter }) {
    const [colors] = useState([
        "white",
        "red",
        "yellow",
        "blue",
        "green",
        "black",
        "pink",
        "grey",
        "brown",
        "beige",
        "violet",
    ]);
    const [sizes] = useState(["XS", "S", "M", "L", "XL"]);
    const [prices] = useState(["<100$", ">100$ & <500$", ">500$"]);
    const [optional] = useState(["New", "Sale"]);

    const [colorFilter, setColorFilter] = useState(null);
    const [sizeFilter, setSizeFilter] = useState(null);
    const [priceFilter, setPriceFilter] = useState(null);
    const [optionalFilter, setOptionalFilter] = useState(null);

    const handleFilter = () => {
        setFilter({
            color: colorFilter,
            size: sizeFilter,
            price: priceFilter,
            optional: optionalFilter,
        });
    };

    const handleClearFilter = () => {
        setFilter({
            color: null,
            size: null,
            price: null,
            optional: null,
        });
        setColorFilter(null);
        setSizeFilter(null);
        setPriceFilter(null);
        setOptionalFilter(null);
    };

    return (
        <div className="filter">
            <div className="colors section">
                <p className="title">COLOR</p>
                <div className="select">
                    {colors.map((color) => {
                        return (
                            <div
                                key={color}
                                className="color"
                                onClick={() => {
                                    setColorFilter(color);
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: color,
                                        border: `1px solid ${
                                            color === colorFilter
                                                ? "var(--theme)"
                                                : "var(--theme5)"
                                        }`,
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="sizes section">
                <p className="title">SIZE</p>
                <div className="select">
                    {sizes.map((size) => {
                        return (
                            <div
                                key={size}
                                className="size"
                                onClick={() => {
                                    setSizeFilter(size);
                                }}
                            >
                                <div
                                    className="d-flex center"
                                    style={{
                                        border: `1px solid ${
                                            size === sizeFilter
                                                ? "var(--theme)"
                                                : "var(--theme5)"
                                        }`,
                                    }}
                                >
                                    {size}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="prices section">
                <p className="title">PRICE</p>
                <div className="select">
                    {prices.map((price) => {
                        return (
                            <div
                                key={price}
                                className="price"
                                onClick={() => {
                                    setPriceFilter(price);
                                }}
                            >
                                <div
                                    className="d-flex center"
                                    style={{
                                        border: `1px solid ${
                                            price === priceFilter
                                                ? "var(--theme)"
                                                : "var(--theme5)"
                                        }`,
                                    }}
                                >
                                    {price}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="optional section">
                <p className="title">OPTIONAL</p>
                <div className="select">
                    {optional.map((opt) => {
                        return (
                            <div
                                key={opt}
                                className="opt"
                                onClick={() => {
                                    setOptionalFilter(opt);
                                }}
                            >
                                <div
                                    className="d-flex center"
                                    style={{
                                        border: `1px solid ${
                                            opt === optionalFilter
                                                ? "var(--theme)"
                                                : "var(--theme5)"
                                        }`,
                                    }}
                                >
                                    {opt}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                className="button filter d-flex center"
                onClick={() => {
                    handleFilter();
                }}
            >
                Filter
            </div>
            <div
                className="button filter d-flex center"
                onClick={() => {
                    handleClearFilter();
                }}
            >
                Clear Filter
            </div>
        </div>
    );
}

export default Filter;
