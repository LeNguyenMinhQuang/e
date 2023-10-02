import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as _ from "lodash";

import styled from "styled-components";

import { Close, Search } from "../Icon/Icon";
import ProductCard from "../ProductCard/ProductCard";

function Input({ handleClose, keyword, setKeyword }) {
    const handleChangeKeyword = (e) => {
        setKeyword(e.target.value);
    };
    const debouncedKeyword = _.debounce((e) => handleChangeKeyword(e), 500);

    return (
        <div className="input">
            <div className="header d-flex space-between">
                <p>What are you looking for?</p>
                <div onClick={() => handleClose()}>
                    <Close />
                </div>
            </div>
            <div className="box d-flex space-between">
                <input
                    // value={keyword}
                    type="text"
                    placeholder="Search products..."
                    onChange={(e) => debouncedKeyword(e)}
                />
                <Link to={`/product/${keyword}`} onClick={() => handleClose()}>
                    <Search />
                </Link>
            </div>
        </div>
    );
}

function SearchBlock({ searchList }) {
    return (
        <div className="searchblock d-flex">
            {searchList.map((item) => (
                <ProductCard key={item._id} product={item} />
            ))}
        </div>
    );
}

function ModalSearch({ setShow }) {
    // State
    const [keyword, setKeyword] = useState("");
    const [searchList, setSearchList] = useState([]);
    // Store
    const { products } = useSelector((state) => state.productReducer);
    // Ref
    const modalRef = useRef(null);
    const backRef = useRef(null);
    const timerRef = useRef(null);
    // Close modal
    const handleClose = () => {
        modalRef.current.classList.add("slideHideup");
        backRef.current.classList.add("fadeOut");
        timerRef.current = setTimeout(() => {
            setShow(false);
        }, 200);
    };

    useEffect(() => {
        let temp = products
            ?.filter((item) => item.name.includes(keyword))
            .slice(0, 4);
        setSearchList(temp);
    }, [keyword]);
    return (
        <Wrapper ref={backRef} onClick={() => handleClose()}>
            <div
                ref={modalRef}
                className="modal d-flex center"
                onClick={(e) => e.stopPropagation()}
            >
                <Input
                    handleClose={handleClose}
                    keyword={keyword}
                    setKeyword={setKeyword}
                />
                {keyword && searchList?.length > 0 && (
                    <SearchBlock searchList={searchList} />
                )}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    z-index: 100;

    &::before {
        content: "";
        background-color: var(--theme);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 150vh;
        width: 100vw;
        opacity: 50%;
        animation: fadein 0.2s linear;
        transition: 0.2s linear;
    }

    .modal {
        width: 100vw;
        background-color: var(--theme2);
        position: absolute;
        top: 0;
        animation: searchdown 0.4s;
        flex-direction: column;
        padding-block: 15px 25px;
        transition: 0.2s linear;
        transform-origin: top;
        overflow: hidden;

        .searchblock {
            height: 700px;
            width: 1200px;
            background-color: var(--theme2);
            animation: searchdown 0.4;
            padding-block: 40px;
        }

        .input {
            height: 120px;
            width: 1200px;
            padding-inline: 15px;

            .header {
                height: 20%;

                p {
                    color: var(--theme3);
                    font-size: 13px;
                }

                div {
                    width: 20px;
                    height: 20px;
                }

                svg {
                    width: 20px;
                    height: 20px;
                    fill: var(--theme3);
                }
            }

            .box {
                height: 80%;
                input {
                    width: 95%;
                    border: none;
                    font-size: 20px;
                    color: var(--theme);
                    outline: none;

                    &::placeholder {
                        font-size: 20px;
                        color: var(--theme);
                    }
                }

                svg {
                    height: 32px;
                    width: 32px;
                }
            }
        }
    }
`;

export default ModalSearch;
