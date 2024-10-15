import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SearchGuide from './SearchGuide';
import Notifications from './Notification';
import { server } from '../server';
import '../css/tourist/TouristDashboard.css'; // Import the CSS file

const TouristDashboard = () => {
  const { tourist_id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [bookedTours, setBookedTours] = useState([]);
  const navigate = useNavigate();
  localStorage.setItem('tourist_id', tourist_id);

  // Fetch booked tours and profile data on component mount
  useEffect(() => {
    axios.get(`${server}/tourist-profile/${tourist_id}`)
      .then(response => {
        console.log('Profile data:', response.data);
        setProfile(response.data);
      })
      .catch(err => {
        console.log('Error fetching profile data:', err);
        setError('Failed to fetching profile data');
      });

    // Fetch the booked tours for the tourist
    axios.get(`/api/tourists/${tourist_id}/booked-tours`)
      .then(response => setBookedTours(response.data))
      .catch(error => console.error('Error fetching booked tours:', error));
  }, [tourist_id]);

  const handleEditProfile = () => {
    navigate(`/insert-data-tourist/${tourist_id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('tourist_id');
    navigate('/login-tourist');
  };

  const handleSupport = () => {
    navigate('/support');
  };

  return (
    <div className="tourist-dashboard-container">
      <div className="support-button-container">
        <button onClick={handleSupport} className="support-button">
          Support
        </button>
      </div>
      <h1 className="dashboard-title">Welcome</h1>
      <div className="dashboard-row">
        <div className="profile-card">
          <div className="card-header">Profile</div>
          <div className="card-body">
            {profile ? (
              <div className="profile-info">
                <img src={profile.profile_picture} alt="Profile" className="profile-image" />
                <h4 className="profile-name">{profile.name}</h4>
                <p className="profile-email"><strong>Email:</strong> {profile.email}</p>
                <p className="profile-phone"><strong>Phone:</strong> {profile.contact_number}</p>
              </div>
            ) : (
              <p>Loading profile...</p>
            )}
          </div>
          <div className="button-container">
            <button onClick={handleEditProfile} className="btn btn-primary">Edit Profile</button>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </div>
        
        <div className="booked-tours-card">
          <div className="card-header">Booked Tours</div>
          <div className="card-body">
            <table className="booked-tours-table">
              <thead>
                <tr>
                  <th>Tour Name</th>
                  <th>Date</th>
                  <th>Guide</th>
                </tr>
              </thead>
              <tbody>
                {bookedTours.length > 0 ? (
                  bookedTours.map(tour => (
                    <tr key={tour.tour_name + tour.tour_date}>
                      <td>{tour.tour_name}</td>
                      <td>{new Date(tour.tour_date).toLocaleDateString()}</td>
                      <td>{tour.guide_name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No booked tours</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Notifications />
      </div>
      <SearchGuide />
    </div>
  );
};

export default TouristDashboard;
