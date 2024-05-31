import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import YellowTop from "../assets/images/yellow_top.png";
import VerifyIcon from "../assets/images/verify_icon.png";
import VerifyIconError from "../assets/images/error_verify_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [showVerify, setShowVerify] = useState(false);
  const [verificationCode, setVerificationCode] = useState(
    Array.from({ length: 6 }).fill("")
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
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

  const handleRegisterClick = async (e) => {
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
    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordRegex = /^[A-Za-z\d@.$!%#*?&]{8,}$/;
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
      const newUserCreate = await axios.post(
        "http://localhost:4000/api/auth/authentication/register",
        {
          username: username,
          email: email,
          password: password,
        }
      );

      setShowSuccessMessage(true);

      // Handle successful registration here, such as displaying a success message or navigating to another page
      console.log("User registered successfully:", newUserCreate.data);
    } catch (error) {
      console.error("Error creating user:", error);
      setRegisterError("Server is not connected.");
    }
  };

  const handleInputChange = async (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newCode.every((digit) => digit !== "")) {
      const enteredCode = newCode.join("");

      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/authentication/verify",
          {
            email: email, // Send the email as well
            verificationCode: enteredCode, // Send the verification code
          }
        );

        if (response.data.success) {
          navigate("/authentication/login");
        } else {
          console.log(response.data);
          setCodeError(true);
          setVerificationCode(Array.from({ length: 6 }).fill(""));
          inputRefs.current[0].focus();
          inputRefs.current.forEach((inputRef) => {
            inputRef.classList.add("invalid");
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setCodeError(true);
        setVerificationCode(Array.from({ length: 6 }).fill(""));
        inputRefs.current[0].focus();
        inputRefs.current.forEach((inputRef) => {
          inputRef.classList.add("invalid");
        });
      }
    } else {
      inputRefs.current.forEach((inputRef) => {
        inputRef.classList.remove("invalid");
      });
      setCodeError(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleResendClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/authentication/resendcode",
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
              <div className="password-container">
                <input
                  required
                  className="register-password"
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
                  className="register-confirmpassword"
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
              {registerError && (
                <div className="error-register">{registerError}</div>
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

export default Register;
