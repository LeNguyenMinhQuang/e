import React from "react";

import styled from "styled-components";

import Banner from "./Banner/Banner";
import Cate from "./Cate/Cate";
import Product from "./Product/Product";
import ProductSlider from "./Slider/ProductSlider";

function Home() {
    return (
        <Wrapper className="d-flex">
            <Banner />
            <Cate />
            <Product />
            <ProductSlider />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin-block: 80px 301px;
    background-color: var(--theme2);
    flex-direction: column;
    align-items: center;

    .banner {
        width: 100%;
        padding-top: 550px;
        background-image: url("https://res.cloudinary.com/quangcloud/image/upload/v1655972317/Shella/os4mc8adidsctftoqdho.webp");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        position: relative;

        .text {
            flex-direction: column;
            position: absolute;
            bottom: 20%;
            text-align: center;
            left: 50%;
            transform: translateX(-50%);
            cursor: default;

            .small {
                font-size: 13px;
                color: var(--theme3);
                margin-bottom: 20px;
            }

            .big {
                font-size: 48px;
                font-weight: 400;
                margin-bottom: 20px;
            }

            .sub {
                color: var(--theme3);
                margin-bottom: 20px;
            }

            .button {
                cursor: pointer;
                height: 40px;
                width: 60%;
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
        }
    }

    .cate {
        padding: 60px 15px 40px;
        width: 1200px;
        height: 400px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;

        .box {
            width: 370px;
            height: 270px;
            position: relative;
            overflow: hidden;
            cursor: pointer;

            img {
                width: 100%;
                transition: 0.2s ease-in;
            }

            .text.small {
                position: absolute;
                width: 80%;
                height: 10%;
                background-color: rgba(255, 255, 255, 0.8);
                top: 80%;
                left: 50%;
                transform: translateX(-50%);
                transition: 0.2s ease-in;
                overflow: hidden;
            }

            &:hover {
                img {
                    transform: scale(1.1);
                    transform-origin: center;
                }

                .text.small {
                    height: 0;
                    width: 0;
                }
            }

            .text.big {
                position: absolute;
                width: 0;
                height: 0;
                background-color: rgba(255, 255, 255, 0.8);
                bottom: 10%;
                left: 50%;
                transform: translateX(-50%);
                transition: 0.2s ease-in;
                overflow: hidden;
            }

            &:hover {
                img {
                    transform: scale(1.1);
                    transform-origin: center;
                }

                .text.small {
                    height: 0;
                    width: 0;
                }

                .text.big {
                    height: 80%;
                    width: 80%;
                }
            }
        }
    }
`;

export default Home;
