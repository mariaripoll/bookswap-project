import React, { Component, useState } from "react";
import "../../styles/modalreview.css";

const BookSwapRequest = () => {


    return (
        <div className="modal fade" id="bookSwapModal" tabindex="-1" aria-labelledby="bookSwapModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="bookSwapModalLabel">Request Book Swap</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="message-text" className="col-form-label">Write a message to the book owner:</label>
                                <textarea className="form-control" id="message-text"></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-close-review" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-send-review">Send request</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookSwapRequest;