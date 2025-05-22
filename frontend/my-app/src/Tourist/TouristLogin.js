import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { server } from '../server';
import '../css/tourist/tlogin.css'


function TouristLogin() {
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
    axios.post(`${server}/login-tourist`, values)
      .then(res => {
        if (res.status === 200) {
          const { tourist_id } = res.data;
          localStorage.setItem('tourist_id', tourist_id);

          axios.get(`${server}/tourist-profile/${tourist_id}`)
            .then(profileRes => {
              if (profileRes.data) {
                navigate(`/dashboard-tourist/${tourist_id}`);
              } 
              // else {
              //   navigate(`/insert-data-tourist/${tourist_id}`);
              // }
            })
            .catch(err => {
              navigate(`/insert-data-tourist/${tourist_id}`);
            })
        }
      })
      .catch(err => {
        if (err.response) {
          switch (err.response.status) {
            case 401:
              alert('Incorrect password or username. Please try again.');
              break;
            case 404:
              alert('No account found with this information.');
              break;
            default:
              alert('Login failed. Please try again later.');
          }
        } else if (err.request) {
          alert('No response from server. Please check your network connection.');
        } else {
          alert('An error occurred. Please try again.');
        }
      });
  };

  return (<>
      <h1 className="text-center my-4 animate__animated animate__fadeInDown">Ghoomify</h1>

<div id='signup-container' className='d-flex justify-content-center align-items-center'>
  <div id='signup-box' className='d-flex animate__animated animate__zoomIn'>
    <div className='login-form'>
      <h2 className='text-success fw-bold'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email"><strong>Email</strong></label>
          <input
            type='email'
            placeholder='Enter your Email'
            name='email'
            className='form-control rounded-pill shadow-sm'
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password"><strong>Password</strong></label>
          <input
            type='password'
            placeholder='Enter your password'
            name='password'
            className='form-control rounded-pill shadow-sm'
            value={values.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-success w-100 rounded-pill shadow-sm'>Login</button>
        <a href='/signup-tourist' className='btn btn-outline-dark w-100 rounded-pill mt-3'>Register</a>
      </form>
    </div>
    <div className='image-section'>
      <img src='https://img.freepik.com/free-vector/guide-concept-illustration_114360-25411.jpg?size=626&ext=jpg' alt='Login Illustration' />
      <h3 className='mt-3 fw-bold'>Welcome to Ghoomify!</h3>
      <p>Discover amazing places with local guides.</p>
    </div>
  </div>
</div>

  </>
  );
}

export default TouristLogin;
