import "../styles/AdoptFormPopUp.css";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SuccessMessage from "./SuccessMessage"; 

function AdoptFormUpdate({ show, onClose, form }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);
  const [sentMessage, setSentMessage] = useState('');
  const [formData, setFormData] = useState({ ...form });

  useEffect(() => {
    setFormData({ ...form });
  }, [form]);

  const updateForm = async (e) => {
    e.stopPropagation();
    
    try {
      const response = await axios.put(`http://localhost:4000/api/pet/adoption/post/${form._id}`, formData);
      console.log("Form updated successfully:", response.data);
      setSentMessage('Form updated successfully.');
      setMessage(true);
    } catch (error) {
      console.error("Error updating form:", error);
      setSentMessage('Error updating form. Please try again later.');
      setMessage(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateForm(e);
  };

  return (
    <div className="adoption-form-container" style={{ display: show ? 'block' : 'none' }}>
      <div className="adoption-form-dialog">
        <div className="terms-and-conditions">
          <h3>Terms & Conditions</h3>
          <p>
            a. By clicking the submit button, I agree to go through the adoption process, will undergo a home check, and interview.<br/><br/>
            b. By clicking the submit button, I understand my references will be checked including veterinary and personal.<br/><br/>
            c. By clicking the submit button, I understand there is no "cooling off" period, and that if I no longer want or can no longer care for my adopted pet, I agree to notify Animall by EMAIL and provide a 14 day period to allow Animall to make arrangements for my pet to be taken back into rescue.<br/><br/>
            d. By clicking the submit button, I agree to indemnify and hold harmless the Animall against any losses, lawsuits, claims, injury, damages incurred by me or to any persons or property by my adopted pet, once adoption has been completed.<br/><br/>
            e. By clicking the submit button, I understand that Animall will disclose any of the pet's health or behavior issues known by the above named Animall before adoption is completed.<br/><br/>
            f. By clicking the submit button, I promise I will send non-repetitive photos and a short video of the adopted pet with at least 15 seconds to Animall once a week after the adoption is completed.<br/><br/>
            g. By clicking the submit button, I understand that if I no longer want my pet, or am no longer able to care for my adopted pet, I will be directed to surrender my pet to Animall and provide transport to where Animall deems appropriate.<br/><br/>
            h. By clicking the submit button, I verify all of the above information is true and accurate.
          </p>
        </div>

        <form className="adoption-form" onSubmit={handleSubmit}>
          <h2>Pet Adoption Form</h2>
          <input 
            type="text" 
            name="firstName" 
            placeholder="First Name" 
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input 
            type="text" 
            name="lastName" 
            placeholder="Last Name" 
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input 
            type="tel" 
            name="phone" 
            placeholder="Phone Number" 
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <input 
            name="address" 
            placeholder="Address" 
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <input 
            type="text" 
            name="city" 
            placeholder="City" 
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input 
            type="text" 
            name="postalCode" 
            placeholder="Postal / Zip Code" 
            value={formData.postalCode}
            onChange={handleInputChange}
            required
          />
          <input 
            type="number" 
            name="salary" 
            placeholder="Salary" 
            value={formData.salary}
            onChange={handleInputChange}
            required
          />
          <input 
            type="number" 
            name="petnum" 
            placeholder="Number of Owned Pet" 
            value={formData.petnum}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="submitButton">Save</button>
          <button type="button" className="sx-closeButton" onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}>
            <CloseIcon className="sx-closeIcon" />
          </button>
        </form>
      </div>
      <SuccessMessage show={message} onClose={() => {setMessage(false);navigate(-1);}} message={sentMessage}></SuccessMessage>
    </div>
  );
}

export default AdoptFormUpdate;
