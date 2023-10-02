import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import { GET_USER } from "../../Store/Action/action";
import { Items, History, Sell } from "./Tab/Tabs";

function User() {
    // setup
    const dispatch = useDispatch();
    const { id: pageId } = useParams();

    // store
    const { user: pageUser } = useSelector((state) => state.userReducer);
    const { user } = useSelector((state) => state.authReducer);

    // State
    const [sectionShow, setSectionShow] = useState("items");
    const [isUser, setIsUser] = useState(false);

    // getUser
    const getUser = useCallback(
        (id) => {
            const run = (payload) => {
                dispatch({
                    type: GET_USER,
                    payload: payload,
                });
            };
            run(id);
        },
        [dispatch]
    );

    useEffect(() => {
        getUser(pageId);
    }, [pageId]);

    useEffect(() => {
        if (user?._id === pageId) {
            setIsUser(true);
        }
    }, [user, pageId]);

    // show Modal

    const handleShowSection = (payload) => {
        setSectionShow(payload);
    };

    return (
        <Wrapper className="d-flex">
            {pageUser && (
                <div className="wrapper d-flex">
                    {isUser ? (
                        <>
                            <div className="user">
                                <p className="name">
                                    Hello, {`${pageUser?.username}`}
                                </p>
                                <p className="text">What do you want?</p>
                            </div>
                            <div className="catebuttons d-flex">
                                <div
                                    className="button d-flex center"
                                    onClick={() => {
                                        handleShowSection("items");
                                    }}
                                >
                                    See your items
                                </div>
                                <div
                                    className="button d-flex center"
                                    onClick={() => {
                                        handleShowSection("sell");
                                    }}
                                >
                                    Sell an item
                                </div>
                                <div
                                    className="button d-flex center"
                                    onClick={() => {
                                        handleShowSection("history");
                                    }}
                                >
                                    History
                                </div>
                                {/* <div
                                    className="button d-flex center"
                                    onClick={() => {
                                        handleShowSection("cart");
                                    }}
                                >
                                    Go to Cart
                                </div> */}
                            </div>
                        </>
                    ) : (
                        <div className="user">
                            <p className="name">{`${pageUser?.username}`}</p>
                            <p className="text">See their items</p>
                        </div>
                    )}

                    <div className="section">
                        {sectionShow === "items" && <Items pageId={pageId} />}
                        {sectionShow === "sell" && <Sell pageId={pageId} />}
                        {sectionShow === "history" && <History />}
                        {/* {sectionShow === "cart" && <Cart />} */}
                    </div>
                </div>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin-block: 80px 301px;
    background-color: var(--theme2);
    flex-direction: column;
    align-items: center;

    .wrapper {
        width: 1200px;
        padding: 40px 15px;
        flex-direction: column;

        .user {
            width: 100%;

            .name {
                font-size: 20px;
                font-weight: 600;
                display: block;
                color: var(--theme);
                margin-bottom: 4px;
            }

            .text {
                font-size: 12px;
                font-weight: 300;
                letter-spacing: 1px;
                display: block;
                color: var(--theme3);
            }
        }

        .catebuttons {
            margin-top: 60px;
            gap: 24px;

            .button {
                cursor: pointer;
                height: 40px;
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
        }

        .section {
            margin-top: 24px;
            border-top: 1px solid var(--theme5);
        }
    }
`;

export default User;
