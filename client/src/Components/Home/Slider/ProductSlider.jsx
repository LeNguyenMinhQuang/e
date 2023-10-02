import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import ProductCard from "../../ProductCard/ProductCard";

function ProductSlider() {
    // Store
    const { products } = useSelector((state) => state.productReducer);

    return (
        <Wrapper>
            <div className="title">NEW PRODUCT</div>
            <Swiper
                modules={[Pagination, Autoplay]}
                breakpoints={{
                    0: {
                        slidesPerView: 4,
                    },
                }}
                autoplay
                pagination={{ clickable: true }}
                className="swiper"
            >
                {products?.map((product, index) => {
                    return (
                        product.new && (
                            <SwiperSlide key={index}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        )
                    );
                })}
            </Swiper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 1200px;
    margin-bottom: 100px;

    .title {
        color: var(--theme);
        text-align: center;
        height: 40px;
        margin-bottom: 25px;
    }

    .swiper {
        z-index: 0;
        .swiper-pagination {
            bottom: 0 !important;

            .swiper-pagination-bullet-active {
                background-color: var(--theme) !important;
            }
        }
    }
`;

export default ProductSlider;
