import React, { useState, useEffect } from "react";

import styled from "styled-components";

function Love() {
    const [loveList, setLoveList] = useState(
        localStorage.getItem("love") || []
    );

    return <Wrapper></Wrapper>;
}

const Wrapper = styled.div``;
export default Love;
