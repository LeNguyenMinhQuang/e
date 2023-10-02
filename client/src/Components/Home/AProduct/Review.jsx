import React from "react";

function Review({ item }) {
    return (
        <div className="review">
            <p className="name">{item?.username}</p>
            <p className="content">{item?.content}</p>
        </div>
    );
}

export default Review;
