import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import "../styles/Login.css";
import DogPaw from "../assets/images/dog_paw.png";
import YellowCircle from "../assets/images/yellow_circle.png";
import AnimalPic from "../assets/images/animal_pic.png";
import axios from "axios"; // Import axios for making HTTP requests

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

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
          // Save the token in local storage or Redux store
          //localStorage.setItem("token", response.data.token);
          // Retrieve username from the response and set it in the Redux store
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

          //setCookie("token", response.data.token, { path: "/" });
          // setCookie("token", response.data.token, { path: "/settoken" });
          navigate("/product");
        } else {
          setLoginError("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error:", error);
        setLoginError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-pages">
      <div className="login-component">
        <div className="login-column">
          <h1 className="login-title">Login To Your Account</h1>
          {loginError && <div className="error">{loginError}</div>}
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
            <input
              className="login-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <div className="error">{passwordError}</div>}
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
