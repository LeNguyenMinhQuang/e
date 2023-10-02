import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { USER_LOGOUT } from "../../../Store/Action/action";

function UserTab({ handleClose }) {
    // Setup
    const dispatch = useDispatch();
    // Store
    const { user } = useSelector((state) => state.authReducer);
    // Signout
    const handleSignOut = () => {
        dispatch({ type: USER_LOGOUT });
        handleClose();
    };
    return (
        <Wrapper className="d-flex">
            <p className="name">Hello, {user?.username}</p>
            <img
                src={
                    user?.image ||
                    "https://res.cloudinary.com/quangcloud/image/upload/v1655714275/Shella/rxrwpy9deegq3rlf9f2j.png"
                }
            />
            <Link
                style={{ textDecoration: "none" }}
                to={`user/${user?._id}`}
                className="button d-flex center"
            >
                GO TO YOUR PAGE
            </Link>
            <div
                className="button d-flex center white"
                onClick={() => handleSignOut()}
            >
                SIGN OUT
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    flex-direction: column;

    .name {
        font-weight: 500;
    }

    img {
        margin-block: 20px;
        height: 150px;
        width: 150px;
        align-self: center;
    }

    .button {
        cursor: pointer;
        height: 40px;
        width: 100%;
        background-color: var(--theme);
        border: 1px solid var(--theme);
        color: var(--theme2);
        transition: 0.2s ease-in;
        font-size: 13px;
        margin-bottom: 20px;

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

export default UserTab;
