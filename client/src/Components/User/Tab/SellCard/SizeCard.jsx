import React, { useState } from "react";

import styled from "styled-components";

function SizeCard({ size, setSize }) {
    const handleClick = (index, type) => {
        const tempSize = [...size];
        if (size[index][1] === false) {
            tempSize.splice(index, 1, [type, true]);
            setSize([...tempSize]);
        } else {
            tempSize.splice(index, 1, [type, false]);
            setSize([...tempSize]);
        }
    };

    return (
        <Wrapper className="d-flex">
            {size.map((item, index) => (
                <div
                    className={`${
                        item[1] === false ? "button" : "button selected"
                    }`}
                    key={item[0]}
                    onClick={() => handleClick(index, item[0])}
                >
                    {item[0]}
                </div>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin-top: 24px;
    gap: 12px;

    .button {
        display: block;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
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

    .selected {
        background-color: var(--theme);
        border: 1px solid var(--theme);
        color: var(--theme2);
        &:hover {
            background-color: var(--theme);
            border: 1px solid var(--theme);
            color: var(--theme2);
        }
    }
`;

export default SizeCard;
