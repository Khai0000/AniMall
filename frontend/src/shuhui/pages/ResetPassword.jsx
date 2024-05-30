import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ResetPassword.css";
import YellowTop from "../assets/images/yellow_top.png";
import VerifyIcon from "../assets/images/verify_icon.png";
import VerifyIconError from "../assets/images/error_verify_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function ResetPassword() {
  const [showVerify, setShowVerify] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [resetError, setResetError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [codeError, setCodeError] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackspace = (event) => {
      const index = inputRefs.current.findIndex(
        (inputRef) => inputRef === document.activeElement
      );
      if (event.key === "Backspace" && index > 0 && !event.target.value) {
        event.preventDefault();
        inputRefs.current[index - 1].value = "";
        inputRefs.current[index - 1].focus();
      }
    };

    document.addEventListener("keydown", handleBackspace);

    return () => {
      document.removeEventListener("keydown", handleBackspace);
    };
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleResetClick = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

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

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/authentication/send-reset-email",
        { email }
      );
      if (response.data.message) {
        setShowSuccessMessage(true);
      }
    } catch (error) {
      setResetError("Server is not connected.");
    }
  };

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value) || value.length > 1) {
      return; // Prevent non-numeric input or more than one digit in a single input
    }

    const newCode = verificationCode.split("");
    newCode[index] = value;
    setVerificationCode(newCode.join(""));

    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    setCodeError(false);

    if (newCode.join("").length === 6) {
      handleVerificationSubmit(newCode.join(""));
    } else {
      inputRefs.current.forEach((inputRef) => {
        inputRef.classList.remove("invalid");
      });
    }
  };

  const handleVerificationSubmit = async (code) => {
    try {
      console.log(code); // This will log the 6-digit code to the console
      const response = await axios.post(
        "http://localhost:4000/api/auth/authentication/verify-reset-password",
        {
          email,
          verificationCode: code,
          newPassword: password,
        }
      );

      if (response.data.message === "Password reset successful") {
        navigate("/authentication/login");
      } else {
        setCodeError(true);
        setVerificationCode("");
        inputRefs.current[0].focus();
        inputRefs.current.forEach((inputRef) => {
          inputRef.classList.add("invalid");
        });
      }
    } catch (error) {
      setCodeError(true);
      setVerificationCode("");
      inputRefs.current[0].focus();
      inputRefs.current.forEach((inputRef) => {
        inputRef.classList.add("invalid");
      });
    }
  };

  const handleResendClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/authentication/resend-reset-code",
        { email: email }
      );
      if (response.status === 200) {
        setCodeError(false);
        setTimeout(() => {
          inputRefs.current.forEach((inputRef) => {
            inputRef.classList.remove("invalid");
          });
        }, 100);
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error("Error resending verification code:", error);
      alert(
        "An error occurred while resending the verification code. Please try again later."
      );
    }
  };

  return (
    <div className="reset-pages-container">
      <img className="yellow-top" src={YellowTop} alt="yellowtop" />
      {!showVerify ? (
        <div className="reset-password-pages">
          <div className="reset-component">
            <h1 className="reset-title">Reset Password</h1>
            <form className="reset-container" onSubmit={handleResetClick}>
              <input
                required
                className="reset-email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && <p className="error-message">{emailError}</p>}
              <div className="password-container">
                <input
                  required
                  className="reset-password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                />
              </div>
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
              <div className="password-container">
                <input
                  required
                  className="reset-confirmpassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirmed Password"
                  value={confirmedPassword}
                  onChange={(e) => {
                    setConfirmedPassword(e.target.value);
                    setConfirmPasswordError("");
                  }}
                />
                <FontAwesomeIcon
                  icon={confirmPasswordVisible ? faEyeSlash : faEye}
                  className="password-toggle-icon"
                  onClick={toggleConfirmPasswordVisibility}
                />
              </div>
              {confirmPasswordError && (
                <p className="error-message">{confirmPasswordError}</p>
              )}

              {resetError && <div className="error-register">{resetError}</div>}
              <button className="reset-button" type="submit">
                RESET
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="reset-verify">
          {codeError ? (
            <div className="icon-container">
              <img
                className="verify-icon-reset"
                src={VerifyIconError}
                alt="verifyicon"
              />
              <p className="verify-text-error-reset">
                Invalid code. Try again.
              </p>
            </div>
          ) : (
            <div className="icon-container">
              <img
                className="verify-icon-reset"
                src={VerifyIcon}
                alt="verifyicon"
              />
              <p className="verify-text-reset">
                Please enter your verification code here.
              </p>
            </div>
          )}
          <div className="icon-container">
            <form className="verification-code-container-reset">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="verification-code-input-reset"
                  type="text"
                  maxLength="1"
                  value={verificationCode[index] || ""}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </form>
          </div>
          <p className="re-send-reset">
            Didn't receive it ?{" "}
            <button
              className="resend-button-reset"
              onClick={handleResendClick}
              type="button"
            >
              Send Again
            </button>
          </p>
        </div>
      )}
      {showSuccessMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Success!</h2>
            <p>The verification code has been sent to your email.</p>
            <button
              onClick={() => {
                setShowSuccessMessage(false);
                setShowVerify(true);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
