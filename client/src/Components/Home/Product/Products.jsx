import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import {
    GET_PRODUCT_LIST,
    RESET_PRODUCT_LIST,
} from "../../../Store/Action/action";
import Filter from "./Filter";
import ProductCard from "../../ProductCard/ProductCard";

function Products() {
    // Param
    const { params } = useParams();

    // Setup
    const dispatch = useDispatch();

    // Store
    const { product_list, total } = useSelector(
        (state) => state.productReducer
    );

    // Ref
    const loadRef = useRef(null);

    // State
    const [page, setPage] = useState(1);
    const [sortby, setSortby] = useState(null);
    const [sort, setSort] = useState(null);
    const [productList, setProductList] = useState([]);
    const [filter, setFilter] = useState({
        color: null,
        size: null,
        price: null,
        optional: null,
    });

    const [sortShow, setSortShow] = useState(false);

    // Get products
    const getAllProduct = useCallback(
        (payload) => {
            const run = (payload) => {
                setTimeout(() => {
                    dispatch({
                        type: GET_PRODUCT_LIST,
                        payload,
                    });
                }, 1000);
            };
            run(payload);
        },
        [dispatch]
    );

    // Autoload

    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    if (product_list.length < total) {
                        console.log("change page");
                        setPage((prev) => prev + 1);
                        obs.disconnect();
                    }
                }
            }
        }, {});
        observer.observe(loadRef.current);
        return () => {
            observer.disconnect();
        };
    }, [product_list, total]);

    // Load product sort
    useEffect(() => {
        getAllProduct({
            text: params,
            page: page,
            sortby: sortby,
            sort: sort,
            userId: null,
            limit: 9,
        });
        // return () => {
        //     dispatch({ type: RESET_PRODUCT_LIST });
        // };
    }, [params, page, sortby, sort]);

    // ProductList
    // useEffect(() => {
    //     setProductList(product_list);
    // }, [product_list]);

    useEffect(() => {
        let filterList = [...product_list];

        if (filter.color) {
            filterList = filterList.filter((item) =>
                item.image
                    .map((colorItem) => colorItem.color)
                    .includes(filter.color)
            );
        }
        if (filter.size) {
            filterList = filterList.filter((item) =>
                item.size
                    .filter((size) => size[1] === true)
                    .map((size) => size[0])
                    .includes(filter.size)
            );
        }
        if (filter.optional === "New") {
            filterList = filterList.filter((item) => item.new);
        }
        if (filter.optional === "Sale") {
            filterList = filterList.filter((item) => Boolean(item.sale));
        }
        if (filter.price) {
            if (filter.price === "<100$") {
                filterList = filterList.filter((item) => item.price <= 100);
            } else if (filter.price == ">100$ & <500$") {
                filterList = filterList.filter(
                    (item) => item.price > 100 && item.price <= 500
                );
            } else if (filter.price === ">500$") {
                filterList = filterList.filter((item) => item.price > 500);
            }
        }
        setProductList(filterList);
    }, [filter, product_list]);

    // handle Sort
    const handleSort = (_sortby, _sort) => {
        setPage(1);
        setSortby(_sortby);
        setSort(_sort);
        setSortShow(false);
        dispatch({ type: RESET_PRODUCT_LIST });
    };

    return (
        <Wrapper className="d-flex">
            <div className="wrapper d-flex">
                <Filter setFilter={setFilter} />
                <div className="products">
                    <div className="title">PRODUCTS</div>
                    <div className="sort d-flex">
                        <p
                            className="section"
                            onClick={() => {
                                setSortShow(!sortShow);
                            }}
                        >
                            Sort:{" "}
                            {sortby && sort ? `${sortby} - ${sort}` : "Default"}
                        </p>
                        {sortShow && (
                            <div className="list d-flex">
                                <div
                                    className="button d-flex center"
                                    onClick={() => {
                                        handleSort("name", "asc");
                                    }}
                                >
                                    Name: A-Z
                                </div>
                                <div
                                    className="button d-flex center"
                                    onClick={() => {
                                        handleSort("name", "desc");
                                    }}
                                >
                                    Name: Z-A
                                </div>
                                <div
                                    className="button d-flex center"
                                    onClick={() => {
                                        handleSort("price", "asc");
                                    }}
                                >
                                    Price: Low - High
                                </div>
                                <div
                                    className="button d-flex center"
                                    onClick={() => {
                                        handleSort("price", "desc");
                                    }}
                                >
                                    Price: High - Low
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="productList">
                        {productList?.map((product) => {
                            return (
                                <ProductCard
                                    key={product?._id}
                                    product={product}
                                />
                            );
                        })}
                    </div>

                    <div
                        className="button d-flex center more"
                        ref={loadRef}
                        style={{
                            display: product_list?.length >= total && "none",
                        }}
                    >
                        Loading...
                    </div>
                </div>
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

        .filter {
            .section {
                border-bottom: 1px solid var(--theme5);
                padding-block: 15px;

                .title {
                    margin-bottom: 15px;
                }

                .select {
                    display: grid;
                    grid-template-columns: repeat(9, 1fr);
                }
            }

            .colors {
                .color {
                    width: 27px;
                    height: 27px;
                    cursor: pointer;

                    & > div {
                        width: 20px;
                        height: 20px;
                        border-radius: 10px;
                    }
                }
            }

            .sizes {
                .size {
                    width: 27px;
                    height: 27px;
                    cursor: pointer;

                    & > div {
                        width: 25px;
                        height: 25px;
                        font-size: 10px;
                    }
                }
            }

            .prices,
            .optional {
                .select {
                    display: flex;
                    gap: 8px;
                }

                .price,
                .opt {
                    height: 27px;
                    cursor: pointer;

                    & > div {
                        height: 27px;
                        width: 90px;
                        font-size: 13px;
                    }
                }
            }
        }

        .button {
            cursor: pointer;
            height: 40px;
            width: 200px;
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

        .button.filter {
            margin-top: 20px;
            width: 100%;
        }

        .products {
            padding-top: 15px;

            .title {
                padding-left: 15px;
                font-size: 24px;
                font-weight: 400;
                margin-bottom: 10px;
            }

            .sort {
                padding-left: 15px;
                align-items: center;
                height: 28px;
                margin-bottom: 24px;

                .section {
                    color: var(--theme3);
                    font-size: 13px;
                    margin-right: 10px;
                    cursor: pointer;
                }

                .list {
                    gap: 8px;
                }
            }

            .productList {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
            }

            .button.more {
                margin: 0 auto;
            }
        }
    }
`;

export default Products;
