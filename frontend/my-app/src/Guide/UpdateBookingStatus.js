import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../server';

function UpdateBookingStatus({ booking_id }) {
  const [status, setStatus] = useState('pending');

  const handleStatusChange = (newStatus) => {
    axios.put(`${server}/bookings/${booking_id}`, { status: newStatus })
      .then(res => {
        if (res.data.success) {
          alert(`Booking status updated to ${newStatus}!`);
          setStatus(newStatus);
        }
      })
      .catch(err => {
        console.error(err);
        alert('Failed to update booking status.');
      });
  };

  return (
    <div>
      <p>Current Status: {status}</p>
      <button onClick={() => handleStatusChange('accepted')} className="btn btn-primary">Accept</button>
      <button onClick={() => handleStatusChange('declined')} className="btn btn-danger">Decline</button>
      <button onClick={() => handleStatusChange('completed')} className="btn btn-info">Complete</button>
    </div>
  );
}

export default UpdateBookingStatus;
