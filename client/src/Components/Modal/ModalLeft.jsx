import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import Login from "../Auth/Login";
import UserTab from "./UserTab/UserTab";
import Help from "./Help/Help";
import Love from "./Love/Love";
import Cart from "./Cart/Cart";
import { Close } from "../Icon/Icon";

function ModalLeft({ setShow, modalType, text }) {
    // Ref
    const modalRef = useRef(null);
    const backRef = useRef(null);
    const timerRef = useRef(null);
    // Close modal
    const handleClose = () => {
        modalRef.current.classList.add("slideHide");
        backRef.current.classList.add("fadeOut");
        timerRef.current = setTimeout(() => {
            setShow(false);
        }, 500);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <Wrapper ref={backRef} onClick={() => handleClose()}>
            <div
                className="modal"
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="title d-flex space-between">
                    <span>{text}</span>
                    <div onClick={() => handleClose()}>
                        <Close />
                    </div>
                </div>
                {modalType === "login" && (
                    <Login handleClose={handleClose}  />
                )}
                {modalType === "usertab" && (
                    <UserTab handleClose={handleClose}  />
                )}
                {modalType === "help" && <Help />}
                {modalType === "love" && (
                    <Love handleClose={handleClose}  />
                )}
                {modalType === "cart" && (
                    <Cart handleClose={handleClose} type="header" />
                )}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
    top: -80px;
    z-index: 10;

    &::before {
        content: "";
        background-color: var(--theme);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 120vh;
        width: 100vw;
        opacity: 50%;
        animation: fadein 0.2s linear;
        transition: 0.2s linear;
    }

    .modal {
        position: absolute;
        width: 270px;
        height: 120vh;
        background-color: var(--theme2);
        right: 0;
        padding: 25px 20px;
        animation: slidetoleft 0.2s linear;
        transition: 0.2s linear;

        .title {
            margin-bottom: 10px;

            span {
                font-size: 15px;
            }

            div {
                width: 20px;
                height: 20px;
            }

            svg {
                width: 20px;
                height: 20px;
                cursor: pointer;
            }
        }
    }
`;
export default ModalLeft;
