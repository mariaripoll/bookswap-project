import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import "../../styles/modalreview.css";

const ModalReview = ({ bookId }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const ratingChanged = (newRating) => {
        console.log("Rating changed:", newRating); // Debug log
        setRating(newRating);
    };

    const handleReviewTextChange = (event) => {
        console.log("Review text changed:", event.target.value); // Debug log
        setReviewText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Construct the review data
        const reviewData = {
            rating: rating,
            review: reviewText
        };
    
        // The backend URL and route
        const backendUrl = 'https://scaling-waddle-xjv7gpv499xfvpxx-3001.app.github.dev';
        const apiRoute = `/admin/reviews/books/${bookId}/review`; // Adjust if your route is different
    
        // Call your API with the rating and review text
        try {
            const response = await fetch(`${backendUrl}${apiRoute}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` // Replace with actual token retrieval method
                },
                body: JSON.stringify(reviewData)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data);
            // Additional logic after successful submission (e.g., close modal, show message)
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };
    

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Write your review</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="ReactStars" className="col-form-label">Rate this book:</label>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">What do you think about the book?</label>
                                <textarea
                                    className="form-control"
                                    id="message-text"
                                    value={reviewText}
                                    onChange={handleReviewTextChange}
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-close-review" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-send-review">Send review</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalReview;
