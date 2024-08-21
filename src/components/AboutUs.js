import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Header Section */}
      <section className="header-section">
        <div className="overlay">
          <h1>About us</h1>
          <p>Welcome to Real Estate, your reliable partner in real estate management. Our platform simplifies buying, selling, and renting properties by connecting clients with agents and listings in an easy-to-use format. We prioritize transparency and exceptional service, ensuring that everyone—from first-time buyers to seasoned investors—can navigate the real estate market with confidence. Join us as we transform the real estate experience for all.
</p>
        </div>
      </section>

     
      {/* Meet Our Team Section */}
      <section className="meet-team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="../images/Shruti1.jpg" alt="Team Member" />
            <h3>Shruti Tiwari</h3>
            <p>Chief Executive Officer</p>
          </div>
          <div className="team-member">
            <img src="../images/Nikita1.jpg" alt="Team Member" />
            <h3>Nikitha</h3>
            <p>Chief Strategy Officer</p>
          </div>
          <div className="team-member">
            <img src="/images/hafsa.jpg" alt="Team Member" />
            <h3>Hafsa</h3>
            <p>Chief Marketing Officer</p>
          </div>
          <div className="team-member">
            <img src="/images/Thiriksha.jpg" alt="Team Member" />
            <h3>Thiricksha</h3>
            <p>Chief Technology Officer</p>
          </div>
          <div className="team-member">
            <img src="/images/Saro1.jpg" alt="Team Member" height={192}/>
            <h3>Saravanan</h3>
            <p>Chief Operating Officer</p>
          </div>
          <div className="team-member">
            <img src="/images/sakshi.jpg" alt="Team Member" />
            <h3>Sakshi</h3>
            <p>Chief Marketing Officer</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="footer-section">
  
  <div className="footer">
    <div className="footer-col">
      <h4>Real Estate Systems</h4>
      <p>Contact Us: example@gmail.com</p>
      <p>Phone: (123) 456-7890</p>
    </div>
   
   
  </div>
</section>

    </div>
  );
};

export default AboutUs;
