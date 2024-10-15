import React, { useState } from 'react';
import axios from 'axios';
import './SearchGuide.css';
import { server } from '../server';
import { useParams } from 'react-router-dom';

function SearchGuide() {
  const [location, setLocation] = useState('');
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();

    axios.get(`${server}/search-guides?location=${location}`)
      .then(res => {
        if (res.status === 200) {
          setGuides(res.data);
        }
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch guides.');
      });
  };

  const handleBooking = (guide_id) => {
    // const tourist_id = useParams();
    const tourist_id = localStorage.getItem('tourist_id'); // Assuming tourist_id is stored in local storage
    axios.post(`${server}/book-guide`, { guide_id, tourist_id })
      .then(res => {
        if (res.status === 200) {
          alert('Guide booking is pending for approval.');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Failed to book guide.');
      });
  };

  return (
    <div className="search-guide-container">
      <h2>Search Guides by Location</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="guides-list">
        {guides.length > 0 ? (
          guides.map(guide => (
            <div key={guide.guide_id} className="guide-card">
              <img src={guide.profile_picture} alt="Profile" className="profile-picture" style={{ width: '50px', height: '50px', borderRadius: '50%' }}/>
              <h3>{guide.name}</h3>
              <p><strong>Location:</strong> {guide.location}</p>
              {/* <p><strong>Contact:</strong> {guide.contact_number}</p> */}
              <p><strong>Bio:</strong> {guide.bio}</p>
              <p><strong>Rating:</strong> {guide.rating}</p>
              <button 
                onClick={() => handleBooking(guide.guide_id)} 
                className="btn btn-success"
              >
                Book Guide
              </button>
            </div>
          ))
        ) : (
          <p>No guides found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchGuide;
