import "../styles/AdoptFormCheck.css";
import CloseIcon from "@mui/icons-material/Close";
import React from 'react';

function AdoptFormCheck({  whenApprove, whenReject, form, setShowAdoptFormCheck }) {

  return (
    <div className="adoption-form-container">
      <div className="adoption-form-dialog">
        <div className="terms-and-conditions">
          <h3>Terms & Conditions</h3>
          <p>
            a. By clicking the submit button, I agree to go adoption process, will undergo a homecheck, and interview.<br /><br />
            b. By clicking the submit button, I understand my references will be checked including veterinary and personal. <br /><br />
            c. By clicking the submit button, I understand there is no "cooling off" period, and that if I no longer want or can no longer care for my adopted pet, I agree to notify Animall. BY EMAIL and provide a 14 day period to allow Animall to make arrangements for my pet to be taken back into rescue.<br /><br />
            d. By clicking the submit button, I agree to indemnify and hold harmless the Animall against any losses, lawsuits, claims, injury, damages incurred by me or to any persons or property by my adopted pet, once adoption has been completed.<br /><br />
            e. By clicking the submit button, I understand that Animall will disclose any of the pet's health or behavior issues known by the above named Animall before adoption is completed.<br /><br />
            f. By clicking the submit button, I promise I will send non-repetitive 1 photos and a short video of adopted pet with at least 15 seconds to Animall once a week to Animall after the adoption is completed.<br /><br />
            g. By clicking the submit button, I understand that if I no longer want my pet, or am no longer able to care for my adopted pet, I will be directed to surrender my pet to Animall and provide transport to where Animall deems appropriate.<br /><br />
            h. By clicking the submit button, I verify all of the above information is true and accurate.
          </p>
        </div>

        <form className="adoption-form">
          <h2>Pet Adoption Form</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            readOnly
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            readOnly
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            readOnly
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            readOnly
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            readOnly
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            readOnly
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={form.postalCode}
            readOnlyform
            required
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={form.salary}
            readOnly
            required
          />
          <input
            type="number"
            name="petnum"
            placeholder="Number of Pets"
            value={form.petnum}
            readOnly
            required
          />
          <div className="button-container">
            <button type="button" className="ApprovedButton" onClick={whenApprove}>Approve</button>
            <button type="button" className="RejectedButton" onClick={whenReject}>Reject</button>
          </div>
          <button className="sx-closeButton" onClick={(e) => {
            e.stopPropagation();
            setShowAdoptFormCheck(false);
          }}>
            <CloseIcon className="sx-closeIcon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdoptFormCheck;
