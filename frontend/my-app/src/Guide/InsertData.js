import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { server } from '../server';
import '../css/guide/insertData.css';

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
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!profile.location || !profile.profile_picture || !profile.contact_number || !profile.bio || !profile.rating) {
      setError('All fields are required.');
      return false;
    }
    if (profile.bio.length > 1000) {
      setError('Bio must be under 1000 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await axios.post(`${server}/insert-profile/${guide_id}`, profile);
      setSuccess('Profile inserted successfully!');
      setTimeout(() => navigate(`/dashboard-guide/${guide_id}`), 1500);
    } catch (err) {
      console.error('Error inserting profile:', err);
      setError('Failed to insert profile data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="insert-data">
      <h2>Insert Profile Data</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

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
          {profile.profile_picture && (
            <div className="image-preview">
              <img src={profile.profile_picture} alt="Preview" className="preview-image" />
            </div>
          )}
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
            rows="4"
            maxLength={1000}
          />
          <small>{profile.bio.length}/1000 characters</small>
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

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default InsertData;
