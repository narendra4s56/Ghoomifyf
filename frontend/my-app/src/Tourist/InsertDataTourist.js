import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { server } from '../server';
import '../css/tourist/tinsertData.css'

function InsertDataTourist() {
  const { tourist_id } = useParams();
  const [profile, setProfile] = useState({
    name: '',
    profile_picture: '',
    contact_number: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Insert profile data
      await axios.post(`${server}/insert-profile-tourist/${tourist_id}`, profile);
      // Redirect to DashboardTourist
      navigate(`/dashboard-tourist/${tourist_id}`);
    } catch (err) {
      console.error('Error inserting profile:', err);
      setError('Failed to insert profile data.');
    }
  };

  return (
    <div className="insert-data-container">
    <h2 className="insert-data-title">Insert Profile Data</h2>
    <form className="insert-data-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={profile.name}
        onChange={handleChange}
        required
        className="input-field"
      />
      <input
        type="text"
        name="profile_picture"
        placeholder="Profile Picture URL"
        value={profile.profile_picture}
        onChange={handleChange}
        required
        className="input-field"
      />
      <input
        type="text"
        name="contact_number"
        placeholder="Contact Number"
        value={profile.contact_number}
        onChange={handleChange}
        required
        className="input-field"
      />
      <button type="submit" className="submit-button">Submit</button>
    </form>
    {error && <p className="error-message">{error}</p>}
  </div>
  );
}

export default InsertDataTourist;
