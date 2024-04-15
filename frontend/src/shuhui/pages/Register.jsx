import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import YellowTop from "../assets/images/yellow_top.png";
import VerifyIcon from "../assets/images/verify_icon.png";

function Register() {
  const [showVerify, setShowVerify] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setShowVerify(true);
  };

  const handleInputChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode.join(""));

    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newCode.length === 6) {
      if (newCode.join("") === "123456") {
        navigate("/login"); // Redirect to product page if code is correct
      } else {
        // Clear all input fields if code is incorrect
        setVerificationCode("");
        inputRefs.current[0].focus(); // Focus on the first input field
      }
    }
  };

  const handleResendClick = () => {
    // Add logic to resend verification code
  };

  return (
    <div className="register-pages-container">
      <img className="yellow-top" src={YellowTop} alt="yellowtop" />
      {!showVerify ? (
        <div className="register-pages">
          <div className="register-component">
            <h1 className="register-title">Create Account</h1>
            <form className="register-container">
              <input
                className="register-username"
                type="text"
                placeholder="Username"
              />
              <input
                className="register-email"
                type="email"
                placeholder="Email"
              />
              <input
                className="register-password"
                type="password"
                placeholder="Password"
              />
              <input
                className="register-confirmpassword"
                type="password"
                placeholder="Confirmed Password"
              />
              <button
                className="register-button"
                onClick={handleRegisterClick}
                type="button"
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="register-verify">
          <img className="verify-icon" src={VerifyIcon} alt="verifyicon" />
          <p className="verify-text">
            Please enter your verification code here.
          </p>
          <form className="verification-code-container">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className="verification-code-input"
                type="number"
                min="0"
                max="9"
                value={verificationCode[index] || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
          </form>
          <p className="re-send">
            Didn't receive it ?{" "}
            <button
              className="resend-button"
              onClick={handleResendClick}
              type="button"
            >
              Send Again
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default Register;
