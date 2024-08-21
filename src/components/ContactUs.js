import React from 'react';
import '../styles/ContactUs.css'; // Create this CSS file for styling
import { FaPhone, FaCommentDots, FaVideo, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="contact-section">
      <div className="contact-info">
        <p className="contact-title">Easy to contact us</p>
        <p className="contact-description">
          We are always ready to help by providing the best services for you. We believe a good place to live can make your life better.
        </p>

        <div className="contact-methods">
          <div className="contact-method">
            <FaPhone className="contact-icon" />
            <h3>Call</h3>
            <p>021 123 145 14</p>
            <button className="contact-button">Call now</button>
          </div>
          <div className="contact-method">
            <FaCommentDots className="contact-icon" />
            <h3>Chat</h3>
            <p>021 123 145 14</p>
            <button className="contact-button">Chat now</button>
          </div>
          <div className="contact-method">
            <FaVideo className="contact-icon" />
            <h3>Video Call</h3>
            <p>021 123 145 14</p>
            <button className="contact-button">Video Call now</button>
          </div>
          <div className="contact-method">
            <FaEnvelope className="contact-icon" />
            <h3>Message</h3>
            <p>021 123 145 14</p>
            <button className="contact-button">Message now</button>
          </div>
        </div>
      </div>
      <div className="contact-image">
        <img src="../images/contactUS.jpg" alt="Property" width="800px" height="700px"/>
      </div>
    </div>
  );
};

export default ContactUs;
