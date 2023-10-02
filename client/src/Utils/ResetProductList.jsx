import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

import { RESET_PRODUCT_LIST } from "../Store/Action/action";

const RESETPRODUCTLIST = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch({ type: RESET_PRODUCT_LIST });
    }, [location]);

    return <>{props.children}</>;
};

export default RESETPRODUCTLIST;
