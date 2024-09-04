import React from 'react';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import "./aboutus.css";

function Aboutus() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="aboutus">
        <div className="aboutusCard">
          <h2>Welcome to Student Stay!</h2>
          <h3>
            At Student Stay, we understand the challenges of finding the perfect accommodation for your academic journey, whether it's for a few days or an entire semester. Our platform is dedicated to helping students find and rent rooms with ease and confidence.
          </h3>
          <p>
            <span>Why Choose Student Stay?</span><br />
            Convenient and Flexible: Whether you need a place to stay for a day, a week, or a month, we've got you covered. Our flexible rental options cater to your specific needs.
            <br /><br />
            Verified Listings: We ensure that all our listings are verified and safe, providing you with peace of mind as you search for your ideal room.
            <br /><br />
            User-Friendly Interface: Our easy-to-navigate website makes it simple to find and book accommodations. Filter by location, price, amenities, and more to find exactly what you're looking for.
            <br /><br />
            Community and Support: Join a community of students who share their experiences and reviews, helping you make informed decisions. Our dedicated support team is also here to assist you every step of the way.
            <br /><br />
            Discover your home away from home with Student Stay. Start your search today and find the perfect room that fits your needs and budget!
            <br /><br />
            Submit Your Listings: Have a room or property to rent out? You can send your listing details to us, and our admin team will review and upload it to the site. This ensures that all listings meet our quality standards, providing a trusted platform for both renters and landlords.
          </p>

          <div className="contactInfo">
            <h3>Contact Us</h3>
            <div className="contactItem">
              <i className="fas fa-envelope"></i>
              <p>Email: info@studentstay.com</p>
            </div>
            <div className="contactItem">
              <i className="fas fa-phone-alt"></i>
              <p>Phone: +123 456 7890</p>
            </div>
            <div className="contactItem">
              <i className="fas fa-map-marker-alt"></i>
              <p>Address: 4130 Student Stay Blvd, University City, USA</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Aboutus;
