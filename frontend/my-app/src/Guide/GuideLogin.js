import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { server } from '../server';
import '../css/guide/glogin.css'; // Import your CSS file

function GuideLogin() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${server}/login-guide`, values)
      .then(res => {
        if (res.status === 200) {
          console.log("Login Successful");
          const guide_id = res.data.guide_id;
          localStorage.setItem('guide_id', guide_id);

          // Check if the profile exists
          axios.get(`${server}/guide-profile/${guide_id}`)
            .then(profileRes => {
              if (profileRes.data) {
                navigate(`/dashboard-guide/${guide_id}`);
              } else {
                navigate(`/insert-data/${guide_id}`);
              }
            })
            .catch(profileErr => {
              console.error('Error checking profile:', profileErr);
              navigate(`/insert-data/${guide_id}`);
            });
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) {
            alert('Incorrect password or username. Please try again.');
          } else if (err.response.status === 404) {
            alert('No account found with this information.');
          } else {
            alert('Login failed. Please try again later.');
          }
        } else if (err.request) {
          alert('No response from server. Please check your network connection.');
        } else {
          alert('An error occurred. Please try again.');
        }
      });
  };

    return (
      <div id='login-container'>
        <div id='login-box' className="animate__animated animate__fadeInDown">
          <div id='form-container' className="animate__animated animate__fadeInLeft">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type='text'
                  placeholder='Enter your Email'
                  name='email'
                  className='form-control rounded-0'
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <input
                  type='password'
                  placeholder='Enter your password'
                  name='password'
                  className='form-control rounded-0'
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
              <a href='/signup-guide' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none mt-4'>Register</a>
            </form>
          </div>
          <div id='info-container' className="animate__animated animate__fadeInRight">
            <h3>Welcome to Ghoomify</h3>
            <p>Your adventure starts here! Join us to explore amazing places.</p>
            <img src="https://img.freepik.com/free-vector/tour-vacation-guide-concept-tourists-listening-history-city-attractions-tour-entertainment-idea-traveling-learning-isolated-vector-illustration_613284-3036.jpg?size=626&ext=jpg&ga=GA1.1.513886729.1728120774&semt=ais_hybrid" alt="Explore" /> {/* Replace with your image path */}
          </div>
        </div>
      </div>
  );
  
  
}

export default GuideLogin;
