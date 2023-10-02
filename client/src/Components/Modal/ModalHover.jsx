import React from "react";

import styled from "styled-components";
import Men from "./Hover/Men";

function ModalHover({ modalType }) {
    return (
        <Wrapper>
            <Men />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    cursor: default;
    width: 1200px;
    height: 100%;
    padding: 40px 15px;
`;

export default ModalHover;
