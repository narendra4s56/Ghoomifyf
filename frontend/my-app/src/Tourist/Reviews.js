import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../server';
import './Review.css'; // Import your CSS

const Reviews = () => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const { bookingId } = useParams(); // Retrieve the bookingId from the URL
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewData = { booking_id: bookingId, rating, comment };

        const response = await fetch(`${server}/reviews/${bookingId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        });

        if (response.ok) {
            // Clear the form fields
            setRating(1);
            setComment('');

            // Redirect to the homepage after submitting the review
            navigate('/'); // Redirect to home page
        }
    };

    return (
        <div className="review-form-container">
            <h2 className="review-form-title">Submit Your Review for {bookingId}</h2>
            <form onSubmit={handleSubmit} className="review-form">
                <label className="review-form-label">
                    Rating:
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="review-form-select"
                    >
                        {[1, 2, 3, 4, 5].map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="review-form-label">
                    Comment:
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="review-form-textarea"
                        required
                    />
                </label>
                <button type="submit" className="review-form-button">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default Reviews;
