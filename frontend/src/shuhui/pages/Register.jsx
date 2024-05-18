import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import YellowTop from "../assets/images/yellow_top.png";
import VerifyIcon from "../assets/images/verify_icon.png";
import VerifyIconError from "../assets/images/error_verify_icon.png";

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

      if (email === "animallpublic@gmail.com") {
        // Navigate directly to login page if the email is for admin
        navigate("/authentication/login");
      } else {
        setShowVerify(true);
      }

      // Handle successful registration here, such as displaying a success message or navigating to another page
      console.log("User registered successfully:", newUserCreate.data);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again later.");
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
