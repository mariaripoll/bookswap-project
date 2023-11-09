import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Review } from "../component/review";
import ModalReview from "../component/modal-review";
import BookSwapRequest from "../component/modal-bookswap";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";


import "../../styles/bookdetails.css";

export const BookDetails = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [bookInfo, setBookInfo] = useState({});

	useEffect(() => {
		actions.getBookInformationById(params.id, setBookInfo)
	}, [])

	console.log('id', params.id)

	return (
		<div className="container bookdetails">
			<ModalReview />
			<BookSwapRequest />
			<div className="container d-flex justify-content-center">
				<div className="bookcover col-md-6 text-center">
					<img className="bookcoverimg" src={bookInfo.cover_img} />
				</div>

				<div className="bookdetails col-md-6">
					<div className="book">
						<h1>{bookInfo.title}</h1>
						<h5>{bookInfo.author}</h5>
						<p>{bookInfo.avg_rating} Stars - Total Reviews({bookInfo.total_ratings})</p>
						<p>{bookInfo.description}</p>
						<h5>{bookInfo.display_name}</h5>
					</div>


					<div className="d-flex col-12 justify-content-center">
						<div className="container-fluid py-5">
						<button type="button" className="btn btn-request-swap" data-bs-toggle="modal" data-bs-target="#bookSwapModal">
							<i className="far fa-paper-plane"></i> Request Swap
						</button>
						</div>
						<div className="container-fluid py-5">
							<a href="/create-account" className="btn btn-add-wishlist" role="button"><i class="far fa-heart"></i> Add to Wishlist</a>
						</div>
						<div className="container-fluid py-5">
							<button type="button" className="btn btn-review-book" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"><i class="far fa-star"></i> Review Book</button>
						</div>
					</div>
				</div>
			</div>

			<div className="container my-5 col-9">
				<h2 className="text-center">Ratings & Reviews</h2>
				<Review />
				<Review />
				<Review />
			</div>
		</div>
	);
};

export default BookDetails; 