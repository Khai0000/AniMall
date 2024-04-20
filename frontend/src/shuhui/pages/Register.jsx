import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import YellowTop from "../assets/images/yellow_top.png";
import VerifyIcon from "../assets/images/verify_icon.png";
import VerifyIconError from "../assets/images/error_verify_icon.png";

function Register() {
  const [showVerify, setShowVerify] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [codeError, setCodeError] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackspace = (event) => {
      const index = inputRefs.current.findIndex(
        (inputRef) => inputRef === document.activeElement
      );
      if (event.key === "Backspace" && index > 0 && !event.target.value) {
        event.preventDefault(); // Prevent default backspace behavior
        inputRefs.current[index - 1].value = ""; // Clear the value of the previous input
        inputRefs.current[index - 1].focus(); // Focus on the previous input field
      }
    };

    document.addEventListener("keydown", handleBackspace);

    return () => {
      document.removeEventListener("keydown", handleBackspace);
    };
  }, []);

  const handleRegisterClick = (e) => {
    e.preventDefault();

    // Validate username
    if (!/^[a-z]+$/.test(username)) {
      setUsernameError("Username can only contain lowercase letters");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    // Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must have at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      );
      return;
    }

    if (confirmedPassword !== password) {
      setConfirmPasswordError("Confirmed password does not match");
      return;
    }

    setShowVerify(true);
    // Logic to send verification email and proceed
  };

  const handleInputChange = (index, value, event) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode.join(""));

    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newCode.length === 6) {
      if (newCode.join("") === "123456") {
        navigate("/authentication/login"); // Redirect to product page if code is correct
      } else {
        setCodeError(true);
        // Clear all input fields if code is incorrect
        setVerificationCode("");
        inputRefs.current[0].focus(); // Focus on the first input field
        inputRefs.current.forEach((inputRef) => {
          inputRef.classList.add("invalid"); // Add "invalid" class to all input fields
        });
      }
    } else {
      inputRefs.current.forEach((inputRef) => {
        inputRef.classList.remove("invalid"); // Remove "invalid" class
      }); // Reset codeError when code is being retyped
    }
  };

  const handleResendClick = () => {
    // Add logic to resend verification code
    setCodeError(false);
    setTimeout(() => {
      // Reset the input fields to original color after 1 second
      inputRefs.current.forEach((inputRef) => {
        inputRef.classList.remove("invalid"); // Remove "invalid" class
      });
    }, 100);
  };

  return (
    <div className="register-pages-container">
      <img className="yellow-top" src={YellowTop} alt="yellowtop" />
      {!showVerify ? (
        <div className="register-pages">
          <div className="register-component">
            <h1 className="register-title">Create Account</h1>
            <form className="register-container" onSubmit={handleRegisterClick}>
              <input
                required
                className="register-username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError("");
                }}
              />
              {usernameError && (
                <p className="error-message">{usernameError}</p>
              )}
              <input
                required
                className="register-email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && <p className="error-message">{emailError}</p>}
              <input
                required
                className="register-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
              <input
                required
                className="register-confirmpassword"
                type="password"
                placeholder="Confirmed Password"
                value={confirmedPassword}
                onChange={(e) => {
                  setConfirmedPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              {confirmPasswordError && (
                <p className="error-message">{confirmPasswordError}</p>
              )}
              <button className="register-button" type="submit">
                REGISTER
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="register-verify">
          {codeError ? ( // Check if codeError is true
            <div>
              <img
                className="verify-icon"
                src={VerifyIconError}
                alt="verifyicon"
              />
              <p className="verify-text-error">Invalid code. Try again.</p>
            </div>
          ) : (
            <div>
              <img className="verify-icon" src={VerifyIcon} alt="verifyicon" />
              <p className="verify-text">
                Please enter your verification code here.
              </p>
            </div>
          )}
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
                onChange={(e) => handleInputChange(index, e.target.value, e)}
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
