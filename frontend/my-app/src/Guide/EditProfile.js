import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProfileGuide.css'
import { server } from '../server';

function EditProfile() {
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

  useEffect(() => {
    axios.get(`${server}/guide-profile/${guide_id}`)
      .then(response => setProfile(response.data))
      .catch(err => setError('Failed to fetch profile data.'));
  }, [guide_id]);

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`${server}/update-guide-profile/${guide_id}`, profile)
      .then(response => navigate(`/dashboard-guide/${guide_id}`))
      .catch(err => {
        setError('Failed to update profile.');
        console.error('Error:', err);
      });
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      {error && <p className="error-message text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={profile.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profile_picture">Profile Picture URL</label>
          <input
            type="text"
            id="profile_picture"
            name="profile_picture"
            value={profile.profile_picture}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact_number">Contact Number</label>
          <input
            type="text"
            id="contact_number"
            name="contact_number"
            value={profile.contact_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={profile.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Profile</button>
      </form>
    </div>
  );
}

export default EditProfile;
