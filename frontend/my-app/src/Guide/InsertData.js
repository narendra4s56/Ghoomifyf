import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { server } from '../server';
import '../css/guide/insertData.css'; // Import the CSS file

function InsertData() {
  const { guide_id } = useParams();
  const [profile, setProfile] = useState({
    location: '',
    profile_picture: '',
    contact_number: '',
    bio: '',
    rating: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${server}/insert-profile/${guide_id}`, profile)
      .then(() => {
        navigate(`/dashboard-guide/${guide_id}`); // Redirect to dashboard after insertion
      })
      .catch(err => {
        console.error('Error inserting profile:', err);
        setError('Failed to insert profile data.');
      });
  };

  return (
    <div className="insert-data">
      <h2>Insert Profile Data</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="location"><strong>Location</strong></label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-control"
            value={profile.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profile_picture"><strong>Profile Picture URL</strong></label>
          <input
            type="text"
            id="profile_picture"
            name="profile_picture"
            className="form-control"
            value={profile.profile_picture}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact_number"><strong>Contact Number</strong></label>
          <input
            type="text"
            id="contact_number"
            name="contact_number"
            className="form-control"
            value={profile.contact_number}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bio"><strong>Bio</strong></label>
          <textarea
            id="bio"
            name="bio"
            className="form-control"
            value={profile.bio}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating"><strong>Rating</strong></label>
          <input
            type="number"
            id="rating"
            name="rating"
            className="form-control"
            value={profile.rating}
            onChange={handleChange}
            step="0.01"
            min="0"
            max="5"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default InsertData;
