import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { server } from '../server';

function TouristHome() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guides, setGuides] = useState([]);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tourist profile data on component mount
    axios.get(`${server}/tourist-profile`)
      .then(res => setProfile(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    axios.post(`${server}/search-guides`, { date, time })
      .then(res => setGuides(res.data))
      .catch(err => console.log(err));
  };

  const handleProfileView = () => {
    navigate('/tourist-profile');
  };

  return (
    <div className="container mt-4">
      <h1>Welcome to Tourist Home</h1>

      <div className="mt-4">
        <h2>Search for Guides</h2>
        <form onSubmit={handleSearch}>
          <div className="mb-3">
            <label htmlFor="date" className="form-label"><strong>Date</strong></label>
            <input 
              type="date" 
              id="date" 
              className="form-control" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label"><strong>Time</strong></label>
            <input 
              type="time" 
              id="time" 
              className="form-control" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <div className="mt-4">
          <h2>Available Guides</h2>
          <ul className="list-group">
            {guides.map(guide => (
              <li key={guide.id} className="list-group-item">
                <strong>{guide.name}</strong> - Available at {guide.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <h2>Your Profile</h2>
        {profile && (
          <div>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <button className="btn btn-secondary" onClick={handleProfileView}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TouristHome;
