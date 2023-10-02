import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import { CREATE_REVIEW, GET_REVIEW } from "../../../Store/Action/action";

import Review from "./Review";

function Reviews({ id }) {
    // Setup
    const dispatch = useDispatch();
    // Store
    const { user } = useSelector((state) => state.authReducer);
    const data = useSelector((state) => state.reviewsReducer);
    const { reviews } = data;
    // State
    const [reviewsList, setReviewsList] = useState([]);
    const [input, setInput] = useState("");

    // createReviews
    const createReviews = () => {
        if (user !== null && input) {
            const review = {
                itemId: id,
                userId: user?._id,
                content: input,
            };

            dispatch({ type: CREATE_REVIEW, payload: review });

            setReviewsList([
                {
                    _id: Math.random(),
                    userId: user?._id,
                    content: input,
                    username: user?.username,
                },
                ...reviews,
            ]);

            dispatch({ type: GET_REVIEW, payload: id });
        }
    };

    return (
        <Wrapper>
            <div className="inputBox d-flex">
                <textarea
                    className="input"
                    type="text"
                    placeholder="Write your review here..."
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
                <div className="buttons" onClick={() => createReviews()}>
                    <p>Send</p>
                </div>
            </div>
            <div className="reviewsBox d-flex">
                {reviewsList.length > 0
                    ? reviewsList?.slice(0, 4)?.map((item) => {
                          return <Review item={item} key={item?._id} />;
                      })
                    : reviews?.slice(0, 4)?.map((item) => {
                          return <Review item={item} key={item?._id} />;
                      })}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 1200px;
    border-top: 1px solid var(--theme3);
    padding: 40px 15px;

    .inputBox {
        flex-direction: column;
        align-items: start;
        justify-content: space-between;

        .input {
            width: 100%;
            height: 100px;
            margin-bottom: 16px;
            background-color: var(--theme5);
            outline: none;
            border: 1px solid var(--theme3);
            padding: 16px;
            &::placeholder {
                color: var(--theme3);
            }

            &:focus {
                background-color: var(--theme2);
            }
        }
        .buttons {
            height: 40px;
            width: 10%;
            text-align: center;
            cursor: pointer;
            background-color: var(--theme);
            border: 1px solid var(--theme);
            transition: 0.2s ease-in;
            overflow: hidden;
            position: relative;
            color: white;
            p {
                color: var(--theme2);
                font-size: 13px;
                transition: 0.2s ease-in;
                line-height: 40px;
            }

            &:hover {
                background-color: var(--theme2);
                border: 1px solid var(--theme);

                p {
                    color: var(--theme);
                }
            }
        }
    }

    .reviewsBox {
        margin-top: 32px;
        border-top: 1px solid var(--theme3);
        flex-direction: column;

        .review {
            padding-block: 10px 20px;
            border-bottom: 1px solid var(--theme5);

            .name {
                font-size: 16px;
                color: var(--theme);
                font-weight: 500;
                margin-bottom: 10px;
            }

            .content {
                font-size: 14px;
                color: var(--theme);
            }
        }
    }
`;

export default Reviews;
