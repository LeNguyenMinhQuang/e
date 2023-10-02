// Import
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
    GET_ALL_PRODUCT,
    RESET_PRODUCT_LIST,
} from "../../../Store/Action/action";

import ProductCard from "../../ProductCard/ProductCard";

function Product() {
    // Setup
    const dispatch = useDispatch();
    // Store
    const { products } = useSelector((state) => state.productReducer);

    // State
    const [listProduct, setListProduct] = useState([]);

    // Get all product
    const getAllProduct = useCallback(
        (payload) => {
            const run = (payload) => {
                dispatch({
                    type: GET_ALL_PRODUCT,
                    payload,
                });
            };
            run(payload);
        },
        [dispatch]
    );

    useEffect(() => {
        getAllProduct({ page: 1, sortby: null, sort: null, userId: null });
    }, []);

    useEffect(() => {
        if (products?.length > 0) {
            const newList = [...products];
            setListProduct(newList.splice(0, 8));
        }
    }, [products]);

    return (
        <Wrapper>
            <div className="title">PRODUCTS</div>
            <div className="products">
                {listProduct &&
                    listProduct.map((product) => {
                        return (
                            <ProductCard key={product._id} product={product} />
                        );
                    })}
            </div>
            <Link
                to="/product"
                style={{ textDecoration: "none" }}
                className="button white d-flex center"
            >
                See more
            </Link>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 1200px;

    .title {
        color: var(--theme);
        text-align: center;
        height: 40px;
        margin-bottom: 25px;
    }

    .products {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .button {
        margin: 0 auto;
        cursor: pointer;
        height: 40px;
        width: 20%;
        background-color: var(--theme);
        border: 1px solid var(--theme);
        color: var(--theme2);
        transition: 0.2s ease-in;
        font-size: 13px;
        margin: 0 auto 60px;

        &:hover {
            background-color: var(--theme2);
            border: 1px solid var(--theme);
            color: var(--theme);
        }
    }

    .white {
        background-color: var(--theme2);
        border: 1px solid var(--theme);
        color: var(--theme);

        &:hover {
            background-color: var(--theme);
            border: 1px solid var(--theme);
            color: var(--theme2);
        }
    }
`;

export default Product;
