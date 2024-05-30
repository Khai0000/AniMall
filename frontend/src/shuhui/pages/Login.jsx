import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import "../styles/Login.css";
import DogPaw from "../assets/images/dog_paw.png";
import YellowCircle from "../assets/images/yellow_circle.png";
import AnimalPic from "../assets/images/animal_pic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import axios for making HTTP requests

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const validateEmail = (email) => {
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    setEmailError(isValidEmail ? "" : "Please enter a valid email address");
    return isValidEmail;
  };

  const validatePassword = (password) => {
    const isValidPassword = password.length >= 6;
    setPasswordError(isValidPassword ? "" : "Incorrect password. Try again.");
    return isValidPassword;
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/authentication/login",
          {
            email: email,
            password: password,
          },
          { withCredentials: true }
        );

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          const {
            username,
            email,
            userUid,
            role,
            verifyStatus,
            address,
            phone,
          } = response.data;
          dispatch(
            setUser({
              username,
              email,
              userUid,
              role,
              verifyStatus,
              address,
              phone,
            })
          );
          navigate("/product");
        } else {
          setLoginError("Login failed. Please check your credentials.");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setLoginError("Invalid email or password.");
        } else if (error.response && error.response.status === 403) {
          setLoginError(
            "Your account has been blocked. Please contact administrator."
          );
        } else {
          console.error("Error:", error);
          setLoginError("Server is not connected.");
        }
      }
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
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="error">{emailError}</div>}

            <div className="password-container-login">
              <input
                required
                className="login-password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                className="password-toggle-icon-login"
                onClick={togglePasswordVisibility}
              />
              {passwordError && <div className="error">{passwordError}</div>}
            </div>
            <p className="login-reset">
              <Link
                className="login-reset-link"
                to="/authentication/reset-password"
              >
                Forgot password?
              </Link>
            </p>
            {loginError && <div className="error">{loginError}</div>}
            <button className="login-button" type="submit">
              LOGIN
            </button>
          </form>

          <img className="dog-paw" src={DogPaw} alt="dog paw" />
        </div>
      </div>
      <div className="login-deco">
        <div className="yellow-back">
          <img
            className="yellow-circle"
            src={YellowCircle}
            alt="yellow circle"
          />
          <img className="animal-pic" src={AnimalPic} alt="animal pic" />
        </div>
      </div>
    </div>
  );
}

export default Login;
