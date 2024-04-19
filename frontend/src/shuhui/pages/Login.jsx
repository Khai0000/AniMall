import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import DogPaw from "../assets/images/dog_paw.png";
import YellowCircle from "../assets/images/yellow_circle.png";
import AnimalPic from "../assets/images/animal_pic.png";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // State to store email
  const [password, setPassword] = useState(""); // State to store password
  const [emailError, setEmailError] = useState(""); // State to store email validation error
  const [passwordError, setPasswordError] = useState(""); // State to store password validation error

  const validateEmail = (email) => {
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
    return isValidEmail;
  };

  const validatePassword = (password) => {
    const isValidPassword = password.length >= 6; // Example validation rule: Password must be at least 6 characters long
    if (!isValidPassword) {
      setPasswordError("Incorrect password. Try again.");
    } else {
      setPasswordError("");
    }
    return isValidPassword;
  };

  const handleLoginClick = (e) => {
    e.preventDefault();

    // Perform input validation
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      // Dispatching setUser action with username and email
      dispatch(setUser({ username: email.slice(0, 6), email: email }));
      navigate("/product");
    }
  };

  return (
    <div className="login-pages">
      <div className="login-component">
        <div className="login-column">
          <h1 className="login-title">Login To Your Account</h1>
          <p className="login-register">
            New Customer?{" "}
            <Link className="login-register-link" to="/authentication/register">
              Register here
            </Link>
          </p>
          <form className="login-container" onSubmit={handleLoginClick}>
            <input
              className="login-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
            {emailError && <div className="error">{emailError}</div>}{" "}
            {/* Display email error */}
            <input
              className="login-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
            {passwordError && <div className="error">{passwordError}</div>}{" "}
            {/* Display password error */}
            <p className="login-reset">
              <Link
                className="login-reset-link"
                to="/authentication/reset-password"
              >
                Forgot password?
              </Link>
            </p>
            <button className="login-button" type="submit">
              LOGIN
            </button>
          </form>

          <img className="dog-paw" src={DogPaw} alt="dogpaw" />
        </div>
      </div>
      <div className="login-deco">
        <div className="yellow-back">
          <img
            className="yellow-circle"
            src={YellowCircle}
            alt="yellowcircle"
          />
          <img className="animal-pic" src={AnimalPic} alt="animalpic" />
        </div>
      </div>
    </div>
  );
}

export default Login;
