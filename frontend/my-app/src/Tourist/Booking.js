// src/components/tourist/Booking.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Booking({ booking_id, status, tourist_id, guide_id }) {
    const navigate = useNavigate();

    const handleResponse = () => {
        if (status === 'accepted') {
            navigate(`/chat/${tourist_id}/${guide_id}`);
        } else {
            alert('Your booking request was declined. Please book another guide.');
        }
    };

    return (
        <button onClick={handleResponse}>Handle Booking Response</button>
    );
}

export default Booking;
