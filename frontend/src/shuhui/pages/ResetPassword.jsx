import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ResetPassword.css";
import YellowTop from "../assets/images/yellow_top.png";
import VerifyIcon from "../assets/images/verify_icon.png";
import VerifyIconError from "../assets/images/error_verify_icon.png";

function ResetPassword() {
  const [showVerify, setShowVerify] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
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
        setShowVerify(true);
      }
    } catch (error) {
      setEmailError("Error sending verification code");
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
      await axios.post(
        "http://localhost:4000/api/auth/authentication/send-reset-email",
        { email }
      );
      setCodeError(false);
      setTimeout(() => {
        inputRefs.current.forEach((inputRef) => {
          inputRef.classList.remove("invalid");
        });
      }, 100);
    } catch (error) {
      console.error("Error resending verification code", error);
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
              <input
                required
                className="reset-password"
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
                className="reset-confirmpassword"
                type="password"
                placeholder="Confirmed Password"
                value={confirmedPassword}
                onChange={(e) => {
                  setConfirmedPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
              />
              {confirmPasswordError && (
                <p className="error-message">{confirmPasswordError}</p>
              )}
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
    </div>
  );
}

export default ResetPassword;
