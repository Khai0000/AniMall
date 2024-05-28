import React from "react";
import "../styles/AddressDetails.css";

const AddressDetails = ({
  checkoutAddress,
  checkoutUsername,
  checkoutPhone,
  setCheckoutAddress,
  setCheckoutUsername,
  setCheckoutPhone,
    setShowAddressDetails,
    setShowPayment
}) => {

  return (
    <div className="addressDetailsBackground">
      <div className="addressDetailsContainer">
        <h2>Delivery Details</h2>
        <div className="deliveryColumn">
          <strong>Deliver To</strong>
          <input
            value={checkoutAddress}
            onChange={(e) => setCheckoutAddress(e.target.value)}
          />
        </div>
        <div className="deliveryColumn">
          <strong>Receiver</strong>
          <input
            value={checkoutUsername}
            onChange={(e) => setCheckoutUsername(e.target.value)}
          />
        </div>
        <div className="deliveryColumn">
          <strong>Phone Number</strong>
          <input
            value={checkoutPhone}
            onChange={(e) => setCheckoutPhone(e.target.value)}
          />
        </div>
        <p>Please kindly verify the details and make adjustments if needed.</p>
        <div className="addressDetailsButtonContainer">
          <button className="proceedPaymentButton" onClick={()=>{
            setShowAddressDetails(false)
            setShowPayment(true)
          }}>Proceed To Payment</button>
          <button className="closeButton" onClick={()=>setShowAddressDetails(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
