import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import axios from 'axios';
import { server } from '../server';
import '../css/guide/gsignup.css';
import { useNavigate } from 'react-router-dom';

function GuideSignup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handlesubmit = (event) => {
    
    event.preventDefault();
    const data = [values.name, values.email, values.password];
    console.log(values);
    axios.post(`${server}/signup-guide`, data)
      .then(res => {
        alert("Registration successful! Click to log in.");
        navigate('/login-guide')
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow-lg rounded overflow-hidden animate__animated animate__fadeIn">
        {/* Left Form Section */}
        <div className="col-md-6 bg-white p-5 animate__animated animate__fadeInLeft">
          <h2 className="text-center mb-4 text-success">Guide Sign-Up</h2>
          <form onSubmit={handlesubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label"><strong>Name</strong></label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="form-control"
                value={values.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label"><strong>Email</strong></label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="form-control"
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label"><strong>Password</strong></label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="form-control"
                value={values.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 animate__animated animate__pulse animate__infinite">
              Sign Up
            </button>

            <p className="text-muted text-center mt-2 mb-1">By signing up, you agree to our terms and policies.</p>

            <a href="/login-guide" className="btn btn-outline-secondary w-100 mt-2">
              Already have an account? Log In
            </a>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="col-md-6 bg-success text-white d-flex flex-column justify-content-center align-items-center p-4 animate__animated animate__fadeInRight">
          <h1 className="mb-3 animate__animated animate__zoomIn">Welcome to Ghoomify</h1>
          <p className="text-center px-2 animate__animated animate__fadeInUp">
            Join us as a guide and connect with tourists looking for unique and local experiences!
          </p>
          <img
            src="https://img.freepik.com/free-vector/tour-vacation-guide-concept-tourists-listening-history-city-attractions-tour-entertainment-idea-traveling-learning-isolated-vector-illustration_613284-3036.jpg?size=626&ext=jpg"
            alt="Guide Experience"
            className="img-fluid rounded mt-3 animate__animated animate__zoomInUp"
            style={{ maxHeight: "300px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default GuideSignup;
