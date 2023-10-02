import React from "react";
import styled from "styled-components";

function Help() {
    return (
        <Wrapper>
            <p>Name: Le Nguyen Minh Quang</p>
            <p>Email: minhquangle1102@gmail.com</p>
            <p>Source code:</p>
            <p>Link original: {<br />} https://shella-demo.myshopify.com/</p>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    p {
        line-height: 20px;
        margin-bottom: 8px;
        font-size: 13px;
        color: var(--theme3);
    }
`;

export default Help;
