import React, { useState } from 'react';
import './footer.css';
import Popup from '../popup/popup.jsx'; // Import the Popup component

const Footer = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const currentYear = new Date().getFullYear();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(e.target);

        try {
            // Send the form data to Web3Forms API
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (result.success) {
                // Show the popup alert
                setFormSubmitted(true);
                // Optionally clear the form fields
                e.target.reset(); 
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("There was an error submitting the form. Please try again.");
        }
    };

    const closePopup = () => {
        setFormSubmitted(false); // Close the popup
    };

    return (
      <div className='footer'>
        <section className="section-4" id="section-4">
          <h1 className="section-heading section-4-heading">
            Send your listing to us 
          </h1>
          
          {/* Form for users to submit their listings */}
          <form className="contact-form center" onSubmit={handleSubmit}>
            <input type="hidden" name="access_key" value="9cb479de-467a-4fdb-9130-f4396fc6c472" /> {/* Access key for form submission */}
            <input type="text" name="name" placeholder="Name" required /> {/* Name input */}
            <input type="email" name="email" placeholder="Email" required /> {/* Email input */}
            <textarea name="message" placeholder="Details about your listings" required /> {/* Textarea for listing details */}
            <input type="submit" value="Submit" className="contactbutton" /> {/* Submit button */}
          </form>
   
          {/* Popup alert on form submission */}
          {formSubmitted && (
            <Popup 
              message="Your listing has been submitted successfully!" 
              onClose={closePopup}
            />
          )}
        </section>
  
        <footer className="section-5 center" id="section-5">
          <p className="copy-right">
            Copyright &copy; {currentYear} StudentStay. All Rights Reserved
          </p>
        </footer>
      </div>
    );
}

export default Footer;
