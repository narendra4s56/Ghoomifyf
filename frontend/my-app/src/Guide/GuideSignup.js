import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { server } from '../server';
import '../css/guide/gsignup.css'; // Ensure to import your CSS file

function GuideSignup() {
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
    axios.post(`${server}/signup-guide`, data)
      .then(res => {
        console.log("Registration successfully");
        alert("Registration successfully ... click for log in");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='rectangle'>
      <div className='left-half'>
        <div id='signup-box' className='bg-white p-3 rounded w-75'>
          {/* <h2 style={{color:'black'}}>Sign-Up</h2> */}
          <form onSubmit={handlesubmit}>
            <div className="mb-3">
              <label htmlFor="name"><strong>Name : </strong></label>
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
              <label htmlFor="email"><strong>Email :</strong></label>
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
              <label htmlFor="password"><strong>Create password :</strong></label>
              <input 
                type='text' 
                placeholder='Enter your password' 
                name='password' 
                className='form-control rounded-0' 
                value={values.password} 
                onChange={handleChange}
              />
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Sign-Up</button>
            <p>You agree to our terms and policies</p>
            <a href='/login-guide' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log-in</a>
          </form>
        </div>
      </div>
      <div className='right-half'>
        <h1>Welcome to Ghoomify</h1>
        <p>Join us as a guide and connect with tourists looking for unique experiences!</p>
        <img src='https://img.freepik.com/free-vector/tour-vacation-guide-concept-tourists-listening-history-city-attractions-tour-entertainment-idea-traveling-learning-isolated-vector-illustration_613284-3036.jpg?size=626&ext=jpg&ga=GA1.1.513886729.1728120774&semt=ais_hybrid' alt='Guide Experience' />
      </div>
    </div>
  );
}

export default GuideSignup;
