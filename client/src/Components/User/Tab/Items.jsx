import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import {
    GET_PRODUCT_LIST,
    RESET_PRODUCT_LIST,
} from "../../../Store/Action/action";

import ProductCard from "../../ProductCard/ProductCard";

function Items({ pageId }) {
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
    const [productList, setProductList] = useState([]);

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
            page: page,
            userId: pageId,
            limit: 8,
        });
    }, [page, pageId]);

    useEffect(() => {
        setProductList(product_list);
    }, [product_list]);

    useEffect(() => {
        return () => {
            dispatch({ type: RESET_PRODUCT_LIST });
        };
    }, []);

    return (
        <Wrapper className="d-flex">
            <div className="productList">
                {productList?.map((product) => {
                    return (
                        <ProductCard
                            className="card"
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
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin: 40px -15px;
    flex-direction: column;

    .productList {
        height: auto;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
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
        margin: 0 auto;

        &:hover {
            background-color: var(--theme);
            border: 1px solid var(--theme);
            color: var(--theme2);
        }
    }
`;

export default Items;
