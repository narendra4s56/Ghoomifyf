import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { server } from '../server';
import '../css/tourist/tsignup.css';
import 'animate.css';
import { useNavigate } from 'react-router-dom';


function TouristSignup() {
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
    axios.post(`${server}/signup-tourist`, data)
      .then(res => {
        console.log("Registration successfully");
        alert("Registration successful! Click OK to proceed to login.");
        navigate('/login-tourist')
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className="text-center mt-5 animate__animated animate__fadeInDown">
        <h1 className="fw-bold">Welcome to <span className="text-success">Ghoomify</span></h1>
        <p className="text-muted">Join us and start your adventure today</p>
      </div>

      <div className="container my-4 d-flex justify-content-center align-items-center animate__animated animate__fadeInUp">
        <div className="row shadow-lg rounded-4 overflow-hidden w-100" style={{ maxWidth: '1000px' }}>
          {/* Form Side */}
          <div className="col-md-6 bg-white p-5">
            <form onSubmit={handlesubmit}>
              <h3 className="mb-4 text-success fw-bold text-center">Create Account</h3>

              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">Name</label>
                <input
                  type='text'
                  placeholder='Enter your name'
                  name='name'
                  className='form-control rounded-3 shadow-sm'
                  value={values.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                <input
                  type='email'
                  placeholder='Enter your Email'
                  name='email'
                  className='form-control rounded-3 shadow-sm'
                  value={values.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold">Password</label>
                <input
                  type='password'
                  placeholder='Enter your password'
                  name='password'
                  className='form-control rounded-3 shadow-sm'
                  value={values.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type='submit' className='btn btn-success w-100 rounded-3 py-2 fw-semibold'>
                Sign Up
              </button>

              <p className="text-center mt-3 text-muted">
                By signing up, you agree to our <a href="#" className="text-decoration-none">Terms & Policies</a>.
              </p>

              <div className="text-center mt-2">
                <a href='/login-tourist' className='btn btn-outline-secondary w-100 rounded-3'>
                  Already have an account? Log in
                </a>
              </div>
            </form>
          </div>

          {/* Info Side */}
          <div className="col-md-6 bg-light p-4 d-flex flex-column justify-content-center align-items-center text-center">
            <h2 className="text-success">Adventure Awaits!</h2>
            <p className="text-dark px-3">Join our community and explore the world like never before with local guides.</p>
            <img
              src="https://img.freepik.com/free-vector/tour-vacation-guide-illustration_1284-16528.jpg?size=626&ext=jpg"
              alt="Adventure"
              className='img-fluid rounded shadow-sm mb-3'
              style={{ maxHeight: '250px' }}
            />
            <p className="text-dark px-3">Discover hidden gems and unforgettable journeys.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TouristSignup;
