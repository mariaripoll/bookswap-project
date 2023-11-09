import React, { Component, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "../../styles/review.css";

export const Review = ({ userName, rating, content }) => {

    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
    
    return (
        <div className="d-flex flex-row bd-highlight mb-3 col-10 align-items-center">
            <div className="px-2 bd-highlight">{userName} rated this book</div>
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
                value={rating}
                edit={false}
            />
            <div className="px-2 bd-highlight">{rating}</div>
            <div className="row">
                <p>"{content}"</p>
            </div>
        </div>
    )
};

export default Review;