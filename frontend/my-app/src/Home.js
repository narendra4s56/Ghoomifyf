import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Home.css'
import Support from './Support';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    console.log(`Selected role: ${role}`);
    // Redirect or perform action based on selected role
    if (role === 'Tourist') {
      window.location.href = '/signup-tourist';
    } else if (role === 'Guide') {
      window.location.href = '/signup-guide';
    }
  };

  const handlesupport = () => {
    navigate('/support');
  }

  return (
    <div>
      {/* Hero Section with Background Image */}
     
      <section
        className="text-white text-center py-5"
        style={{
          backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/08/01/21/49/architecture-2568171_1280.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
        }}
      >
            <div style={{ display: 'flex', justifyContent: 'end'}}>
                 <button onClick={handlesupport} style={{ justifySelf: 'end', margin:'20px' }}>
                     Support
                 </button>
            </div>
         {/* <button onClick={handlesupport} style={{justifySelf:'end'}}>Support</button> */}
        <div className="container d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="display-4 font-weight-bold">Discover Your Next Adventure</h1>
          <p className="lead">Explore the world with expert local guides. Your journey starts here.</p>

          {/* Start Your Journey Dropdown */}
          <div className="dropdown mt-3">
            <button
              className="btn btn-warning btn-lg dropdown-toggle"
              type="button"
              id="startJourneyDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Start Your Journey
            </button>
            <ul className="dropdown-menu" aria-labelledby="startJourneyDropdown">
              <li>
                <button className="dropdown-item" onClick={() => handleRoleSelect('Tourist')}>
                  As a Tourist
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleRoleSelect('Guide')}>
                  As a Guide
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>


         
      {/* Features Section */}

      <section className="py-5 bg-light">
        <div className="container">
          <div id='home-3boxes' className="row text-center">
            <div  className="col-md-4">
              <img src="https://img.freepik.com/free-vector/domain-names-concept-illustration_114360-3808.jpg?ga=GA1.1.513886729.1728120774&semt=ais_hybrid" alt="Virtual Guides" className="mb-3" />
              <h5 className="card-title">Virtual Guides</h5>
              <p className="card-text">Connect with local experts online for a personalized experience.</p>
            </div>
            <div className="col-md-4">
              <img src="https://img.freepik.com/free-vector/travel-guide-mobile-app-illustration_335657-424.jpg?t=st=1728124611~exp=1728128211~hmac=30051504377e54394d52b29b23e2d10472cdea2511a96fd4c65507fa3b19b3ac&w=740" alt="Tailored Itineraries" className="mb-3" />
              <h5 className="card-title">Tailored Itineraries</h5>
              <p className="card-text">Get customized travel plans to make the most of your trip.</p>
            </div>
            <div className="col-md-4">
              <img src="https://media.istockphoto.com/id/1814261686/photo/3d-render-speech-bubble-talk-isolated-on-transparent-background-png-file-format.jpg?s=612x612&w=0&k=20&c=8rcgFSYPwf5-9oqA6rFTG4Y6oIsegkBtplhZYmVaBjM=" alt="Real-Time Support" className="mb-3" />
              <h5 className="card-title">Real-Time Support</h5>
              <p className="card-text">Receive on-the-go assistance and tips from local guides.</p>
            </div>
          </div>
        </div>
      </section>






      {/* Call to Action Section with Dropdown */}
      <section className="bg-secondary text-white text-center py-5">
        <div className="container">
          <h2>Are You Ready to Explore?</h2>
          <p className="lead">Join us today and start planning your dream vacation.</p>

          {/* Sign Up Dropdown */}
          <div className="dropdown mt-3">
            <button
              className="btn btn-primary btn-lg dropdown-toggle"
              type="button"
              id="signupDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sign Up Now
            </button>
            <ul className="dropdown-menu" aria-labelledby="signupDropdown">
              <li>
                <button className="dropdown-item" onClick={() => handleRoleSelect('Tourist')}>
                  As a Tourist
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleRoleSelect('Guide')}>
                  As a Guide
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;
