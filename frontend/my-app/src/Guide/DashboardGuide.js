import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import UpdateBookingStatus from './UpdateBookingStatus';
import '../css/guide/DashboardGuide.css';
import { server } from '../server';
import { format } from 'date-fns';

function DashboardGuide() {
  const { guide_id } = useParams();
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${server}/guide-profile/${guide_id}`)
      .then(response => setProfile(response.data))
      .catch(err => setError('Failed to fetch profile data.'));

    axios.get(`${server}/guide-bookings/${guide_id}`)
      .then(response => setBookings(response.data))
      .catch(err => setError('Failed to fetch bookings.'));
  }, [guide_id]);

  const handleEditProfile = () => {
    navigate(`/edit-profile/${guide_id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('guide_id');
    navigate('/login-guide');
  };

  const handlesupport = () => {
    navigate('/support');
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-guide">
      <div className="support-button-container">
      <h2 className="dashboard-title" style={{alignSelf:'center', justifySelf:'center',width:'100vw',height:'100%'}}>Dashboard</h2>
        <button onClick={handlesupport} className="support-button">
          Support
        </button>
      </div>
      
      {profile ? (
        <div className="profile-section">
          <img src={profile.profile_picture} alt="Profile" className="profile-image" />
          <h3 className="profile-name">Name: {profile.name}</h3>
          <p className="profile-location">Location: {profile.location}</p>
          <p className="profile-contact">Contact Number: {profile.contact_number}</p>
          <p className="profile-bio">Bio: {profile.bio}</p>
          <p className="profile-rating">Rating: {profile.rating}</p>
          
          {/* Container for buttons */}
          <div className="profile-button-container">
            <button onClick={handleEditProfile} className="btn btn-primary">Edit Profile</button>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      <h3 className="bookings-title">Your Bookings</h3>
      {bookings.length > 0 ? (
        bookings.map(booking => (
          <div key={booking.booking_id} className="booking-card">
            {booking.status !== "declined" && booking.status !== "completed" && (
              <>
                <p className="booking-tourist-id"><strong>Tourist ID:</strong> {booking.tourist_id}</p>
                <p className="booking-date"><strong>Booking Date:</strong> {format(new Date(booking.booking_date), 'Pp')}</p>
                <p className="booking-status"><strong>Status:</strong> {booking.status}</p>
                <UpdateBookingStatus booking_id={booking.booking_id} />
              </>
            )}
          </div>
        ))
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
}

export default DashboardGuide;
