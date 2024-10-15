import React, { useState } from "react";
import './Support.css'; // Custom styling file
import { server } from "./server";
import { useNavigate } from "react-router-dom";
import HomePage from "./Home";

const Support = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    message: "",
  });

  const helpEmail = "support@ghoomify.com";
  const whatsappNumber = "+919302491596"; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the form data to the backend (modify the URL based on your backend)
    try {
      const response = await fetch(`${server}/support`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your support request has been submitted!");
        setFormData({
          name: "",
          email: "",
          category: "General Inquiry",
          message: "",
        });
        navigate('/'); 
      } else {
        alert("There was a problem submitting your request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting support request:", error);
      alert("There was an error. Please try again.");
    }
  };

  // WhatsApp redirect function
  const handleWhatsAppRedirect = () => {
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=Hello%20Ghoomify%20Support,%20I%20need%20help%20with...`;
    window.open(whatsappURL, "_blank"); // Opens WhatsApp in a new tab with the custom message
  };

  return (
    <div className="support-container">
      <h2>Support</h2>
      
      <div className="help-center-info">
        <p>Welcome to the Ghoomify Help Center! Our support team is here to assist you with any queries or issues you may have. Feel free to reach out to us via the form below, email, or WhatsApp.</p>
        <p><strong>Email:</strong> <a href={`mailto:${helpEmail}`}>{helpEmail}</a></p>
        <p><strong>WhatsApp:</strong> <a onClick={handleWhatsAppRedirect} className="whatsapp-link">{whatsappNumber}</a></p>
      </div>

      <form onSubmit={handleSubmit} className="support-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Technical Issue">Technical Issue</option>
            <option value="Billing">Billing</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>

      </form>

      <div className="whatsapp-section">
        <h4>Need Quick Help? Contact Us on WhatsApp</h4>
        <button onClick={handleWhatsAppRedirect} className="whatsapp-button">
          Contact on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default Support;
