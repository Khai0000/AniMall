import React from "react";
import "../styles/Payment.css";


const Payment = ({ setShowPayment,checkoutApiCall,totalPrice }) => {
    console.log(checkoutApiCall);
  return (
    <div className="paymentDetailsBackground">
      <div className="paymentDetailsContainer">
        <h2>Payment Details</h2>
        <div className="cardNumberInputContainer">
          <input
            className="cardNumberInput"
            type="text"
            placeholder="CARD NUMBER"
          />
        </div>
        <div className="cardHolderNameInputContainer">
          <input
            className="cardHolderNameInput"
            type="text"
            placeholder="CARDHOLDER NAME"
          />
        </div>
        <div className="cardCredentialsContainer">
          <input
            className="cardExpiredDate"
            type="text"
            placeholder="EXPIRED MM/YY"
          />

          <input className="cardCVV" type="password" placeholder="CVV" />
        </div>
        <div className="paymentButtonContainer">
          <button
            className="proceedPaymentButton"
            onClick={async() => {
              setShowPayment(false);
              await checkoutApiCall();
            }}
          >
            Pay RM{totalPrice.toFixed(2)}
          </button>
          <button className="closeButton" onClick={() => setShowPayment(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
