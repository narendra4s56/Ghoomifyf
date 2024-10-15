import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewHelper = ({ bookingId }) => {
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const navigate = useNavigate();

    // Load the visibility state from localStorage when the component mounts
    useEffect(() => {
        const buttonState = localStorage.getItem(`buttonVisibility-${bookingId}`);
        if (buttonState === 'false') {
            setIsButtonVisible(false); // Hide the button if previously clicked
        }
    }, [bookingId]);

    const handleReviewClick = () => {
        setIsButtonVisible(false); // Hide the button once clicked
        localStorage.setItem(`buttonVisibility-${bookingId}`, 'false'); // Store button state in localStorage
        navigate(`/review/${bookingId}`);
    };

    return (
        <div>
            {isButtonVisible && (
                <button onClick={handleReviewClick}>Go to Review for {bookingId}</button>
            )}
        </div>
    );
};

export default ReviewHelper;
