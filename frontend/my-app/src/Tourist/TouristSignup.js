import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { server } from '../server';
import '../css/tourist/tsignup.css';

function TouristSignup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    const data = [values.name, values.email, values.password];
    console.log(values);
    axios.post(`${server}/signup-tourist`, data)
      .then(res => {
        console.log("Registration successfully");
        alert("Registration successfully ... click for log in");
      })
      .catch(err => console.log(err));
  };

  return (
    <>
     <div className="signupTop">
        <h1>Welcome on Ghoomify</h1>
      </div>
    <div className="signup-container d-flex vw-100 justify-content-center align-items-center">
     
      <div className="rectangle-box d-flex">
        {/* Signup Box */}
        <div id='signup-box' className='bg-white p-4 rounded-left'>
          {/* <h2>Sign-Up</h2> */}
          <form onSubmit={handlesubmit}>
            <div className="mb-3">
              <label htmlFor="name"><strong>Name</strong></label>
              <input 
                type='text' 
                placeholder='Enter your name' 
                name='name' 
                className='form-control rounded-0' 
                value={values.name} 
                onChange={handleChange} 
              />
            </div>
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
            <button type='submit' className='btn btn-success w-100 rounded-0'>Sign-Up</button>
            <p>You agree to our terms and policies</p>
            <a href='/login-tourist' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log-in</a>
          </form>
        </div>

        {/* Right Side with Heading, Text, and Images */}
        <div className='info-box bg-light p-4 rounded-right'>
          <h2>Welcome to Our Adventure!</h2>
          <p>Join our community of travelers and explore the world like never before.</p>
          <img 
            src="https://img.freepik.com/free-vector/tour-vacation-guide-illustration_1284-16528.jpg?size=626&ext=jpg" 
            alt="Adventure" 
            className='img-fluid rounded mb-3'
          />
          <p>With expert local guides, you can discover hidden gems and experience unforgettable journeys.</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default TouristSignup;
