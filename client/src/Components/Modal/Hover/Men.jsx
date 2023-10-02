import React from "react";

import styled from "styled-components";

function Men() {
    const clothings = [
        "Coats",
        "Jackets",
        "Blazers",
        "Dresses",
        "Playsuits & Jumpsuits",
        "Trousers",
        "Jeans",
        "Knitwear",
        "Sweartshirts & Hoodies",
        "T-shirts",
        "Bodysuits",
        "Shirts",
        "Skirts",
        "Shorts",
    ];
    const shoes = [
        "Trainers",
        "Boots & Ankleboots",
        "Heels",
        "Flats",
        "Platforms",
        "Heeled Sandals",
    ];

    const accessories = [
        "Bags",
        "Backpacks",
        "Glasses",
        "Jewellery",
        "Earings",
        "iPhone Cases",
        "Gadgets",
        "Hats & Beanies",
        "Purses",
        "Belts",
        "Socks",
    ];
    return (
        <Wrapper className="d-flex">
            <div className="r-text d-flex">
                <div className="r-row">
                    <p className="category">Clothings</p>
                    {clothings.map((item) => {
                        return (
                            <div className="item" key={item}>
                                {item}
                            </div>
                        );
                    })}
                </div>
                <div className="r-row">
                    <p className="category">Shoes</p>
                    {shoes.map((item) => {
                        return (
                            <div className="item" key={item}>
                                {item}
                            </div>
                        );
                    })}
                </div>
                <div className="r-row">
                    <p className="category">Accessories</p>
                    {accessories.map((item) => {
                        return (
                            <div className="item" key={item}>
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="r-img">
                <div className="box">
                    <img
                        src="https://res.cloudinary.com/quangcloud/image/upload/v1655887527/Shella/jvbmlpgpzkdwn7oyx1u3.webp"
                        alt="pic1"
                    />
                    <div className="text d-flex center">
                        <p className="big">NEW IN</p>
                        <p className="small">Spring/Summer 2022 Collection</p>
                    </div>
                </div>
                <div className="box">
                    <img
                        src="https://res.cloudinary.com/quangcloud/image/upload/v1655887527/Shella/a9lajk7z0drwc2s85ux7.webp"
                        alt="pic2"
                    />
                    <div className="text d-flex center">
                        <p className="big">SALE & SPECIAL OFFERS</p>
                        <p className="small">Get up to 20% off</p>
                    </div>
                </div>
                <div className="box">
                    <img
                        src="https://res.cloudinary.com/quangcloud/image/upload/v1655887527/Shella/sxqozbcl1p7fzvliqhd1.webp"
                        alt="pic3"
                    />
                    <div className="text d-flex center">
                        <p className="big">FEATURED</p>
                        <p className="small">Popular items</p>
                    </div>
                </div>
                <div className="box">
                    <img
                        src="https://res.cloudinary.com/quangcloud/image/upload/v1655887527/Shella/pe42l4b7daclyw7o6tkp.webp"
                        alt="pic4"
                    />
                    <div className="text d-flex center">
                        <p className="big">COMING SOON</p>
                        <p className="small">Autumn/Winter 2022 Collection</p>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 100%;
    justify-content: space-between;
    gap: 24px;

    .r-text {
        gap: 24px;
        width: 50%;

        .r-row {
            width: calc((100% - 24px) / 3);

            .category {
                font-size: 16px;
                text-transform: uppercase;
                margin-bottom: 20px;
                color: var(--theme);
                font-weight: 400;
                cursor: pointer;
            }

            .item {
                height: 24px;
                font-size: 12px;
                padding: 6px 0;
                color: var(--theme3);
                transition: 0.2s ease-in;
                cursor: pointer;

                &:hover {
                    padding-left: 8px;
                    background-color: var(--theme5);
                    color: var(--theme);
                }
            }
        }
    }

    .r-img {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-items: end;
        align-content: center;
        width: 50%;
        gap: 16px 0;

        .box {
            width: 270.5px;
            height: 197.6px;
            position: relative;
            overflow: hidden;

            img {
                width: 100%;
                transition: 0.2s ease-in;
            }

            .text {
                position: absolute;
                width: 80%;
                height: 25%;
                background-color: rgba(255, 255, 255, 0.8);
                bottom: 10%;
                left: 50%;
                transform: translateX(-50%);
                flex-direction: column;

                .big {
                    font-size: 16px;
                    font-weight: 400;
                    margin-bottom: 4px;
                }

                .small {
                    font-size: 12px;
                    color: var(--theme3);
                }
            }

            &:hover {
                img {
                    transform: scale(1.2);
                }
            }
        }
    }
`;

export default Men;
